const products = [
  {id:1, cat:'lips', name:'Velvet Matte Lipstick — Rosy Nude', price:19, rating:'★★★★★ (2.1k)', img:'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&q=80&auto=format&fit=crop'},
  {id:2, cat:'face', name:'Silk Glow Foundation — 12 Shades', price:29, rating:'★★★★★ (3.4k)', img:'https://images.unsplash.com/photo-1631729331316-9b2493a1e2d8?w=600&q=80&auto=format&fit=crop'},
  {id:3, cat:'eyes', name:'Rose Gold Eyeshadow Palette', price:35, rating:'★★★★★ (1.8k)', img:'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&q=80&auto=format&fit=crop'},
  {id:4, cat:'face', name:'HD Setting Spray + Primer Duo', price:24, rating:'★★★★☆ (980)', img:'https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=600&q=80&auto=format&fit=crop'},
  {id:5, cat:'lips', name:'Plump Gloss Kit — 6 Shades', price:22, rating:'★★★★★ (1.2k)', img:'https://images.unsplash.com/photo-1599305090598-fe179d501227?w=600&q=80&auto=format&fit=crop'},
  {id:6, cat:'eyes', name:'Volume Lash Mascara + Liner', price:18, rating:'★★★★☆ (860)', img:'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=600&q=80&auto=format&fit=crop'},
  {id:7, cat:'face', name:'Blush & Highlighter Glow Duo', price:26, rating:'★★★★★ (1.5k)', img:'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&q=80&auto=format&fit=crop'},
  {id:8, cat:'lips', name:'Bridal Red — Long Wear Lip Kit', price:21, rating:'★★★★★ (2.7k)', img:'https://images.unsplash.com/photo-1503236823255-94609f598e71?w=600&q=80&auto=format&fit=crop'},
];

const grid = document.getElementById('productGrid');
let cart = {};

function renderProducts(filter='all'){
  grid.innerHTML = '';
  products.filter(p=>filter==='all'||p.cat===filter).forEach(p=>{
    const el = document.createElement('article');
    el.className='card';
    el.innerHTML = `<img src="${p.img}" alt="${p.name}" loading="lazy"/>
      <div class="card-body"><div style="font-size:12px;color:#eab308">${p.rating}</div>
      <h3 style="font-size:17px;font-family:Poppins">${p.name}</h3>
      <span class="price-tag">$${p.price} • ${p.cat.toUpperCase()}</span>
      <button class="add" onclick="addToCart(${p.id})">Add to Bag 🛍️</button></div>`;
    grid.appendChild(el);
  });
}
renderProducts();

document.querySelectorAll('.chip').forEach(c=>c.addEventListener('click',()=>{
  document.querySelectorAll('.chip').forEach(x=>x.classList.remove('active'));
  c.classList.add('active');
  renderProducts(c.dataset.filter);
}));

function addToCart(id){
  cart[id]=(cart[id]||0)+1;
  updateCart();
  openDrawer();
}
function changeQty(id,d){
  cart[id]=(cart[id]||0)+d;
  if(cart[id]<=0) delete cart[id];
  updateCart();
}
function updateCart(){
  const items = document.getElementById('cartItems');
  const count = Object.values(cart).reduce((a,b)=>a+b,0);
  document.getElementById('cartCount').textContent = count;
  document.getElementById('drawerCount').textContent = count;
  if(count===0){ items.innerHTML = `<div class="empty">Your bag is empty.<br>✨ Add some glow! ✨</div>`; document.getElementById('cartTotal').textContent='$0'; return; }
  let total=0; items.innerHTML='';
  Object.entries(cart).forEach(([id,qty])=>{
    const p = products.find(x=>x.id==id); total+=p.price*qty;
    const row=document.createElement('div'); row.className='cart-row';
    row.innerHTML=`<img src="${p.img}"/><div><strong style="font-size:13px">${p.name}</strong><br><small>$${p.price} each</small></div>
    <div class="qty"><button onclick="changeQty(${p.id},-1)">−</button><b>${qty}</b><button onclick="changeQty(${p.id},1)">+</button></div>`;
    items.appendChild(row);
  });
  document.getElementById('cartTotal').textContent='$'+total;
}
updateCart();

