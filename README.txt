
Aden Stor — Free MVP (Static, No‑Code Friendly)
===============================================

What you have:
- Static bilingual (AR/EN-ready) site: Home, Catalog, Custom Order, Order Tracking
- LocalStorage-based order capture (no server cost)
- Tailwind via CDN, RTL-friendly
- Products sample in assets/data/products.json
- SVG logo included

How to host for FREE:
1) Create a GitHub repo and push /aden-stor-mvp
2) Connect to Vercel (or Netlify) and deploy — zero cost, automatic HTTPS

Make orders REAL (free Google Sheets backend):
---------------------------------------------
A) Create a Google Form with fields: name, phone, email, category, details, file(upload)
   - Link the form to a Google Sheet

B) In Google Apps Script (Extensions > Apps Script) paste this code:

function doPost(e) {
  const sheet = SpreadsheetApp.getActive().getSheetByName('Orders') || SpreadsheetApp.getActive().insertSheet('Orders');
  const data = JSON.parse(e.postData.contents);
  const code = 'AS-' + Math.random().toString(36).substring(2,6).toUpperCase() + '-' + (Date.now()+'').slice(-4);
  sheet.appendRow([new Date(), code, data.name, data.phone, data.email, data.category, data.details]);
  return ContentService.createTextOutput(JSON.stringify({ ok: true, code })).setMimeType(ContentService.MimeType.JSON);
}

- Deploy > New Deployment > type: Web app
- Who has access: Anyone
- Copy the Web app URL.

C) Edit /custom.html: replace the submit handler with a POST to your Apps Script URL:
fetch('YOUR_APPS_SCRIPT_URL', { method:'POST', body: JSON.stringify(order) })
  .then(r => r.json()).then(r => { /* show r.code */ })

Payments & Shipping (later):
- Use PayTabs / HyperPay / KNET official plugins when you migrate to Shopify/Custom backend
- For Yemen: keep Cash on Delivery toggle until gateways are ready

Good luck — this MVP is zero-cost and upgradeable.
