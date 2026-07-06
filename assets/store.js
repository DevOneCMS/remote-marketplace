
(async function(){
  let manifest={items:[]};
  try{ const res=await fetch('manifest.json',{cache:'no-store'}); manifest=await res.json(); }catch(e){ console.warn('Could not load manifest', e); }
  const items=Array.isArray(manifest.items)?manifest.items:[];
  const featured=items.filter(i=>i.featured).slice(0,6);
  const slider=document.getElementById('featuredSlider'); const dots=document.getElementById('featuredDots'); let current=0;
  function img(i){return i.thumbnail||'assets/img/neon-agency.svg'}
  function showSlide(n){ if(!featured.length||!slider)return; current=n%featured.length; const it=featured[current]; slider.innerHTML=`<img src="${img(it)}" alt=""><div class="slide-content"><b>${it.category||it.type||'package'} · ${it.price||'Free'}</b><h2>${it.name}</h2><p>${it.description||''}</p></div>`; if(dots){dots.querySelectorAll('button').forEach((b,k)=>b.classList.toggle('active',k===current));}}
  if(dots){ featured.forEach((_,i)=>{const b=document.createElement('button'); b.type='button'; b.onclick=()=>showSlide(i); dots.appendChild(b);}); }
  showSlide(0); if(featured.length>1) setInterval(()=>showSlide(current+1),5200);
  const grid=document.getElementById('marketGrid'); const search=document.getElementById('marketSearch'); const tabs=document.getElementById('marketTabs'); let cat='all';
  function card(it){ const price=(it.price||'Free'); const paid=(it.pricing||'free')==='paid'; return `<article class="card" data-category="${it.category||it.type||'package'}" data-search="${(it.name+' '+(it.description||'')+' '+(it.category||'')+' '+(it.type||'')).toLowerCase().replace(/"/g,'&quot;')}"><div class="thumb"><img src="${img(it)}" alt="${it.name||'Package'} thumbnail"></div><div class="card-body"><div class="meta"><span>${it.category||it.type}</span><b class="price ${paid?'paid':'free'}">${price}</b></div><h3>${it.name||'Package'}</h3><p>${it.description||''}</p><div class="card-actions"><a class="mini" href="${it.zip_url||'#'}">${paid?'View':'Download'}</a><a class="mini" href="submit.html">Submit</a></div></div></article>`; }
  function render(){ if(!grid)return; grid.innerHTML=items.map(card).join(''); filter(); }
  function filter(){ const term=(search?.value||'').toLowerCase().trim(); [...document.querySelectorAll('.card')].forEach(c=>{const okCat=cat==='all'||c.dataset.category===cat; const okTerm=!term||(c.dataset.search||'').includes(term); c.style.display=okCat&&okTerm?'':'none';}); }
  search&&search.addEventListener('input',filter); tabs&&tabs.addEventListener('click',e=>{const b=e.target.closest('button[data-filter]'); if(!b)return; cat=b.dataset.filter; tabs.querySelectorAll('button').forEach(x=>x.classList.toggle('active',x===b)); filter();});
  render();
})();
