const products = [
{id:"mug",name:"Stoneware Coffee Mug",category:"Home",price:24,oldPrice:30,rating:"4.9",reviews:128,badge:"Bestseller",color:"#d9dfcc",symbol:"mug",description:"A tactile, everyday mug with a soft matte glaze and a comfortable handle. Made for slow mornings and second cups."},
{id:"headphones",name:"Studio Wireless Headphones",category:"Tech",price:89,rating:"4.8",reviews:86,badge:"Popular",color:"#d8d9e9",symbol:"headphones",description:"Comfort-first wireless headphones with a clean silhouette, balanced sound, and up to 30 hours of listening in this concept product."},
{id:"tote",name:"Everyday Canvas Tote",category:"Accessories",price:32,rating:"4.7",reviews:94,badge:"New",color:"#ead8c1",symbol:"tote",description:"A roomy reusable canvas tote for errands, books, and everything that comes along. Simple, sturdy, and ready for everyday use."},
{id:"lamp",name:"Arc Table Lamp",category:"Home",price:76,rating:"4.9",reviews:52,color:"#e6d7b8",symbol:"lamp",description:"A sculptural table lamp that brings a warm, considered glow to a desk, bedside table, or reading corner."},
{id:"bottle",name:"Insulated Travel Bottle",category:"Accessories",price:28,rating:"4.6",reviews:73,color:"#c9dedb",symbol:"bottle",description:"A reusable insulated bottle designed for commutes, workouts, and days out. Minimal form, practical everyday function."},
{id:"speaker",name:"Pocket Bluetooth Speaker",category:"Tech",price:54,rating:"4.8",reviews:61,badge:"Staff pick",color:"#d9d0e7",symbol:"speaker",description:"Compact portable sound with an easy-to-carry shape and a calm, minimal finish. A concept listing for the capstone storefront."},
{id:"notebook",name:"Linen Bound Notebook",category:"Stationery",price:18,rating:"4.7",reviews:145,color:"#e5d9cb",symbol:"book",description:"A linen-textured notebook for plans, sketches, lists, and ideas worth keeping. Designed to live on your desk or travel with you."},
{id:"plant",name:"Ceramic Planter Set",category:"Home",price:42,rating:"4.8",reviews:38,color:"#d2e0cc",symbol:"plant",description:"A pair of clean-lined ceramic planters that add a little green to a shelf, desk, or sunny window."}
];
const categories = ["All","Home","Tech","Accessories","Stationery"];
const app = document.querySelector("#app");
const search = document.querySelector("#search");
const cartDialog = document.querySelector("#cart-dialog");
const cartCount = document.querySelector("#cart-count");
const cartItems = document.querySelector("#cart-items");
const cartTotal = document.querySelector("#cart-total");
const toast = document.querySelector("#toast");
let activeCategory = "All";
let cart = {};
let toastTimer;
const money = n => new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(n);
const escapeHTML = value => String(value).replace(/[&<>"']/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function productArt(p, extraClass="") {
 const art = {
 mug:`<path d="M75 70h90v95a28 28 0 0 1-28 28h-34a28 28 0 0 1-28-28z" fill="#f7f3e8" stroke="#9da991" stroke-width="3"/><path d="M165 88h18a20 20 0 0 1 0 40h-18" fill="none" stroke="#9da991" stroke-width="10"/><path d="M91 91h58" stroke="#d1d6c4" stroke-width="4" stroke-linecap="round"/>`,
 headphones:`<path d="M53 123v-22a67 67 0 0 1 134 0v22" fill="none" stroke="#333b52" stroke-width="17" stroke-linecap="round"/><rect x="43" y="112" width="34" height="65" rx="14" fill="#4b526b"/><rect x="163" y="112" width="34" height="65" rx="14" fill="#4b526b"/><rect x="52" y="121" width="16" height="44" rx="8" fill="#aeb4ca"/><rect x="172" y="121" width="16" height="44" rx="8" fill="#aeb4ca"/>`,
 tote:`<path d="M60 91h120l-9 103H69z" fill="#c6a17d" stroke="#9e7c5e" stroke-width="3"/><path d="M88 94V71a32 32 0 0 1 64 0v23" fill="none" stroke="#9e7c5e" stroke-width="10"/><path d="M88 125h64" stroke="#e3c7a7" stroke-width="4"/>`,
 lamp:`<path d="M117 88 74 146h86z" fill="#f4e6c8" stroke="#b6a47f" stroke-width="3"/><path d="M117 146v40m-28 0h56" stroke="#6d7762" stroke-width="8" stroke-linecap="round"/><circle cx="117" cy="143" r="5" fill="#6d7762"/>`,
 bottle:`<rect x="91" y="70" width="58" height="126" rx="18" fill="#f2f4ed" stroke="#89a9a2" stroke-width="3"/><rect x="103" y="51" width="34" height="24" rx="5" fill="#5f8b83"/><path d="M98 103h44" stroke="#c0d6d0" stroke-width="4"/><path d="M102 148h36" stroke="#c0d6d0" stroke-width="4"/>`,
 speaker:`<rect x="65" y="65" width="110" height="135" rx="28" fill="#666078" stroke="#514a66" stroke-width="3"/><circle cx="120" cy="125" r="31" fill="#a9a0bb"/><circle cx="120" cy="125" r="20" fill="#514a66"/><circle cx="120" cy="125" r="7" fill="#d9d3e5"/><circle cx="120" cy="177" r="4" fill="#d9d3e5"/>`,
 book:`<path d="M67 62h97a13 13 0 0 1 13 13v125H80a13 13 0 0 1-13-13z" fill="#b5a08d" stroke="#87715e" stroke-width="3"/><path d="M82 62v138" stroke="#e7d9c9" stroke-width="7"/><path d="M101 94h53m-53 15h43m-43 15h50" stroke="#e7d9c9" stroke-width="4" stroke-linecap="round"/>`,
 plant:`<path d="M80 130h80l-9 67H89z" fill="#d6d1bb" stroke="#a5a18e" stroke-width="3"/><path d="M120 131V72m0 33c-34 0-44-22-39-43 25 2 39 20 39 43m0 15c31 0 43-20 39-42-23 1-39 18-39 42" fill="#71966a" stroke="#4e754a" stroke-width="4" stroke-linecap="round"/>`
 }[p.symbol];
 return `<div class="product-image ${extraClass}" style="background:${p.color}" aria-hidden="true"><svg viewBox="0 0 240 240" role="presentation" focusable="false">${art}</svg>${p.badge?`<span class="badge">${escapeHTML(p.badge)}</span>`:""}</div>`;
}
function productCard(p) {
 return `<article class="product-card"><a href="#/product/${p.id}" aria-label="View ${escapeHTML(p.name)}">${productArt(p)}<div class="product-meta"><p class="product-category">${escapeHTML(p.category)}</p><div class="product-title-row"><h3 class="product-title">${escapeHTML(p.name)}</h3><span class="price">${money(p.price)}</span></div><div class="product-meta-bottom"><span class="rating" aria-label="${p.rating} out of 5 stars">★ ${p.rating} <span class="muted">(${p.reviews})</span></span><span class="text-link">View item ↗</span></div></div></a><button class="add-button" type="button" data-add="${p.id}" aria-label="Add ${escapeHTML(p.name)} to cart">+ Add to cart</button></article>`;
}
function renderHome() {
 const term = search.value.trim().toLowerCase();
 const visible = products.filter(p=>(activeCategory==="All"||p.category===activeCategory)&&(!term||(p.name+" "+p.category+" "+p.description).toLowerCase().includes(term)));
 app.innerHTML = `<div class="container"><section class="hero" aria-labelledby="hero-title"><div><p class="eyebrow">THE EVERYDAY EDIT · VOL. 01</p><h1 id="hero-title">Good things.<br><span>Better living.</span></h1><p class="hero-copy">A considered collection of useful, beautiful things for your everyday rituals. Thoughtfully picked, made to be lived with.</p><div class="button-row"><a class="button button-primary" href="#shop">Explore the collection <span aria-hidden="true">↘</span></a><a class="button button-secondary" href="#/about">Our point of view</a></div></div><div class="hero-art" role="img" aria-label="Abstract sculptural ceramic object in a soft sage-green setting"><div class="hero-orbit"></div><span class="art-label">Less, but considered.</span></div></section><section class="section" id="shop" aria-labelledby="collection-title"><div class="section-head"><div><p class="eyebrow">THE COLLECTION</p><h2 id="collection-title">Find your everyday favourite.</h2><p>Useful objects, uncomplicated design.</p></div><span class="muted small">${visible.length} products</span></div><div class="filters" aria-label="Filter products by category">${categories.map(c=>`<button type="button" class="filter-button" data-category="${c}" aria-pressed="${activeCategory===c}">${c}</button>`).join("")}</div><div class="product-grid">${visible.length?visible.map(productCard).join(""):`<div class="empty-state"><h2>No matches just yet</h2><p>Try a different search or category.</p><button class="button button-secondary" type="button" data-clear>Clear filters</button></div>`}</div></section><section class="promo" aria-labelledby="promo-title"><div><p class="eyebrow">A LITTLE LESS NOISE</p><h2 id="promo-title">Make room for what matters.</h2><p>We believe good design should make everyday life feel a little more considered. Start with one useful thing.</p><a class="button button-primary" href="#/about">Get to know us <span aria-hidden="true">→</span></a></div><div class="promo-art" aria-hidden="true"><div class="promo-shape">✳</div></div></section></div>`;
}
function renderAbout() {
 app.innerHTML = `<div class="container page-shell"><p class="eyebrow">OUR POINT OF VIEW</p><h1 class="page-title">Thoughtful things.<br>Everyday usefulness.</h1><p class="page-lede">Northstar Market is a fictional storefront capstone built to demonstrate a modular frontend, client-side routing, product filtering, and a working demo cart. The idea is simple: useful products, clear information, and a calm shopping experience.</p><div class="story-grid"><article class="story-card"><p class="eyebrow">01 / CURATION</p><h2>Fewer, better choices.</h2><p>Products are grouped by category, searchable by name and description, and presented with price, ratings, and product details to make browsing straightforward.</p></article><article class="story-card"><p class="eyebrow">02 / EXPERIENCE</p><h2>Easy to move around.</h2><p>Hash-based client-side routing means the home, story, and product-detail views navigate without a full page reload. The cart is stored in this browser session.</p></article><article class="story-card"><p class="eyebrow">03 / HONESTY</p><h2>A demo, not a live shop.</h2><p>This capstone uses sample product data and does not process payments, manage inventory, or submit orders. Those features would require a secure backend and payment provider.</p></article><article class="story-card"><p class="eyebrow">04 / NEXT STEP</p><h2>Ready to extend.</h2><p>The product catalogue and UI logic are separated into small functions, making it easier to connect a real API, add authentication, or introduce a checkout service later.</p><a class="text-link" href="#/">Browse the collection →</a></article></div></div>`;
}
function renderDetail(id) {
 const p=products.find(x=>x.id===id);
 if(!p){app.innerHTML=`<div class="container page-shell empty-state"><h1>Product not found</h1><p>This item may have moved.</p><a class="button button-primary" href="#/">Back to shop</a></div>`;return;}
 app.innerHTML=`<div class="container page-shell"><p class="eyebrow"><a href="#/">Shop</a> / ${escapeHTML(p.category)}</p><div class="detail-layout"><div class="detail-art">${productArt(p)}</div><section class="detail-info" aria-labelledby="detail-title"><p class="eyebrow">${escapeHTML(p.category)} · NORTHSTAR PICK</p><h1 id="detail-title">${escapeHTML(p.name)}</h1><p class="rating" aria-label="${p.rating} out of 5 stars">★ ${p.rating} <span class="muted">(${p.reviews} reviews)</span></p><p class="detail-price">${money(p.price)} ${p.oldPrice?`<del class="muted small">${money(p.oldPrice)}</del>`:""}</p><p class="detail-description">${escapeHTML(p.description)}</p><p class="small muted">Sample product listing · prices in USD</p><div class="detail-actions"><div class="quantity" aria-label="Quantity"><button type="button" data-qty="-1" aria-label="Decrease quantity">−</button><output id="detail-qty" aria-live="polite">1</output><button type="button" data-qty="1" aria-label="Increase quantity">+</button></div><button class="button button-primary" type="button" data-add="${p.id}" data-detail-add>Add to cart · ${money(p.price)}</button></div><p class="small muted">Demo only. No payment or order is processed.</p></section></div></div>`;
}
function renderRoute() {
 const route=location.hash.slice(1)||"/";
 document.querySelectorAll("[data-nav]").forEach(a=>a.removeAttribute("aria-current"));
 if(route==="/"||route.startsWith("/product/")) document.querySelector('[data-nav="home"]').setAttribute("aria-current","page");
 if(route==="/about") document.querySelector('[data-nav="about"]').setAttribute("aria-current","page");
 if(route==="/about") renderAbout();
 else if(route.startsWith("/product/")) renderDetail(route.split("/")[2]);
 else renderHome();
 app.setAttribute("aria-busy","false");
}
function showToast(message) {
 toast.textContent=message;toast.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove("show"),2300);
}
function addToCart(id,qty=1) {
 const p=products.find(x=>x.id===id);if(!p)return;
 cart[id]=(cart[id]||0)+qty;updateCart();showToast(`${p.name} added to cart`);
}
function updateCart() {
 const entries=Object.entries(cart).filter(([,qty])=>qty>0);
 const count=entries.reduce((n,[,qty])=>n+qty,0);
 cartCount.textContent=count;
 cartCount.setAttribute("aria-label",`${count} items in cart`);
 cartItems.innerHTML=entries.length?entries.map(([id,qty])=>{const p=products.find(x=>x.id===id);return `<div class="cart-line"><div class="cart-thumb" style="background:${p.color}" aria-hidden="true">${({mug:"☕",headphones:"🎧",tote:"▱",lamp:"◉",bottle:"♢",speaker:"◖",book:"▤",plant:"♧"})[p.symbol]}</div><div><h3>${escapeHTML(p.name)}</h3><p>${qty} × ${money(p.price)}</p><button class="remove-item" type="button" data-remove="${id}">Remove</button></div><strong>${money(p.price*qty)}</strong></div>`}).join(""):`<div class="empty-state"><h2>Your cart is empty</h2><p>Find something useful for your everyday.</p><button class="button button-primary" id="cart-shop" type="button">Browse products</button></div>`;
 cartTotal.textContent=money(entries.reduce((n,[id,qty])=>n+products.find(p=>p.id===id).price*qty,0));
}
document.addEventListener("click",e=>{
 const category=e.target.closest("[data-category]");
 if(category){activeCategory=category.dataset.category;renderHome();return;}
 const add=e.target.closest("[data-add]");
 if(add){const qty=add.hasAttribute("data-detail-add")?Number(document.querySelector("#detail-qty")?.textContent||1):1;addToCart(add.dataset.add,qty);return;}
 const remove=e.target.closest("[data-remove]");
 if(remove){delete cart[remove.dataset.remove];updateCart();return;}
 const qty=e.target.closest("[data-qty]");
 if(qty){const output=document.querySelector("#detail-qty");output.textContent=Math.max(1,Math.min(99,Number(output.textContent)+Number(qty.dataset.qty)));const p=products.find(x=>location.hash.endsWith(x.id));if(p)document.querySelector("[data-detail-add]").textContent=`Add to cart · ${money(p.price*Number(output.textContent))}`;return;}
 if(e.target.closest("#cart-open")){cartDialog.showModal();return;}
 if(e.target.closest("#cart-close")){cartDialog.close();return;}
 if(e.target.closest("#cart-shop")){cartDialog.close();location.hash="#/";return;}
 if(e.target.closest("#checkout")){showToast("Demo checkout only — no order was placed.");return;}
 if(e.target===cartDialog)cartDialog.close();
 if(e.target.closest("[data-clear]")){activeCategory="All";search.value="";renderHome();}
});
search.addEventListener("input",()=>{if((location.hash.slice(1)||"/")==="/")renderHome();else{location.hash="#/";renderHome();}});
window.addEventListener("hashchange",renderRoute);
document.querySelector("#year").textContent=new Date().getFullYear();
renderRoute();updateCart();
