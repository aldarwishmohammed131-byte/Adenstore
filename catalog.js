
async function main(){
  const [items, rates] = await Promise.all([
    fetch('assets/data/products.json').then(r=>r.json()),
    fetch('assets/data/currencies.json').then(r=>r.json())
  ]);
  const grid = document.getElementById('grid');
  const sel = document.getElementById('filterSel');
  const currSel = document.getElementById('currency');
  const currencies = Object.keys(rates);
  currencies.forEach(c=>{
    const o = document.createElement('option'); o.value=c; o.textContent=c; currSel.appendChild(o);
  });
  const curr = (JSON.parse(localStorage.getItem('currency'))||'USD');
  currSel.value = curr;
  function fmt(usd){ const rate = rates[currSel.value] || 1; return (usd*rate).toFixed(2) + ' ' + currSel.value; }
  function paint(){
    grid.innerHTML='';
    const cat = sel.value;
    items.filter(x=>cat==='all'||x.category===cat).forEach(p=>{
      const div = document.createElement('div');
      div.className = 'border rounded-xl p-4';
      div.innerHTML = `
        <img src="assets/img/${p.img}" class="w-full rounded-md mb-2">
        <div class="font-semibold">${p.name_ar}</div>
        <div class="text-gray-600">${p.name_en}</div>
        <div class="mt-2 font-bold">${fmt(p.price_usd)}</div>
        <a href="product.html?id=${p.id}" class="mt-3 inline-block bg-black text-white px-4 py-2 rounded-lg text-sm">التفاصيل</a>
      `;
      grid.appendChild(div);
    });
  }
  sel.addEventListener('change', paint);
  currSel.addEventListener('change', ()=>{ localStorage.setItem('currency', JSON.stringify(currSel.value)); paint(); });
  paint();
}
document.addEventListener('DOMContentLoaded', main);
