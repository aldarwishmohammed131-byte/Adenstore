
async function init(){
  const rates = await fetch('assets/data/currencies.json').then(r=>r.json());
  const currSel = document.getElementById('curr');
  Object.keys(rates).forEach(k=>{
    const o = document.createElement('option'); o.value=k; o.textContent=k; currSel.appendChild(o);
  });
  document.getElementById('sheet').value = JSON.parse(localStorage.getItem('sheetURL')||'null') || '';
  document.getElementById('ga').value = JSON.parse(localStorage.getItem('gaID')||'null') || '';
  currSel.value = JSON.parse(localStorage.getItem('currency')||'"USD"');
  document.getElementById('lng').value = JSON.parse(localStorage.getItem('lang')||'"ar"');
}
document.getElementById('settingsForm').addEventListener('submit',(e)=>{
  e.preventDefault();
  localStorage.setItem('sheetURL', JSON.stringify(document.getElementById('sheet').value.trim()||null));
  localStorage.setItem('gaID', JSON.stringify(document.getElementById('ga').value.trim()||null));
  localStorage.setItem('currency', JSON.stringify(document.getElementById('curr').value));
  localStorage.setItem('lang', JSON.stringify(document.getElementById('lng').value));
  alert(document.documentElement.lang==='ar'?'تم الحفظ':'Saved');
  location.reload();
});
document.addEventListener('DOMContentLoaded', init);
