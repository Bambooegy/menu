/* ================= MENU DATA ================= */
const menuData = {
  "Coffee Boba":[
    ["Iced Latte Boba",150,180,"iced-latte-boba.webp"],
    ["Dalgona Boba",170,195,"dalgona-boba.webp"],
    ["Spanish Latte Boba",155,185,"spanish-latte-boba.webp"]
  ],
  "Popping Boba":[
    ["Red Bull Popping Boba",150,180,"red-bull-popping-boba.webp"],
    ["Popping Boba Fruit Tea",130,160,"popping-boba-fruit-tea.webp"]
  ],
  "Milk Tea Boba":[
    ["Classic Boba",120,155,"classic-boba.webp"],
    ["Brown Sugar Milk Boba",135,165,"brown-sugar-boba.webp"]
  ],
  "Taro Boba":[
    ["Classic Taro",150,180,"classic-taro.webp"],
    ["Brown Sugar Taro Boba",160,185,"brown-sugar-milk-boba.webp"]
  ],
  "Matcha Boba":[
    ["Matcha Boba",155,185,"matcha-boba.webp"],
    ["Brown Sugar Matcha",165,185,"brown-sugar-matcha.webp"],
    ["Strawberry Matcha Latte Boba",175,190,"strawberry-matcha-latte-boba.webp"]
  ],
  "Milk Boba":[
    ["Oreo Milk Boba",160,195,"oreo-milk-boba.webp"],
    ["Lotus Milk Boba",160,195,"lotus-milk-boba.webp"],
    ["Chocolate Milk Boba",155,190,"chocolate-milk-boba.webp"],
    ["Caramel Milk Boba",155,190,"caramel-milk-boba.webp"],
    ["Red Velvet Milk Boba",160,195,"red-velvet-milk-boba.webp"],
    ["Mango Milk Boba",150,180,"mango-milk-boba.webp"],
    ["Blueberry Milk Boba",150,180,"blueberry-milk-boba.webp"],
    ["Strawberry Milk Boba",150,180,"strawberry-milk-boba.webp"],
    ["Watermelon Milk Boba",150,180,"watermelon-milk-boba.webp"]
  ],
  "Ice Cream":[
    ["Mix Flavor Ice Cream",[
      {label:"1 Scoop",price:55},
      {label:"2 Scoops",price:85},
      {label:"3 Scoops",price:115}
    ],"mix-flavor-one-ball.webp"]
  ],
  "Milkshake":[
    ["Strawberry Milkshake",140,165,"strawberry-milkshake.webp"],
    ["Chocolate Milkshake",140,165,"chocolate-milkshake.webp"],
    ["Vanilla Milkshake",140,165,"vanilla-milkshake.webp"],
    ["Oreo Milkshake",140,165,"oreo-milkshake.webp"],
    ["Raspberry Milkshake",140,165,"raspberry-milkshake.webp"],
    ["Yogurt Berry Milkshake",140,165,"yogurt-berry-milkshake.webp"],
    ["Mango Milkshake",140,165,"mango-milkshake.webp"]
  ],
  "Iced Coffee":[
    ["Iced Latte",125,null,"iced-latte.webp"],
    ["Iced Spanish Latte",135,null,"iced-spanish-latte.webp"],
    ["Iced Americano",90,null,"iced-americano.webp"]
  ],
  "Hot Drinks":[
    ["Espresso",65,null,"espresso.webp"],
    ["Double Espresso",85,null,"double-espresso.webp"],
    ["Americano",80,null,"americano.webp"],
    ["Cappuccino",95,null,"cappuccino.webp"],
    ["Caffè Latte",95,null,"latte.webp"],
    ["Spanish Latte",110,null,"spanish-latte.webp"],
    ["Macchiato",95,null,"macchiato.webp"],
    ["Cortado",95,null,"cortado.webp"],
    ["French Coffee",85,null,"french-coffee.webp"],
    ["Hazelnut Coffee",95,null,"hazelnut-coffee.webp"],
    ["Flat White",85,null,"flat-white.webp"],
    ["Mocha",95,null,"mocha.webp"],
    ["Turkish Coffee",70,null,"turkish-coffee.webp"],
    ["Black Tea",55,null,"black-tea.webp"],
    ["Milk Tea",75,null,"Milk-Tea.webp"],
    ["Karak Tea",85,null,"karak-tea.webp"],
    ["Sahlab",85,null,"sahlab.webp"],
    ["Green Tea",55,null,"green-tea.webp"],
    ["Hot Chocolate",120,160,"hot-chocolate.webp"]
  ],
  "Fresh Juices":[
    ["Fresh Mango",85,null,"fresh-mango.webp"],
    ["Fresh Strawberry",85,null,"fresh-strawberry.webp"],
    ["Orange Juice",85,null,"orange-juice.webp"],
    ["Lemon Mint",85,null,"lemon-mint.webp"],
    ["Banana With Milk",85,null,"banana-milkshake.webp"]
  ]
};

