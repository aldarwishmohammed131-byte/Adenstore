
// Global i18n + settings + PWA helpers
const S = {
  get(k, d=null){ try{return JSON.parse(localStorage.getItem(k)) }catch(e){ return d } },
  set(k, v){ localStorage.setItem(k, JSON.stringify(v)) }
};
async function loadI18n(){
  const lang = (S.get('lang')||'ar');
  const res = await fetch('assets/data/i18n.json'); const dict = await res.json();
  const t = dict[lang]; if(!t) return;
  const ids = Object.keys(t);
  ids.forEach(id=>{
    const el = document.getElementById(id);
    if(el) el.textContent = t[id];
  });
  // dir & lang
  document.documentElement.lang = lang;
  document.documentElement.dir = (lang==='ar'?'rtl':'ltr');
}
document.addEventListener('DOMContentLoaded', loadI18n);
