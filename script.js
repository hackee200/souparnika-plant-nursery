// Souparnika Plant Nursery — customise the WhatsApp number and products below.
// Use your WhatsApp number with country code, digits only (India: 91XXXXXXXXXX).
const WHATSAPP_NUMBER = "918129497575";

const products = [
  {id:1,name:"Cherry Tomato Plant",category:"Vegetable Plants",price:45,tag:"Easy to grow",image:"https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=700&q=80"},
  {id:2,name:"Green Chilli Plant",category:"Vegetable Plants",price:35,tag:"Garden favourite",image:"https://images.unsplash.com/photo-1588252303782-cb80119eb8d4?auto=format&fit=crop&w=700&q=80"},
  {id:3,name:"Kitchen Garden Seed Kit",category:"Seeds",price:99,tag:"Starter kit",image:"https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=700&q=80"},
  {id:4,name:"Sunflower Seeds",category:"Seeds",price:49,tag:"Bright blooms",image:"https://images.unsplash.com/photo-1597848212624-e6e3a7b6f2c5?auto=format&fit=crop&w=700&q=80"},
  {id:5,name:"Golden Money Plant",category:"Indoor Plants",price:149,tag:"Low maintenance",image:"https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=700&q=80"},
  {id:6,name:"Peace Lily",category:"Indoor Plants",price:249,tag:"Customer pick",image:"https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?auto=format&fit=crop&w=700&q=80"},
  {id:7,name:"Areca Palm",category:"Outdoor Plants",price:299,tag:"Tropical touch",image:"https://images.unsplash.com/photo-1597055181300-e3633a917a3d?auto=format&fit=crop&w=700&q=80"},
  {id:8,name:"Snake Plant",category:"Outdoor Plants",price:199,tag:"Tough & lovely",image:"https://images.unsplash.com/photo-1593482892290-f54927ae2b9b?auto=format&fit=crop&w=700&q=80"},
  {id:9,name:"Desi Rose Plant",category:"Flower Plants",price:129,tag:"Colourful blooms",image:"https://images.unsplash.com/photo-1494972308805-463bc619d34e?auto=format&fit=crop&w=700&q=80"},
  {id:10,name:"Hibiscus Plant",category:"Flower Plants",price:89,tag:"Garden classic",image:"https://images.unsplash.com/photo-1597848212624-e6e3a7b6f2c5?auto=format&fit=crop&w=700&q=80"},
  {id:11,name:"Guava Sapling",category:"Fruit Plants",price:179,tag:"Grow your own",image:"https://images.unsplash.com/photo-1537640538966-79f369143f8f?auto=format&fit=crop&w=700&q=80"},
  {id:12,name:"Lemon Plant",category:"Fruit Plants",price:159,tag:"Fresh & fragrant",image:"https://images.unsplash.com/photo-1590502593747-42a996133562?auto=format&fit=crop&w=700&q=80"}
];

let cart = [];
let activeCategory = "All";
const productGrid = document.getElementById("productGrid");
const cartDrawer = document.getElementById("cartDrawer");
const overlay = document.getElementById("overlay");
const money = value => "₹" + value.toLocaleString("en-IN");