const drawer=document.getElementById('drawer'), overlay=document.getElementById('overlay');
function openDrawer(){drawer.classList.add('show');overlay.classList.add('show');}
function closeDrawer(){drawer.classList.remove('show');overlay.classList.remove('show');}
document.getElementById('cartOpen').onclick=openDrawer;
document.getElementById('cartClose').onclick=closeDrawer;
overlay.onclick=closeDrawer;
document.getElementById('checkout').onclick=()=>{
  if(Object.keys(cart).length===0){alert('Your bag is empty!');return;}
  const total=document.getElementById('cartTotal').textContent;
  alert(`Thank you for shopping with Rosy & Loli! Total ${total}\nWe’ll contact you for payment & delivery 💖`);
  cart={};updateCart();closeDrawer();
};

// Reviews — rich section, same design style
let userRating = 5;
let rFilter = 'all';
const reviewData = [
  {name:'Ayesha K.', tag:'Bride', service:'Bridal Makeup', stars:5, date:'Sept 2026', title:'My bridal makeup lasted 14 hours!', text:'Through tears and hugs it stayed flawless. Rosy understood my skin perfectly — I felt like the best version of me.', color:'#e93a7d', helpful:214},
  {name:'Maria S.', tag:'Party Client', service:'Party Glam', stars:5, date:'Sept 2026', title:'Compliments all evening', text:'Best party glam in town. Eyeshadow didn’t crease all night and the lashes felt so light and natural.', color:'#7c3aed', helpful:96},
  {name:'Priya R.', tag:'Model', service:'Shop Product', stars:5, date:'Aug 2026', title:'Lipsticks I reorder monthly', text:'Pigmented, non-drying and 100% original. The hydra-glow facial before my shoot gave the perfect base.', color:'#059669', helpful:143},
  {name:'Sana M.', tag:'Bridesmaid', service:'Hair & Styling', stars:4, date:'Aug 2026', title:'Gorgeous hair, slight wait', text:'My waves and my sister’s bun looked stunning in photos. Had to wait 20 mins past appointment, but worth it.', color:'#ea580c', helpful:58},
  {name:'Hira T.', tag:'Bride', service:'Bridal Makeup', stars:5, date:'July 2026', title:'Airbrush magic for oily skin', text:'I have very oily skin and nothing stayed before. Their airbrush + setting routine kept me matte for 10+ hours.', color:'#0e7490', helpful:187},
  {name:'Elena D.', tag:'Facial Client', service:'Skin + Facial Glow', stars:4, date:'July 2026', title:'Glowing skin, gentle products', text:'De-tan + glow facial made my skin so smooth. Makeup applied like a dream after. Will come monthly.', color:'#be123c', helpful:41},
];
function starStr(n){ return '★★★★★'.slice(0,n) + '☆☆☆☆☆'.slice(0,5-n); }
function renderReviews(){
  const wrap = document.getElementById('reviewGrid');
  if(!wrap) return;
  const list = reviewData.filter(r => {
    if(rFilter==='all') return true;
    if(rFilter==='bridal') return /bridal/i.test(r.service);
    return r.stars === Number(rFilter);
  });
  wrap.innerHTML = list.length ? '' : `<p class="sub">No reviews match this filter yet.</p>`;
  list.forEach((r, idx) => {
    const el = document.createElement('article');
    el.className = 'card rev-card';
    el.innerHTML = `<div class="rev-top">
        <div class="avatar" style="background:${r.color}">${r.name.charAt(0)}</div>
        <div><strong>${r.name}</strong><small>${r.tag} • ${r.date}</small></div>
        <span class="verified">✔ Verified</span>
      </div>
      <div class="rev-stars">${starStr(r.stars)} <span class="price-tag">${r.service}</span></div>
      <h4>${r.title}</h4><p>“${r.text}”</p>
      <div class="rev-foot"><small style="color:var(--muted)">Was this helpful?</small>
      <button class="helpful" data-i="${idx}">♡ Helpful (${r.helpful})</button></div>`;
    wrap.appendChild(el);
  });
  wrap.querySelectorAll('.helpful').forEach(b => b.addEventListener('click', () => {
    const r = list[Number(b.dataset.i)];
    r.helpful++; b.textContent = `♥ Helpful (${r.helpful})`; b.classList.add('liked');
  }));
}
renderReviews();
document.querySelectorAll('[data-rfilter]').forEach(c => c.addEventListener('click', () => {
  document.querySelectorAll('[data-rfilter]').forEach(x => x.classList.remove('active'));
  c.classList.add('active'); rFilter = c.dataset.rfilter; renderReviews();
}));
document.querySelectorAll('#rateInput button').forEach(b => b.addEventListener('click', () => {
  userRating = Number(b.dataset.v);
  document.querySelectorAll('#rateInput button').forEach(x => x.classList.toggle('on', Number(x.dataset.v) <= userRating));
}));
const wr = document.getElementById('writeReview');
if(wr) wr.addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('rName').value.trim();
  const text = document.getElementById('rText').value.trim();
  const service = document.getElementById('rService').value;
  const title = document.getElementById('rTitle').value.trim() || 'Lovely experience';
  const msg = document.getElementById('reviewMsg');
  if(!name || !text){ msg.style.color = '#dc2626'; msg.textContent = 'Please add your name and review.'; return; }
  const colors = ['#e93a7d','#7c3aed','#059669','#ea580c','#0e7490'];
  reviewData.unshift({name, tag:'New Client', service, stars:userRating, date:'Just now', title, text, color:colors[reviewData.length % colors.length], helpful:0});
  rFilter = 'all';
  document.querySelectorAll('[data-rfilter]').forEach(x => x.classList.toggle('active', x.dataset.rfilter === 'all'));
  renderReviews();
  msg.style.color = '#16a34a'; msg.textContent = `Thank you ${name}! Your ${userRating}★ review is live below 💖`;
  e.target.reset(); userRating = 5;
  document.querySelectorAll('#rateInput button').forEach(x => x.classList.toggle('on', Number(x.dataset.v) <= 5));
  document.getElementById('reviewGrid').scrollIntoView({behavior:'smooth', block:'center'});
});

