
document.getElementById('trackForm').addEventListener('submit', async (e)=>{
  e.preventDefault();
  const code = document.getElementById('code').value.trim();
  const info = document.getElementById('info');
  // Try local first
  const all = JSON.parse(localStorage.getItem('aden_orders')||'[]');
  let found = all.find(o=>o.code===code);
  // If not found and sheetURL exists, try remote
  if(!found){
    const sheetURL = JSON.parse(localStorage.getItem('sheetURL')||'null');
    if(sheetURL){
      try{
        const res = await fetch(sheetURL+'?code='+encodeURIComponent(code));
        found = await res.json();
      }catch(e){}
    }
  }
  if(found){
    info.innerHTML = `<div class="border rounded-xl p-4">
      <div class="font-semibold">الحالة: ${found.status||'received'}</div>
      <div class="text-sm text-gray-600 mt-1">الاسم: ${found.name||''} — الهاتف: ${found.phone||''}</div>
      <div class="mt-2">${found.details||''}</div>
      <div class="text-xs text-gray-500 mt-2">${found.code||code}</div>
    </div>`;
  } else {
    info.innerHTML = '<div class="text-red-600" id="not_found">لم يتم العثور على طلب بهذا الرمز.</div>';
  }
});