function renderProducts(){
  const term = document.getElementById("searchInput").value.trim().toLowerCase();
  const visible = products.filter(p => (activeCategory === "All" || p.category === activeCategory) && (p.name.toLowerCase().includes(term) || p.category.toLowerCase().includes(term)));
  document.getElementById("productCount").textContent = `Showing ${visible.length} ${visible.length === 1 ? "plant" : "plants"}`;
  document.getElementById("emptyState").hidden = visible.length !== 0;
  productGrid.innerHTML = visible.map(p => `
    <article class="product-card">
      <div class="product-image-wrap"><img src="${p.image}" alt="${p.name}" loading="lazy"><span class="product-tag">${p.tag}</span></div>
      <div class="product-info"><span class="product-category">${p.category}</span><h3>${p.name}</h3>
        <div class="product-bottom"><span class="product-price">${money(p.price)}</span><button class="add-button" data-add="${p.id}" aria-label="Add ${p.name} to cart">+</button></div>
      </div>
    </article>`).join("");
}
function addToCart(id){
  const item = cart.find(x => x.id === id);
  if(item) item.qty++; else cart.push({id,qty:1});
  renderCart(); showToast("Added to your cart 🌱");
}
function changeQty(id,delta){
  const item=cart.find(x=>x.id===id); if(!item)return;
  item.qty+=delta; if(item.qty<=0)cart=cart.filter(x=>x.id!==id);
  renderCart();
}
function renderCart(){
  const count=cart.reduce((sum,x)=>sum+x.qty,0);
  const total=cart.reduce((sum,x)=>sum+products.find(p=>p.id===x.id).price*x.qty,0);
  document.getElementById("cartCount").textContent=count;
  document.getElementById("drawerCount").textContent=`(${count})`;
  document.getElementById("cartTotal").textContent=money(total);
  const area=document.getElementById("cartItems");
  if(!cart.length){area.innerHTML='<div class="cart-empty"><span>🪴</span><h3>Your cart is growing space.</h3><p>Add a plant you love to get started.</p></div>';return;}
  area.innerHTML=cart.map(x=>{const p=products.find(y=>y.id===x.id);return `
    <div class="cart-row"><img src="${p.image}" alt="${p.name}"><div><h4>${p.name}</h4><small>${money(p.price)} each</small>
    <div class="qty-control"><button data-qty="${p.id}" data-delta="-1" aria-label="Decrease quantity">−</button><span>${x.qty}</span><button data-qty="${p.id}" data-delta="1" aria-label="Increase quantity">+</button></div></div>
    <div class="cart-row-price">${money(p.price*x.qty)}<button class="remove-item" data-remove="${p.id}">Remove</button></div></div>`;}).join("");
}
function openCart(){cartDrawer.classList.add("open");overlay.classList.add("show");cartDrawer.setAttribute("aria-hidden","false");document.body.style.overflow="hidden";}
function closeCart(){cartDrawer.classList.remove("open");overlay.classList.remove("show");cartDrawer.setAttribute("aria-hidden","true");document.body.style.overflow="";}
let toastTimer;
function showToast(message){const t=document.getElementById("toast");t.textContent=message;t.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove("show"),2200);}
function orderOnWhatsApp(){
  if(!cart.length){showToast("Your cart is empty. Pick a plant first!");return;}
  if(WHATSAPP_NUMBER.includes("X")){showToast("Please add your WhatsApp number in script.js first.");return;}
  const lines=cart.map(x=>{const p=products.find(y=>y.id===x.id);return `• ${p.name} x ${x.qty} — ${money(p.price*x.qty)}`;});
  const total=cart.reduce((s,x)=>s+products.find(p=>p.id===x.id).price*x.qty,0);
  const message=`Hello Souparnika Plant Nursery! 🌱\nI'd like to place an order:\n\n${lines.join("\n")}\n\n*Subtotal: ${money(total)}*\n\nPlease confirm availability, delivery charges and payment details. Thank you!`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,"_blank","noopener");
}
productGrid.addEventListener("click",e=>{const b=e.target.closest("[data-add]");if(b)addToCart(Number(b.dataset.add));});
document.getElementById("categoryList").addEventListener("click",e=>{const b=e.target.closest("[data-category]");if(!b)return;activeCategory=b.dataset.category;document.querySelectorAll(".category-chip").forEach(x=>x.classList.toggle("active",x===b));renderProducts();});
document.getElementById("searchInput").addEventListener("input",renderProducts);
document.getElementById("cartItems").addEventListener("click",e=>{const q=e.target.closest("[data-qty]"),r=e.target.closest("[data-remove]");if(q)changeQty(Number(q.dataset.qty),Number(q.dataset.delta));if(r){cart=cart.filter(x=>x.id!==Number(r.dataset.remove));renderCart();}});
document.getElementById("cartOpen").addEventListener("click",openCart);
document.getElementById("cartClose").addEventListener("click",closeCart);
document.getElementById("continueShopping").addEventListener("click",closeCart);
overlay.addEventListener("click",closeCart);
document.getElementById("checkoutBtn").addEventListener("click",orderOnWhatsApp);
document.getElementById("contactWhatsapp").href=`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello Souparnika Plant Nursery! I'd like to know more about your plants.")}`;
const menuToggle=document.getElementById("menuToggle"),nav=document.getElementById("mainNav");
menuToggle.addEventListener("click",()=>{const open=nav.classList.toggle("open");menuToggle.setAttribute("aria-expanded",String(open));});
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");menuToggle.setAttribute("aria-expanded","false");}));
document.getElementById("year").textContent=new Date().getFullYear();
renderProducts();renderCart();