// Booking
document.querySelectorAll('[data-book]').forEach(b=>b.addEventListener('click',()=>{
  const s=document.getElementById('bService');
  if(s) s.value=b.dataset.book;
  document.getElementById('booking').scrollIntoView({behavior:'smooth'});
}));
document.getElementById('bookForm').addEventListener('submit',e=>{
  e.preventDefault();
  const name=document.getElementById('bName').value.trim();
  const phone=document.getElementById('bPhone').value.trim();
  const service=document.getElementById('bService').value;
  const date=document.getElementById('bDate').value;
  const msg=document.getElementById('bookMsg');
  if(!name||!phone||!date){msg.style.color='#dc2626';msg.textContent='Please fill name, phone and date.';return;}
  msg.style.color='#16a34a';
  msg.textContent=`Thank you ${name}! Your ${service} on ${date} is requested. We’ll WhatsApp ${phone} shortly 💖`;
  e.target.reset();
});

// Mobile nav + lightbox
document.getElementById('hamburger').onclick=()=>document.getElementById('navLinks').classList.toggle('show');
document.querySelectorAll('#navLinks a').forEach(a=>a.onclick=()=>document.getElementById('navLinks').classList.remove('show'));
const lb=document.getElementById('lightbox'), li=document.getElementById('lightImg');
document.querySelectorAll('.gallery img').forEach(im=>im.onclick=()=>{li.src=im.src;lb.classList.add('show');});
lb.onclick=()=>lb.classList.remove('show');
