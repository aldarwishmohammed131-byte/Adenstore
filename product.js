
async function main(){
  const url = new URL(location.href);
  const id = url.searchParams.get('id');
  const [items, rates] = await Promise.all([
    fetch('assets/data/products.json').then(r=>r.json()),
    fetch('assets/data/currencies.json').then(r=>r.json())
  ]);
  const curr = JSON.parse(localStorage.getItem('currency'))||'USD';
  const p = items.find(x=>x.id===id) || items[0];
  document.getElementById('pimg').src = 'assets/img/'+p.img;
  document.getElementById('pdesc').textContent = p.desc_ar + ' / ' + p.desc_en;
  const price = (p.price_usd * (rates[curr]||1)).toFixed(2) + ' ' + curr;
  document.getElementById('pprice').textContent = price;
  const a = document.getElementById('add_to_custom');
  a.addEventListener('click', (e)=>{ e.preventDefault(); location.href = 'custom.html?pid='+p.id });
}
document.addEventListener('DOMContentLoaded', main);