/* ================= BADGES ================= */
const bestSellers = new Set([
  "Iced Latte Boba",
  "Red Bull Popping Boba",
  "Strawberry Milkshake"
]);

const newItems = new Set([
  "Strawberry Matcha Latte Boba",
  "Red Velvet Milk Boba"
]);

/* ================= ELEMENTS ================= */
const menu = document.getElementById("menu");
const tabsContainer = document.getElementById("tabs");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

let cart = JSON.parse(localStorage.getItem("bambooCart")) || [];

/* ================= HELPERS ================= */
const el = (t,c)=>{const e=document.createElement(t);if(c)e.className=c;return e;};

/* ================= RENDER MENU ================= */
function renderMenu(){
  const frag=document.createDocumentFragment();

  Object.entries(menuData).forEach(([cat,items])=>{
    const sec=el("section");
    const h2=el("h2"); h2.textContent=cat;
    sec.appendChild(h2);

    items.forEach(it=>{
      const card=el("div","item");

      const img=el("img");
      img.src=`images/${it.at(-1)}`;
      img.loading="lazy";
      img.onerror=()=>img.src="images/default.webp";

      const title=el("strong");
      title.textContent=it[0];

      if(bestSellers.has(it[0]))
        title.insertAdjacentHTML("beforeend"," <span class='best-seller'>⭐</span>");
      if(newItems.has(it[0]))
        card.insertAdjacentHTML("beforeend","<span class='new-badge'>NEW</span>");

      const prices=el("div","prices");

      if(Array.isArray(it[1])){
        it[1].forEach(o=>{
          const b=el("button");
          b.textContent=`${o.label} – ${o.price} EGP`;
          b.onclick=()=>addToCart(it[0],o.price,o.label);
          prices.appendChild(b);
        });
      }else{
        const [,p1,p2]=it;
        const b1=el("button");
        b1.textContent=`${p1} EGP`;
        b1.onclick=()=>addToCart(it[0],p1,"");
        prices.appendChild(b1);

        if(p2){
          const b2=el("button");
          b2.textContent=`Large – ${p2}`;
          b2.onclick=()=>addToCart(it[0],p2,"Large");
          prices.appendChild(b2);
        }
      }

      card.append(img,title,prices);
      sec.appendChild(card);
    });

    frag.appendChild(sec);
  });

  menu.appendChild(frag);
}

/* ================= TABS ================= */
function renderTabs(){
  ["All",...Object.keys(menuData)].forEach((c,i)=>{
    const t=el("div","tab");
    t.textContent=c;
    if(i===0)t.classList.add("active");

    t.onclick=()=>{
      document.querySelectorAll(".tab").forEach(x=>x.classList.remove("active"));
      t.classList.add("active");
      document.querySelectorAll("section").forEach(s=>{
        s.style.display=(c==="All"||s.querySelector("h2").textContent===c)?"grid":"none";
      });
    };
    tabsContainer.appendChild(t);
  });
}

/* ================= CART ================= */
function addToCart(name,price,size){
  const i=cart.find(x=>x.name===name&&x.size===size);
  i?i.qty++:cart.push({name,price,size,qty:1});
  renderCart(); showToast("Added 🧋");
}

function renderCart(){
  cartItems.textContent=""; let total=0;
  cart.forEach((i,idx)=>{
    total+=i.price*i.qty;
    const li=el("li");
    li.innerHTML=`${i.name} ${i.size||""} x${i.qty} <span>✕</span>`;
    li.querySelector("span").onclick=()=>{cart.splice(idx,1);renderCart();};
    cartItems.appendChild(li);
  });
  cartTotal.textContent=`Total: ${total} EGP`;
  localStorage.setItem("bambooCart",JSON.stringify(cart));
}

/* ================= TOAST ================= */
function showToast(m){
  const t=document.getElementById("toast");
  t.textContent=m;
  t.classList.add("show");
  setTimeout(()=>t.classList.remove("show"),1500);
}

/* ================= WHATSAPP ================= */
function sendWhatsApp(){
  if(!cart.length) return showToast("Your cart is empty");
  let msg="Hello Bamboo Team 👋\nI would like to order:\n\n";
  cart.forEach(i=>{
    msg+=`• ${i.name} ${i.size?`(${i.size})`:""} x${i.qty}\n`;
  });
  window.open(`https://wa.me/201019634984?text=${encodeURIComponent(msg)}`,"_blank");
}

/* ================= INIT ================= */
renderTabs();
renderMenu();
renderCart();




