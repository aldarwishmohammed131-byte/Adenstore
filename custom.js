
function genCode(){ return 'AS-' + Math.random().toString(36).substring(2,6).toUpperCase() + '-' + Date.now().toString().slice(-4); }
document.getElementById('customForm').addEventListener('submit', async (e)=>{
  e.preventDefault();
  const fd = new FormData(e.target);
  const order = Object.fromEntries(fd.entries());
  order.code = genCode(); order.status = 'received'; order.ts = new Date().toISOString();
  // If user configured Apps Script URL, send there
  const sheetURL = JSON.parse(localStorage.getItem('sheetURL')||'null');
  const out = document.getElementById('result');
  try{
    if(sheetURL){
      const res = await fetch(sheetURL, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(order)});
      const data = await res.json().catch(()=>({}));
      if(data && (data.code||data.ok)){
        order.code = data.code || order.code;
        out.innerHTML = (document.documentElement.lang==='ar'?'تم استلام طلبك. رمز التتبع: ':'Order received. Code: ') + '<b>'+order.code+'</b>';
      } else {
        throw new Error('Bad response');
      }
    } else {
      const all = JSON.parse(localStorage.getItem('aden_orders')||'[]'); all.push(order);
      localStorage.setItem('aden_orders', JSON.stringify(all));
      out.innerHTML = (document.documentElement.lang==='ar'?'تم استلام طلبك. رمز التتبع: ':'Order received. Code: ') + '<b>'+order.code+'</b>';
    }
    out.classList.remove('hidden');
    e.target.reset();
  }catch(err){
    out.innerHTML = (document.documentElement.lang==='ar'?'تعذّر إرسال الطلب، تم حفظه محليًا. رمز: ':'Failed to submit; saved locally. Code: ') + '<b>'+order.code+'</b>';
    out.classList.remove('hidden');
  }
});
