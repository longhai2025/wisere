/* Local-only prototype. All edits are held in React state and reset on reload. */
(() => {
  'use strict';
  if (!window.antd || !window.React || !window.ReactDOM || !window.dayjs) {
    document.getElementById('root').textContent = 'Unable to load the local libraries. Keep customer-profile-assets beside this HTML file.';
    return;
  }
  const h = React.createElement;
  const { useState, useEffect } = React;
  const {
    ConfigProvider, App: AntApp, Layout, Menu, Button, Input, Select, Table,
    Tag, Avatar, Badge, Tabs, Drawer, Card, Statistic, Descriptions, Space,
    Form, DatePicker, Modal, Popover, Pagination, Empty, Alert, Segmented,
    Switch, Timeline, Rate, Upload, Tooltip, List
  } = antd;
  const { Sider } = Layout;
  const paths = {
    menu: 'M4 6h16M4 12h16M4 18h16M8 4v16',
    checkin: 'M8 3v4m8-4v4M4 10h16m-12 4 2 2 4-4',
    turn: 'M3 4h7v16H3zM14 4h7v16h-7z',
    calendar: 'M8 3v4m8-4v4M3 10h18',
    customers: 'M6 19c.8-3 3-4.5 6-4.5s5.2 1.5 6 4.5',
    catalog: 'm12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Zm-8 4.5 8 4.5 8-4.5M12 12v9',
    team: 'M3 20v-2c0-3 2.4-5 6-5s6 2 6 5v2m1-14a3 3 0 0 1 0 6m1 2c2.5.5 4 2.1 4 4v2',
    reports: 'M4 4h16v12H4zM8 20h8M12 16v4M7 12V9m5 3V6m5 6v-4',
    marketing: 'M5 5h14l1 15H4L5 5ZM8 5a4 4 0 0 0 8 0',
    settings: 'M12 2v3m0 14v3M2 12h3m14 0h3M5 5l2 2m10 10 2 2M5 19l2-2M17 7l2-2',
    search: 'm16 16 5 5', filter: 'M4 6h16M7 12h10m-7 6h4',
    edit: 'M14 4 20 10 9 21H3v-6L14 4Zm-2 2 6 6',
    plus: 'M12 5v14M5 12h14', down: 'm7 10 5 5 5-5', right: 'm9 5 7 7-7 7',
    mail: 'M3 5h18v14H3zM3 5l9 7 9-7',
    phone: 'M5 3h4l2 5-3 2a14 14 0 0 0 6 6l2-3 5 2v4c0 2-3 3-5 2C9 19 5 15 3 8 2 6 3 3 5 3Z',
    send: 'M3 11 21 4l-7 17-3-7-8-3Z',
    gift: 'M3 8h18v5H3zM5 13v8h14v-8M12 8v13M12 8c-7 0-7-7-3-5l3 5Zm0 0c7 0 7-7 3-5l-3 5Z',
    file: 'M5 3h9l5 5v13H5zM14 3v5h5M8 13h8m-8 4h6',
    upload: 'M12 16V3m-5 5 5-5 5 5M4 16v5h16v-5',
    arrow: 'M19 12H5m6-6-6 6 6 6',
    clock: 'M12 6v6l4 2'
  };
  function icon(name) {
    const children = [];
    if (['checkin','calendar'].includes(name)) children.push(h('rect', { key: 'rect', x: 3, y: 5, width: 18, height: 16, rx: 3 }));
    if (name === 'customers') children.push(h('rect', { key: 'rect', x: 3, y: 3, width: 18, height: 18, rx: 3 }), h('circle', { key: 'circle', cx: 12, cy: 9, r: 3 }));
    if (name === 'team') children.push(h('circle', { key: 'circle', cx: 9, cy: 8, r: 3 }));
    if (name === 'settings') children.push(h('circle', { key: 'outer', cx: 12, cy: 12, r: 7 }), h('circle', { key: 'inner', cx: 12, cy: 12, r: 3 }));
    if (['search','clock'].includes(name)) children.push(h('circle', { key: 'circle', cx: name === 'search' ? 11 : 12, cy: name === 'search' ? 11 : 12, r: name === 'search' ? 7 : 9 }));
    children.push(h('path', { key: 'path', d: paths[name] || paths.file }));
    return h('svg', { className: 'icon', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true }, ...children);
  }
  const theme = {
    token: {
      colorPrimary: '#ff5b20', colorInfo: '#ff5b20', colorSuccess: '#55aa35',
      colorText: '#514e5e', colorTextHeading: '#15131d', colorTextSecondary: '#8b8995',
      colorBorder: '#d8dde6', colorBorderSecondary: '#e9eaee',
      colorBgLayout: '#fff', borderRadius: 6, controlHeight: 37, fontSize: 14,
      fontFamily: '"Century Gothic", "Avenir Next", "Segoe UI", sans-serif',
      boxShadowSecondary: '0 6px 22px rgba(29,31,38,.13)'
    },
    components: {
      Layout: { headerBg: '#fff', siderBg: '#fff', bodyBg: '#fff' },
      Menu: { itemBg: '#fff', itemSelectedBg: '#fff0e7', itemSelectedColor: '#ff5b20', itemColor: '#17141e', itemHoverBg: '#fafafa' },
      Table: { headerBg: '#f5f5f5', headerColor: '#68647a', borderColor: '#e9eaee', rowHoverBg: '#fffaf7', headerBorderRadius: 2 },
      Button: { primaryShadow: 'none', defaultShadow: 'none', fontWeight: 500 },
      Tabs: { horizontalItemGutter: 28, inkBarColor: '#ff5b20', itemColor: '#5a5665' },
      Card: { headerFontSize: 14 }, Drawer: { colorBgMask: 'rgba(20,18,24,.42)' }
    }
  };
  const fsTabs = [
    ['overview','Overview','FS-001'], ['information','Information','FS-002'],
    ['tickets','Tickets & Services','FS-003'], ['gifts','Gift Cards','FS-004'],
    ['appointments','Appointments','FS-005'], ['care','Care Profile','FS-006'],
    ['contact','Contact History','FS-007'], ['loyalty','Loyalty & Referrals','FS-008'],
    ['feedback','Reviews & Feedback','FS-009'], ['activity','Activity Log','FS-010']
  ];
  const groups = ['All customers','Nails - Lashes VVIP','VVIP','Christian','QC Testing','VIP','Fishermen','Officer'];
  const nameOf = c => [c.first, c.last].filter(Boolean).join(' ');
  const initials = c => (c.first.charAt(0) + (c.last || '').charAt(0)).toUpperCase();
  const money = n => '$' + Number(n).toFixed(2);
  const dateText = d => d ? dayjs(d).format('MMM DD, YYYY') : '-/-';
  const options = values => values.map(value => ({ value, label: value }));
  const stamp = () => dayjs().format('MMM DD, YYYY - h:mm A');
  function customer(id, first, last, group, phone, gender, location = 'Lewis Center', rich = false) {
    return {
      id, first, last, group, phone, gender, location,
      email: rich ? first.toLowerCase() + '@example.com' : '',
      dob: rich ? '1999-07-15' : '', address: rich ? '18 Example Avenue' : '',
      address2: '', city: rich ? 'Lewis Center' : '', state: rich ? 'Ohio' : '', zip: rich ? '43035' : '',
      tags: rich ? ['VIP','Regular client'] : [], referredBy: rich ? 'Ava Morgan' : '',
      created: 'Aug 24, 2026', preferences: { sms: true, email: false, marketing: false },
      tickets: rich ? [
        { id: 'TK-1042', date: '2026-09-15', service: 'Gel Manicure', staff: 'Nguyen Thao', amount: 65, status: 'Paid', method: 'Card' },
        { id: 'TK-0988', date: '2026-09-01', service: 'Classic Pedicure', staff: 'Sophia Lee', amount: 55, status: 'Paid', method: 'Cash' },
        { id: 'TK-0923', date: '2026-08-24', service: 'Gel Manicure + removal', staff: 'Nguyen Thao', amount: 75, status: 'Paid', method: 'Gift Card + Card' }
      ] : [],
      gifts: rich ? [{ id: 'GC-2401', code: '**** **** **** 2401', purchased: '2026-08-24', loaded: 150, used: 45, balance: 105, status: 'Active' }] : [],
      appointments: rich ? [
        { id: 'AP-0562', date: '2026-09-21', time: '10:30 AM', service: 'Gel Manicure', staff: 'Nguyen Thao', status: 'Confirmed' },
        { id: 'AP-0510', date: '2026-09-15', time: '11:00 AM', service: 'Gel Manicure', staff: 'Nguyen Thao', status: 'Completed' }
      ] : [],
      notes: rich ? [
        { id: 'N-1', type: 'Preference', text: 'Prefers neutral shades and a short, rounded nail shape.', scope: 'Customer', author: 'Sophia Lee', date: 'Sep 15, 2026 - 11:45 AM' },
        { id: 'N-2', type: 'Service note', text: 'Used shade 128. Customer requested the same color for the next visit.', scope: 'Ticket TK-1042', author: 'Nguyen Thao', date: 'Sep 15, 2026 - 11:40 AM' }
      ] : [],
      files: [],
      messages: rich ? [
        { id: 'M-1', channel: 'SMS', title: 'Appointment confirmation', date: 'Sep 16, 2026 - 9:30 AM', status: 'Delivered', text: 'Your appointment at Lewis Center is confirmed for Sep 21 at 10:30 AM.' },
        { id: 'M-2', channel: 'SMS', title: 'Thank you for your visit', date: 'Sep 15, 2026 - 11:50 AM', status: 'Delivered', text: 'Thank you for visiting Beelia. We look forward to seeing you again.' },
        { id: 'M-3', channel: 'Email', title: 'Receipt TK-1042', date: 'Sep 15, 2026 - 11:48 AM', status: 'Failed', text: 'Receipt delivery failed. No email was delivered.' }
      ] : [],
      loyalty: rich ? [
        { id: 'LP-3', date: 'Sep 15, 2026', reason: 'Service purchase - TK-1042', change: 65 },
        { id: 'LP-2', date: 'Sep 01, 2026', reason: 'Service purchase - TK-0988', change: 55 },
        { id: 'LP-1', date: 'Aug 24, 2026', reason: 'Opening points balance', change: 120 }
      ] : [],
      referrals: rich ? [{ id: 'R-1', name: 'Olivia Reed', date: 'Sep 01, 2026' }] : [],
      feedback: rich ? [
        { id: 'FB-101', date: 'Sep 15, 2026', kind: 'Review', score: 5, text: 'Loved the manicure. The color and shape were exactly what I wanted.', status: 'Reviewed', service: 'TK-1042 - Gel Manicure' },
        { id: 'FB-084', date: 'Sep 01, 2026', kind: 'Feedback', score: null, text: 'Would prefer a quieter appointment time on the next visit.', status: 'Open', service: 'TK-0988 - Classic Pedicure' }
      ] : [],
      activity: [{ id: 'A-1', action: 'Customer created', date: 'Aug 24, 2026 - 9:05 AM', author: 'Steve Tran', details: 'Created the customer record at ' + location + '.' }]
    };
  }
  const initialCustomers = [
    customer('00345','Yen','Test','QC Testing','(614) 555-0145','Female','Lewis Center',true),
    customer('00344','Tee','','All customers','(614) 555-0144','Unspecified'),
    customer('00343','Test','123456','QC Testing','','Unspecified'),
    customer('00314','Boni','Boni','Nails - Lashes VVIP','(614) 555-0114','Female'),
    customer('00313','Thao','Thao','VIP','(614) 555-0113','Female'),
    customer('00311','Anh','Hy','Christian','(614) 555-0111','Unspecified'),
    customer('00310','Nik','Ray','Fishermen','(614) 555-0110','Male'),
    customer('00309','Ava','Morgan','VIP','(614) 555-0109','Female'),
    customer('00308','Linh','Nguyen','VVIP','(614) 555-0108','Female','ET Company'),
    customer('00307','Alex','Reed','Officer','(614) 555-0107','Male','ET Company')
  ];
  function statusTag(value) {
    const color = { Paid: 'green', Confirmed: 'blue', Completed: 'default', Cancelled: 'red',
      Active: 'green', Delivered: 'green', Failed: 'red', Open: 'orange', Reviewed: 'green',
      Resolved: 'green', Preference: 'blue', Alert: 'red', 'Service note': 'default', Note: 'default' }[value] || 'default';
    return h(Tag, { color }, value);
  }
  function heading(title, subtitle, action) {
    return h('div', { className: 'section-title' },
      h('div', null, h('h3', null, title), subtitle && h('p', { className: 'section-subtitle' }, subtitle)), action);
  }
  function descriptions(items, column = 2) {
    return h(Descriptions, { size: 'small', column, layout: 'vertical',
      items: items.map(([label, children], i) => ({ key: i, label, children: children || '-/-' })) });
  }
  function dataTable(columns, rows, extra = {}) {
    return h(Table, { className: 'history-table', rowKey: 'id', size: 'middle', columns,
      dataSource: rows, pagination: false, scroll: { x: 620 }, locale: { emptyText: h(Empty, { image: Empty.PRESENTED_IMAGE_SIMPLE, description: 'No records for this customer' }) }, ...extra });
  }
  const col = (title, dataIndex, render, width) => ({ title, dataIndex, key: dataIndex, render, width });
  const link = (text, onClick) => h(Button, { type: 'link', onClick }, text);
  function useWidth() {
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
      const resize = () => setWidth(window.innerWidth);
      window.addEventListener('resize', resize);
      return () => window.removeEventListener('resize', resize);
    }, []);
    return width;
  }
  function Editor({ editing, close, save, width }) {
    const [form] = Form.useForm();
    useEffect(() => {
      if (editing) {
        form.resetFields();
        form.setFieldsValue({ ...editing, dob: editing.dob ? dayjs(editing.dob) : null });
      }
    }, [editing, form]);
    const item = (label, name, control, rules = []) => h(Form.Item, { key: name, label, name, rules }, control);
    return h(Drawer, {
      open: !!editing, onClose: close, title: editing?.id ? 'Edit customer' : 'Create customer',
      width: Math.min(476, width), className: 'edit-drawer', zIndex: 1200,
      footer: h(Space, null, h(Button, { onClick: close }, 'Cancel'), h(Button, { type: 'primary', onClick: () => form.submit() }, 'Save')),
      destroyOnHidden: true
    }, h(Form, { form, layout: 'vertical', requiredMark: true, onFinish: values => save({ ...values, first: values.first.trim(), dob: values.dob?.format('YYYY-MM-DD') || '' }) },
      h('p', { className: 'section-subtitle', style: { marginBottom: 20 } }, 'General information'),
      h('div', { className: 'field-grid' },
        item('First name','first',h(Input, { maxLength: 100, placeholder: 'Input first name' }), [{ required: true, whitespace: true, message: 'Enter a first name.' }]),
        item('Last name','last',h(Input, { maxLength: 100, placeholder: 'Input last name' })),
        item('Phone number','phone',h(Input, { placeholder: '(234) 567-8901' })),
        item('Email','email',h(Input, { placeholder: 'Input email' }), [{ type: 'email', message: 'Enter a valid email address.' }]),
        item('Date of birth','dob',h(DatePicker, { style: { width: '100%' }, format: 'DD MMM YYYY' })),
        item('Gender','gender',h(Select, { options: options(['Unspecified','Female','Male','Other']) })),
        item('Group','group',h(Select, { options: options(groups) })),
        item('Location','location',h(Select, { options: options(['Lewis Center','ET Company']) })),
        h('div', { className: 'form-full' }, item('Client tag','tags',h(Select, { mode: 'tags', options: options(['VIP','Regular client','New client']) }))),
        h('div', { className: 'form-full' }, item('Address','address',h(Input, { maxLength: 255, placeholder: 'Input address' }))),
        item('State','state',h(Input, { placeholder: 'Input state' })),
        item('City','city',h(Input, { placeholder: 'Input city' })),
        item('Zip code','zip',h(Input, { maxLength: 50, placeholder: 'Input zip code' }))
      )));
  }
  function ProfileSection({ kind, c, update, openEditor, setTab, detail, action }) {
    const [query, setQuery] = useState('');
    const [segment, setSegment] = useState(kind === 'appointments' ? 'Upcoming' : 'Tickets');
    const { message, modal } = AntApp.useApp();
    const search = placeholder => h(Input, { allowClear: true, prefix: icon('search'), placeholder, 'aria-label': placeholder, value: query, onChange: e => setQuery(e.target.value) });
    const filter = rows => rows.filter(row => JSON.stringify(row).toLowerCase().includes(query.toLowerCase().trim()));
    const total = c.tickets.reduce((sum, row) => sum + row.amount, 0);
    const next = c.appointments.filter(row => row.status === 'Confirmed').sort((a,b) => a.date.localeCompare(b.date))[0];
    const last = c.tickets[0];
    const ticketDetail = row => detail('Ticket ' + row.id, [
      ['Customer',nameOf(c)], ['Date',dateText(row.date)], ['Location',c.location],
      ['Service',row.service], ['Staff',row.staff], ['Status',statusTag(row.status)],
      ['Payment method',row.method], ['Ticket total',money(row.amount)]
    ], 'Receipt and service details');
    const appointmentDetail = row => detail('Appointment ' + row.id, [
      ['Customer',nameOf(c)], ['Date',dateText(row.date)], ['Time',row.time],
      ['Service',row.service], ['Staff',row.staff], ['Status',statusTag(row.status)]
    ], c.location);
    if (kind === 'overview') return h('div', null,
      heading('Customer overview','A summary of visits, upcoming appointments and care information.'),
      h('div', { className: 'stats-grid' },
        ...[
          ['Total visits',c.tickets.length,'Completed service visits'],
          ['Total spent',money(total),'Service tickets only'],
          ['Last visit',last ? dayjs(last.date).format('MMM DD') : '-/-',last ? dayjs(last.date).format('YYYY') : 'No service history'],
          ['Next appointment',next ? dayjs(next.date).format('MMM DD') : '-/-',next ? next.time : 'No upcoming appointment']
        ].map(([title,value,caption]) => h(Card, { key: title, size: 'small' }, h(Statistic, { title, value }), h('div', { className: 'stat-caption' }, caption)))),
      h('div', { className: 'two-columns' },
        h(Card, { className: 'profile-card', title: 'Next appointment', extra: link('View all',() => setTab('appointments')) },
          next ? h(React.Fragment, null,
            h('div', { className: 'appointment-preview' },
              h('div', { className: 'date-tile' },h('span',null,dayjs(next.date).format('MMM')),h('strong',null,dayjs(next.date).format('DD'))),
              h('div',null,h('div',{className:'detail-title'},next.service),h('div',{className:'detail-subtitle'},next.time + ' - ' + next.staff),statusTag(next.status))),
            h(Space,null,h(Button,{onClick:()=>appointmentDetail(next)},'View appointment'),h(Button,{onClick:()=>action('appointment',next)},'Reschedule')))
          : h(Empty,{image:Empty.PRESENTED_IMAGE_SIMPLE,description:'No upcoming appointments'},h(Button,{type:'primary',onClick:()=>action('appointment')},'Book appointment'))),
        h(Card,{className:'profile-card',title:'Last visit',extra:link('View history',()=>setTab('tickets'))},
          last ? h(React.Fragment,null,h('div',{className:'detail-title'},last.service),h('div',{className:'detail-subtitle'},dateText(last.date) + ' - ' + last.staff),h('div',{style:{margin:'14px 0'}},statusTag(last.status),h('strong',null,money(last.amount))),h(Button,{onClick:()=>ticketDetail(last)},'View ticket'))
          : h(Empty,{image:Empty.PRESENTED_IMAGE_SIMPLE,description:'No service history'})),
        h(Card,{className:'profile-card',title:'General information',extra:link('View information',()=>setTab('information'))},
          descriptions([['Phone number',c.phone],['Email',c.email],['Date of birth',dateText(c.dob)],['Group',c.group]])),
        h(Card,{className:'profile-card',title:'Care notes',extra:link('View all',()=>setTab('care'))},
          c.notes.length ? c.notes.slice(0,2).map(n=>h('div',{className:'note-item',key:n.id},statusTag(n.type),h('p',null,n.text),h('small',{className:'secondary-text'},n.author + ' - ' + n.date)))
          : h(Empty,{image:Empty.PRESENTED_IMAGE_SIMPLE,description:'No care notes'}))
      ));
    if (kind === 'information') return h('div',null,
      heading('Customer information','Personal details, contact information and customer classification.',h(Button,{icon:icon('edit'),onClick:openEditor},'Edit information')),
      h(Card,{className:'profile-card',title:'General information'},descriptions([['First name',c.first],['Last name',c.last],['Phone number',c.phone],['Email',c.email],['Date of birth',dateText(c.dob)],['Gender',c.gender],['Location',c.location],['Customer ID','#' + c.id]])),
      h('div',{className:'two-columns'},
        h(Card,{className:'profile-card',title:'Address'},descriptions([['Address',c.address],['City',c.city],['State',c.state],['Zip code',c.zip]])),
        h(Card,{className:'profile-card',title:'Reference'},descriptions([['Group',c.group],['Client tag',c.tags.length ? h(Space,{wrap:true},...c.tags.map(t=>h(Tag,{key:t,color:'orange'},t))) : '-/-'],['Created by','Steve Tran'],['Referred by',c.referredBy]]))));
    if (kind === 'tickets') return h('div',null,
      heading('Tickets & Services','View the customer\'s transactions or the services received.'),
      h('div',{className:'profile-toolbar'},h(Segmented,{options:['Tickets','Services'],value:segment,onChange:setSegment}),search('Search ticket, service or staff')),
      dataTable(segment === 'Tickets' ? [
        col('Ticket','id',(_,r)=>link(r.id,()=>ticketDetail(r))),col('Visit date','date',dateText),
        col('Services','service'),col('Payment','method'),col('Total','amount',money),col('Status','status',statusTag)
      ] : [
        col('Service','service'),col('Visit date','date',dateText),col('Staff','staff'),
        col('Ticket','id',(_,r)=>link(r.id,()=>ticketDetail(r))),col('Amount','amount',money)
      ],filter(c.tickets)));
    if (kind === 'gifts') return h('div',null,
      heading('Gift Cards','Cards purchased by this customer and their linked transactions.'),
      h('div',{className:'profile-toolbar'},search('Search gift card')),
      dataTable([
        col('Gift card','code',(_,g)=>link(g.code,()=>detail('Gift Card ' + g.id,[
          ['Purchased by',nameOf(c)],['Status',statusTag(g.status)],['Total loaded',money(g.loaded)],['Total used',money(g.used)],['Balance',money(g.balance)],['Purchased on',dateText(g.purchased)]
        ],'Top-up: ' + money(g.loaded) + ' on Aug 24. Usage: ' + money(g.used) + ' on Sep 15.'))),
        col('Purchase date','purchased',dateText),col('Loaded','loaded',money),col('Used','used',money),col('Balance','balance',money),col('Status','status',statusTag)
      ],filter(c.gifts)),
      h('p',{className:'secondary-text',style:{marginTop:14}},'The purchaser is not necessarily the recipient or the person using the card.'));
    if (kind === 'appointments') {
      const rows = c.appointments.filter(row => segment === 'Upcoming' ? row.status === 'Confirmed' : row.status !== 'Confirmed');
      return h('div',null,
        heading('Appointments','Upcoming appointments and previous visits.',h(Button,{type:'primary',icon:icon('plus'),onClick:()=>action('appointment')},'Book appointment')),
        h('div',{className:'profile-toolbar'},h(Segmented,{options:['Upcoming','History'],value:segment,onChange:setSegment}),search('Search service or staff')),
        dataTable([
          col('Appointment','id',(_,r)=>link(r.id,()=>appointmentDetail(r))),
          col('Date & time','date',(_,r)=>h('span',null,dateText(r.date),h('small',{className:'secondary-text'},r.time))),
          col('Service','service'),col('Staff','staff'),col('Status','status',statusTag),
          col('Actions','action',(_,r)=>h(Space,{size:12},
            link(r.status === 'Confirmed' ? 'Reschedule' : 'Rebook',()=>action('appointment',r.status === 'Confirmed' ? r : { ...r, id: null })),
            r.status === 'Confirmed' && link('Cancel',()=>modal.confirm({
              title:'Cancel this appointment?',content:dateText(r.date) + ' - ' + r.time + ' / ' + r.service,
              okText:'Cancel appointment',okButtonProps:{danger:true},cancelText:'Keep appointment',
              onOk:()=>{update({appointments:c.appointments.map(a=>a.id===r.id?{...a,status:'Cancelled'}:a)},'Appointment cancelled',r.id);message.success('Appointment cancelled in this preview.');}
            }))))
        ],filter(rows)));
    }
    if (kind === 'care') return h('div',null,
      heading('Care profile','Notes, preferences and service-specific information.',h(Button,{type:'primary',icon:icon('plus'),onClick:()=>action('note')},'Add note')),
      h('div',{className:'two-columns',style:{marginTop:0}},
        h(Card,{className:'profile-card',title:'Notes & preferences'},
          c.notes.length ? c.notes.map(n=>h('div',{className:'note-item',key:n.id},h(Space,null,statusTag(n.type),h('span',{className:'secondary-text'},n.scope)),h('p',null,n.text),h('span',{className:'secondary-text'},n.author + ' - ' + n.date)))
          : h(Empty,{image:Empty.PRESENTED_IMAGE_SIMPLE,description:'No notes yet'})),
        h('div',null,
          h(Card,{className:'profile-card',style:{height:'auto',marginBottom:20},title:'Staff alerts'},
            c.notes.filter(n=>n.type==='Alert').length ? c.notes.filter(n=>n.type==='Alert').map(n=>h(Alert,{key:n.id,type:'warning',showIcon:true,message:n.text,style:{marginBottom:8}})) : h('p',{className:'detail-subtitle'},'No active alerts for this customer.')),
          h(Card,{className:'profile-card',style:{height:'auto'},title:'Images & attachments'},
            h(Upload,{multiple:true,fileList:c.files,onRemove:file=>{update({files:c.files.filter(f=>f.uid!==file.uid)},'Attachment removed',file.name);},beforeUpload:()=>false,
              onChange:info=>{update({files:info.fileList.map(({uid,name})=>({uid,name,status:'done'}))},'Attachments updated','Updated attachment list.');}},
              h(Button,{icon:icon('upload')},'Add files')),
            h('p',{className:'secondary-text'},'File names are kept for this preview session only.')))));
    if (kind === 'contact') return h('div',null,
      heading('Contact history','Sent messages and customer communication preferences.'),
      h(Card,{className:'profile-card',title:'Communication preferences',style:{height:'auto',marginBottom:20}},
        ...[['sms','SMS notifications','Appointment confirmations and reminders'],['email','Email notifications','Appointment updates and receipts'],['marketing','Marketing messages','Offers and salon updates']].map(([key,title,desc])=>
          h('div',{className:'preference-row',key},h('div',null,h('b',null,title),h('span',null,desc)),h(Switch,{checked:c.preferences[key],'aria-label':title,onChange:checked=>update({preferences:{...c.preferences,[key]:checked}},'Communication preference updated',title + ': ' + (checked?'On':'Off'))})))),
      h('div',{className:'profile-toolbar'},search('Search message or channel')),
      dataTable([col('Message','title',(_,m)=>link(m.title,()=>detail(m.title,[['Channel',m.channel],['Sent at',m.date],['Status',statusTag(m.status)],['Message',m.text]],'Message details'))),col('Channel','channel'),col('Sent at','date'),col('Status','status',statusTag)],filter(c.messages)));
    if (kind === 'loyalty') return h('div',null,
      heading('Loyalty & Referrals','Points history and customer referral relationships.'),
      h('div',{className:'stats-grid',style:{gridTemplateColumns:'repeat(2,minmax(0,1fr))'}},
        h(Card,{size:'small'},h(Statistic,{title:'Available points',value:c.loyalty.reduce((sum,r)=>sum+r.change,0)}),h('div',{className:'stat-caption'},'Example program balance')),
        h(Card,{size:'small'},h(Statistic,{title:'Referred customers',value:c.referrals.length}),h('div',{className:'stat-caption'},'Referrals do not automatically award points'))),
      h(Card,{className:'profile-card',title:'Points history',style:{height:'auto'}},
        dataTable([col('Date','date'),col('Activity','reason'),col('Points','change',v=>h('span',{style:{color:v>0?'#55aa35':'#cf1322'}},(v>0?'+':'')+v))],c.loyalty,{scroll:{x:480}})),
      h('div',{className:'two-columns'},
        h(Card,{className:'profile-card',title:'Referred by'},h('div',{className:'detail-title'},c.referredBy || 'No referrer recorded')),
        h(Card,{className:'profile-card',title:'Referring'},c.referrals.length ? h(List,{dataSource:c.referrals,renderItem:r=>h(List.Item,{key:r.id},r.name,h('span',{className:'secondary-text'},r.date))}) : h(Empty,{image:Empty.PRESENTED_IMAGE_SIMPLE,description:'No referrals'}))));
    if (kind === 'feedback') return h('div',null,
      heading('Reviews & Feedback','Service ratings and feedback that needs follow-up.',h(Button,{icon:icon('plus'),onClick:()=>action('feedback')},'Add feedback')),
      h('div',{className:'profile-toolbar'},search('Search review or feedback')),
      dataTable([
        col('Date','date'),col('Type','kind'),col('Rating','score',v=>v?h(Rate,{disabled:true,value:v,style:{fontSize:13}},null):'-/-'),
        col('Feedback','text',(v,r)=>link(v.length>48?v.slice(0,48)+'...':v,()=>detail(r.kind + ' ' + r.id,[['Customer',nameOf(c)],['Service',r.service],['Status',statusTag(r.status)],['Feedback',r.text]],r.date))),
        col('Status','status',statusTag),
        col('Actions','action',(_,r)=>r.status==='Open'?link('Resolve',()=>{update({feedback:c.feedback.map(f=>f.id===r.id?{...f,status:'Resolved'}:f)},'Feedback resolved',r.id);message.success('Feedback marked as resolved.');}):h('span',null,'-/-'))
      ],filter(c.feedback)));
    return h('div',null,
      heading('Activity log','Who changed customer information, when, and what changed.'),
      h('div',{className:'profile-toolbar'},search('Search activity or staff')),
      h(Card,{className:'profile-card'},
        filter(c.activity).length ? h(Timeline,{className:'activity-timeline',items:filter(c.activity).map(a=>({
          color:'#ff5b20',children:h('div',null,h('strong',null,a.action),h('p',null,a.author + ' - ' + a.date),h('div',{className:'detail-subtitle'},a.details))
        }))}) : h(Empty,{image:Empty.PRESENTED_IMAGE_SIMPLE,description:'No matching activity'})));
  }
  function CustomerApp() {
    const { message } = AntApp.useApp();
    const width = useWidth();
    const [collapsed,setCollapsed] = useState(false);
    const [mobileMenu,setMobileMenu] = useState(false);
    const [rows,setRows] = useState(initialCustomers);
    const [location,setLocation] = useState('Lewis Center');
    const [group,setGroup] = useState('All customers');
    const [groupQuery,setGroupQuery] = useState('');
    const [query,setQuery] = useState('');
    const [gender,setGender] = useState('All genders');
    const [filterOpen,setFilterOpen] = useState(false);
    const [draftGender,setDraftGender] = useState('All genders');
    const [page,setPage] = useState(1);
    const [pageSize,setPageSize] = useState(10);
    const [selected,setSelected] = useState(null);
    const [tab,setTab] = useState('overview');
    const [editing,setEditing] = useState(null);
    const [details,setDetails] = useState(null);
    const [actionState,setActionState] = useState(null);
    const [actionForm] = Form.useForm();
    const c = rows.find(r=>r.id===selected);
    const short = width <= 1180 || collapsed;
    const localRows = rows.filter(r=>r.location===location);
    const filtered = localRows.filter(r=>(group==='All customers'||r.group===group) &&
      (gender==='All genders'||r.gender===gender) &&
      [nameOf(r),r.id,r.phone,r.email].join(' ').toLowerCase().includes(query.trim().toLowerCase()));
    useEffect(()=>setPage(1),[query,group,location,gender,pageSize]);
    const showProfile = row => { setSelected(row.id); setTab('overview'); };
    const update = (patch,action,description='') => {
      const event = {id:'A-'+Date.now(),action,date:stamp(),author:'Steve Tran',details:description};
      setRows(previous=>previous.map(row=>row.id===selected?{...row,...patch,activity:[event,...row.activity]}:row));
    };
    const detail = (title,items,subtitle) => setDetails({title,items,subtitle});
    const openAction = (type,data={}) => {
      actionForm.resetFields();
      actionForm.setFieldsValue(type==='appointment'?{date:data.date?dayjs(data.date):dayjs('2026-09-21'),time:data.time||'10:30 AM',service:data.service||'Gel Manicure',staff:data.staff||'Nguyen Thao'}:{type:'Note',scope:'Customer',text:''});
      setActionState({type,data});
    };
    const saveAction = values => {
      if (actionState.type==='note') {
        update({notes:[{id:'N-'+Date.now(),...values,author:'Steve Tran',date:stamp()},...c.notes]},'Care note added',values.type + ' - ' + values.scope);
      } else if (actionState.type==='feedback') {
        update({feedback:[{id:'FB-'+Date.now(),date:dayjs().format('MMM DD, YYYY'),kind:'Feedback',score:null,status:'Open',service:'Customer feedback',text:values.text},...c.feedback]},'Feedback recorded',values.text);
      } else {
        const id = actionState.data.id || 'AP-'+Date.now().toString().slice(-5);
        const appointment = {id,...values,date:values.date.format('YYYY-MM-DD'),status:'Confirmed'};
        const existing = c.appointments.some(a=>a.id===id);
        update({appointments:existing?c.appointments.map(a=>a.id===id?appointment:a):[appointment,...c.appointments]},existing?'Appointment rescheduled':'Appointment booked',id+' - '+dateText(appointment.date));
      }
      setActionState(null);
      message.success('Saved in this preview.');
    };
    const saveCustomer = values => {
      const id = editing.id || String(Math.max(...rows.map(r=>Number(r.id)))+1).padStart(5,'0');
      const base = editing.id ? rows.find(r=>r.id===id) : customer(id,values.first,values.last||'',values.group,values.phone,values.gender,values.location);
      const event = {id:'A-'+Date.now(),action:editing.id?'Customer information updated':'Customer created',date:stamp(),author:'Steve Tran',details:editing.id?'Updated general information.':'Created a customer profile.'};
      const updated = {...base,...values,id,activity:[event,...(editing.id?base.activity:[])]};
      setRows(previous=>editing.id?previous.map(r=>r.id===id?updated:r):[updated,...previous]);
      setEditing(null);
      if(!editing.id) {setLocation(updated.location);setGroup('All customers');setQuery('');setGender('All genders');setSelected(id);setTab('information');}
      message.success('Customer saved in this preview.');
    };
    const moduleNames = [['checkin','Check-in'],['turn','Turn'],['calendar','Calendar'],['customers','Customers'],['catalog','Catalog'],['team','Team'],['reports','Reports'],['marketing','Marketing']];
    const navigation = (mobile=false) => h('div',{className:'sidebar-inner'},
      h('div',{className:'brand-row'},h('a',{className:'logo',href:'#',onClick:e=>{e.preventDefault();setSelected(null);},'aria-label':'Beelia home'},'beelia'),
        h(Button,{type:'text',icon:icon('menu'),'aria-label':mobile?'Close navigation':'Collapse navigation',onClick:()=>mobile?setMobileMenu(false):setCollapsed(!collapsed)})),
      h(Menu,{className:'app-menu',mode:'inline',inlineCollapsed:mobile?false:short,selectedKeys:['customers'],items:moduleNames.map(([key,label])=>({key,label,icon:icon(key)})),onClick:({key})=>{
        if(key==='customers'){setSelected(null);setMobileMenu(false);}else message.info('This preview contains the Customers module.');
      }}),
      h('button',{className:'sidebar-setting',onClick:()=>message.info('Settings are outside this customer preview.'),'aria-label':'Settings'},icon('settings'),h('span',null,'Setting')));
    const columns = [
      col('Customer','first',(_,r)=>h('div',{className:'name-cell'},h(Avatar,{size:34,className:'customer-avatar'},initials(r)),
        h('div',null,h('button',{className:'customer-name',onClick:e=>{e.stopPropagation();showProfile(r);}},nameOf(r)),h('span',{className:'secondary-text'},'# '+r.id))),210),
      col('Contact','phone',(_,r)=>h('div',{className:'contact-lines'},r.phone||'-/-',h('span',{className:'secondary-text'},r.email||'-/-')),200),
      col('Gender','gender',v=>h(Tag,{color:v==='Female'?'magenta':'default'},v),125),
      col('Date of birth','dob',dateText,150),
      col('Group','group',v=>v==='All customers'?'-/-':v,165),
      col('Actions','actions',(_,r)=>h(Tooltip,{title:'Edit customer'},h(Button,{type:'text',className:'action-icon',icon:icon('edit'),'aria-label':'Edit '+nameOf(r),onClick:e=>{e.stopPropagation();setEditing({...r});}})),85)
    ];
    const groupControl = value => {setGroup(value);};
    const profileOpen = !!c;
    return h(React.Fragment,null,
      h(Layout,{className:'app-shell'},
        width>760 && h(Sider,{width:270,collapsedWidth:82,collapsed:short,className:'app-sider'},navigation()),
        h(Layout,{className:'main-shell'},
          h('header',{className:'topbar'},
            h('div',{className:'topbar-title'},(width<=760||collapsed) && h(Button,{type:'text',icon:icon('menu'),'aria-label':'Open navigation',onClick:()=>width<=760?setMobileMenu(true):setCollapsed(false)}),h('h1',{className:'page-title'},'Customers')),
            h('div',{className:'top-actions'},
              h(Select,{value:location,options:options(['Lewis Center','ET Company']),'aria-label':'Location',size:'small',style:{height:33},onChange:value=>{setLocation(value);setSelected(null);}}),
              h(Button,{className:'printer-button',onClick:()=>message.info('CloudPrint_0081 - ce4fe is offline.')},h('span',null,'CloudPrint_0081 - ce4fe - ',h('span',{className:'offline'},'(Offline)')),icon('down')),
              h(Badge,{count:'99+',size:'small',className:'notification-badge'},h(Button,{type:'text',className:'top-icon',icon:icon('send'),'aria-label':'Notifications',onClick:()=>message.info('No new notifications in this preview.')})),
              h(Button,{type:'text',className:'top-icon',icon:icon('checkin'),'aria-label':'Tasks',onClick:()=>message.info('No pending tasks in this preview.')}),
              h(Avatar,{size:37,className:'top-avatar'},'S'))),
          h(Tabs,{className:'module-tabs',activeKey:'customers',items:[{key:'customers',label:'All customers'},{key:'profile',label:'Customer profile',disabled:!selected}],onChange:key=>{if(key==='profile'&&c)showProfile(c);}}),
          h('section',{className:'workspace'},
            h('div',{className:'toolbar'},
              h('div',{className:'toolbar-left'},
                h(Input,{className:'customer-search',prefix:icon('search'),allowClear:true,value:query,onChange:e=>setQuery(e.target.value),placeholder:'Search by name, phone number, ID, email','aria-label':'Search customers'}),
                h(Popover,{open:filterOpen,onOpenChange:open=>{setFilterOpen(open);setDraftGender(gender);},trigger:'click',placement:'bottomLeft',
                  content:h('div',{className:'filter-popover'},h('label',{id:'gender-filter-label'},'Gender'),h(Select,{'aria-labelledby':'gender-filter-label',value:draftGender,onChange:setDraftGender,options:options(['All genders','Female','Male','Unspecified'])}),
                    h(Space,null,h(Button,{onClick:()=>{setDraftGender('All genders');setGender('All genders');setFilterOpen(false);}},'Reset'),h(Button,{type:'primary',onClick:()=>{setGender(draftGender);setFilterOpen(false);}},'Apply')))},
                  h(Button,{className:'filter-button',icon:icon('filter'),'aria-expanded':filterOpen},'Filter'))),
              h(Select,{className:'mobile-groups',value:group,onChange:groupControl,options:options(groups),'aria-label':'Customer group'}),
              h(Button,{type:'primary',className:'add-button',icon:icon('plus'),onClick:()=>setEditing({first:'',last:'',gender:'Unspecified',group:'All customers',location,tags:[]})},'Add new customer')),
            gender!=='All genders' && h('div',{className:'filter-summary'},'Filters:',h(Tag,{closable:true,onClose:()=>setGender('All genders')},gender)),
            h('div',{className:'workspace-grid'},
              h('aside',{className:'groups-panel','aria-label':'Customer groups'},
                h('div',{className:'group-heading'},'Groups',h('span',{className:'count-tag'},groups.length-1)),
                h('div',{className:'group-search'},h(Input,{size:'small',prefix:icon('search'),placeholder:'Groups','aria-label':'Search groups',value:groupQuery,onChange:e=>setGroupQuery(e.target.value),allowClear:true})),
                h('div',{className:'group-list'},groups.filter(g=>g.toLowerCase().includes(groupQuery.toLowerCase())).map(g=>h('button',{key:g,className:'group-option'+(group===g?' active':''),'aria-pressed':group===g,onClick:()=>groupControl(g)},g,h('span',{className:'group-count'},g==='All customers'?localRows.length:localRows.filter(r=>r.group===g).length)))),
                h('div',{className:'group-note'},'Select a customer to view their full profile.')),
              h('div',{className:'customer-table'},
                h(Table,{rowKey:'id',columns,dataSource:filtered.slice((page-1)*pageSize,page*pageSize),bordered:true,pagination:false,scroll:{x:935},onRow:r=>({onClick:()=>showProfile(r)}),locale:{emptyText:h(Empty,{image:Empty.PRESENTED_IMAGE_SIMPLE,description:'No customers found'})}}))),
            h('footer',{className:'workspace-foot'},h('span',{className:'preview-caption'},'Interactive preview / Sample data / Changes reset on reload'),
              h(Pagination,{current:page,pageSize,total:filtered.length,onChange:(p,s)=>{setPage(p);setPageSize(s);},showSizeChanger:true,pageSizeOptions:[5,10,20],size:'small',showTotal:total=>total+' customers'}))))),
      h(Drawer,{open:mobileMenu,onClose:()=>setMobileMenu(false),placement:'left',width:270,closable:false,styles:{body:{padding:0}},className:'mobile-nav-drawer'},navigation(true)),
      h(Drawer,{open:profileOpen,onClose:()=>setSelected(null),title:'Customer Details',width:Math.min(1120,width),className:'profile-drawer',destroyOnHidden:true,
        footer:h('div',{className:'drawer-foot-row'},h('span',{className:'preview-caption'},'Customer Profile / Sample data'),h(Button,{onClick:()=>setSelected(null)},'Close'))},
        c && h(React.Fragment,null,
          h('div',{className:'profile-identity'},
            h('div',{className:'profile-identity-main'},h(Avatar,{size:60,className:'customer-avatar'},initials(c)),
              h('div',null,h('h2',{className:'profile-name'},nameOf(c)),h('div',{className:'profile-meta'},h('span',null,'#'+c.id),h('span',null,c.gender),c.tags.map(t=>h(Tag,{key:t,color:'orange'},t))),
                h('div',{className:'profile-contact'},h('span',null,icon('phone'),c.phone||'No phone number'),h('span',null,icon('mail'),c.email||'No email')))),
            h('div',{className:'identity-actions'},h(Button,{icon:icon('edit'),onClick:()=>setEditing({...c})},'Edit'),h(Button,{type:'primary',icon:icon('plus'),onClick:()=>openAction('appointment')},'Book appointment'))),
          h(Tabs,{className:'profile-tabs',activeKey:tab,onChange:setTab,tabBarGutter:28,destroyOnHidden:true,
            items:fsTabs.map(([key,label,fs])=>({key,label,children:h('section',{'data-fs-id':fs},h(ProfileSection,{key:c.id+key,kind:key,c,update,openEditor:()=>setEditing({...c}),setTab,detail,action:openAction}))}))}))),
      h(Editor,{editing,close:()=>setEditing(null),save:saveCustomer,width}),
      h(Modal,{open:!!details,title:details?.title,onCancel:()=>setDetails(null),className:'details-modal',zIndex:1300,footer:h(Button,{type:'primary',onClick:()=>setDetails(null)},'Done')},
        details && h(React.Fragment,null,h('p',{className:'section-subtitle'},details.subtitle),descriptions(details.items,1))),
      h(Modal,{open:!!actionState,title:actionState?.type==='note'?'Add care note':actionState?.type==='feedback'?'Add feedback':actionState?.data.id?'Reschedule appointment':'Book appointment',
        zIndex:1300,onCancel:()=>setActionState(null),onOk:()=>actionForm.submit(),okText:'Save',destroyOnHidden:true},
        h(Form,{form:actionForm,layout:'vertical',onFinish:saveAction,style:{marginTop:20}},
          actionState?.type==='appointment' ? h(React.Fragment,null,
            h('p',{className:'section-subtitle',style:{marginBottom:18}},c ? 'Customer: '+nameOf(c) : ''),
            h(Form.Item,{name:'date',label:'Date',rules:[{required:true,message:'Choose a date.'}]},h(DatePicker,{format:'DD MMM YYYY',style:{width:'100%'}})),
            h(Form.Item,{name:'time',label:'Time',rules:[{required:true}]},h(Select,{options:options(['09:00 AM','10:30 AM','11:00 AM','02:00 PM','03:30 PM'])})),
            h(Form.Item,{name:'service',label:'Service',rules:[{required:true}]},h(Select,{options:options(['Gel Manicure','Classic Pedicure','Gel Manicure + removal'])})),
            h(Form.Item,{name:'staff',label:'Staff',rules:[{required:true}]},h(Select,{options:options(['Nguyen Thao','Sophia Lee','Anyone'])})))
          : h(React.Fragment,null,
            actionState?.type==='note' && h(React.Fragment,null,
              h(Form.Item,{name:'type',label:'Type'},h(Select,{options:options(['Note','Preference','Alert','Service note'])})),
              h(Form.Item,{name:'scope',label:'Applies to'},h(Select,{options:options(['Customer',...(c?.tickets||[]).map(t=>'Ticket '+t.id)])}))),
            h(Form.Item,{name:'text',label:actionState?.type==='note'?'Note':'Feedback',rules:[{required:true,whitespace:true,message:'Enter some text.'}]},h(Input.TextArea,{rows:4,maxLength:1000,showCount:true}))))));
  }
  ReactDOM.createRoot(document.getElementById('root')).render(h(ConfigProvider,{theme},h(AntApp,null,h(CustomerApp))));
})();
