
Aden Stor — Ultra MVP (PWA, Bilingual, GCC Ready)
=================================================

What you have (FREE):
- PWA installable app (Add to Home Screen)
- Bilingual (AR/EN) with live toggle (Settings)
- Currency selector (USD, SAR, AED, KWD, QAR, BHD, OMN, YER)
- Catalog, Product, Custom Order, Checkout (payment stubs), Track, Admin, Settings
- Google Sheets integration READY (paste Apps Script URL in Settings)

Google Apps Script (POST & GET demo):
------------------------------------
// POST to create order; GET ?code=... to fetch; GET ?list=1 to list
function doPost(e){
  const sheet = SpreadsheetApp.getActive().getSheetByName('Orders') || SpreadsheetApp.getActive().insertSheet('Orders');
  const data = JSON.parse(e.postData.contents);
  const code = data.code || ('AS-'+Math.random().toString(36).substring(2,6).toUpperCase()+'-'+(Date.now()+'').slice(-4));
  sheet.appendRow([new Date(), code, data.name, data.phone, data.email, data.category, data.details, data.status||'received']);
  return ContentService.createTextOutput(JSON.stringify({ ok:true, code })).setMimeType(ContentService.MimeType.JSON);
}
function doGet(e){
  const sheet = SpreadsheetApp.getActive().getSheetByName('Orders'); if(!sheet) return ContentService.createTextOutput('[]');
  const vals = sheet.getDataRange().getValues();
  const headers = vals.shift();
  const list = vals.map(r => ({ts:r[0], code:r[1], name:r[2], phone:r[3], email:r[4], category:r[5], details:r[6], status:r[7]}));
  if(e.parameter.list) return ContentService.createTextOutput(JSON.stringify(list)).setMimeType(ContentService.MimeType.JSON);
  const code = e.parameter.code;
  const found = list.find(x=>x.code==code) || {};
  return ContentService.createTextOutput(JSON.stringify(found)).setMimeType(ContentService.MimeType.JSON);
}

Deploy tips:
- Host on Vercel/Netlify (drag & drop folder) — zero cost
- On phone, open URL, then "Add to Home Screen" (PWA)

Security notes:
- Admin page is prototype-only (no auth). Hide/remove before production.
- Replace currency rates in assets/data/currencies.json as needed.

Good luck & scale boldly.
