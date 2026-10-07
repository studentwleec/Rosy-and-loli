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

// Reviews slider
const reviews=[
  {t:'“My bridal makeup lasted 14 hours through tears and hugs! Rosy understood my skin perfectly — I felt like the best version of me.”', n:'— Ayesha K., Bride'},
  {t:'“Best party glam in town. My eyeshadow didn’t crease all night and the lashes felt so light. Got compliments all evening!”', n:'— Maria S., Party Client'},
  {t:'“I order their lipsticks monthly. Pigmented, non-drying and 100% original. The facial glow before my shoot was amazing.”', n:'— Priya R., Model'},
];
let ri=0;
const rt=document.getElementById('reviewText'), rn=document.getElementById('reviewName');
document.getElementById('nextR').onclick=()=>{ri=(ri+1)%reviews.length;rt.textContent=reviews[ri].t;rn.textContent=reviews[ri].n;};
document.getElementById('prevR').onclick=()=>{ri=(ri-1+reviews.length)%reviews.length;rt.textContent=reviews[ri].t;rn.textContent=reviews[ri].n;};
setInterval(()=>{ri=(ri+1)%reviews.length;if(rt){rt.textContent=reviews[ri].t;rn.textContent=reviews[ri].n;}},6000);

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
