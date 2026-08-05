import json
from pathlib import Path

import pdfplumber
import pypdfium2 as pdfium
from PIL import Image, ImageDraw


SOURCE = Path(r"C:\Users\LENOVO\Downloads\HearMe_IDent.pptx (3).pdf")
OUTPUT = Path(r"D:\ExcelTech\Wisere\tmp\pdfs\hearme_ident")
OUTPUT.mkdir(parents=True, exist_ok=True)


with pdfplumber.open(SOURCE) as pdf:
    pages = []
    for index, page in enumerate(pdf.pages, start=1):
        pages.append(
            {
                "page": index,
                "width": page.width,
                "height": page.height,
                "text": page.extract_text(layout=True) or "",
            }
        )

(OUTPUT / "content.json").write_text(
    json.dumps(pages, ensure_ascii=False, indent=2), encoding="utf-8"
)

document = pdfium.PdfDocument(SOURCE)
thumbs = []
for index in range(len(document)):
    page = document[index]
    bitmap = page.render(scale=1.4)
    image = bitmap.to_pil().convert("RGB")
    image.save(OUTPUT / f"page-{index + 1:02d}.png")
    thumb = image.copy()
    thumb.thumbnail((420, 260))
    thumbs.append(thumb)

columns = 2
cell_width = 450
cell_height = 310
rows = (len(thumbs) + columns - 1) // columns
sheet = Image.new("RGB", (columns * cell_width, rows * cell_height), "white")
draw = ImageDraw.Draw(sheet)
for index, thumb in enumerate(thumbs):
    x = (index % columns) * cell_width + 15
    y = (index // columns) * cell_height + 35
    sheet.paste(thumb, (x, y))
    draw.text((x, 10 + (index // columns) * cell_height), f"Page {index + 1}", fill="black")
sheet.save(OUTPUT / "contact-sheet.png")

print(json.dumps({"pages": len(document), "output": str(OUTPUT)}, ensure_ascii=False))
