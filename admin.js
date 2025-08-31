
async function loadOrders(){
  const box = document.getElementById('orders'); box.innerHTML='';
  const local = JSON.parse(localStorage.getItem('aden_orders')||'[]');
  local.forEach(o=>{
    const d = document.createElement('div');
    d.className = 'border rounded-xl p-3';
    d.innerHTML = `<b>${o.code}</b> — ${o.name||''} • ${o.phone||''} • <span class="text-gray-600">${o.category||''}</span>`;
    box.appendChild(d);
  });
  const sheetURL = JSON.parse(localStorage.getItem('sheetURL')||'null');
  if(sheetURL){
    try{
      const res = await fetch(sheetURL+'?list=1'); const arr = await res.json();
      arr.forEach(o=>{
        const d = document.createElement('div');
        d.className = 'border rounded-xl p-3 bg-yellow-50';
        d.innerHTML = `<b>${o.code}</b> — ${o.name||''} • ${o.phone||''} • <span class="text-gray-600">${o.category||''}</span>`;
        box.appendChild(d);
      });
    }catch(e){}
  }
}
