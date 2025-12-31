/* ================= MENU DATA ================= */

const menuData = {
  "Coffee Boba":[["Iced Latte Boba",150,180,"iced-latte-boba.jpg"],["Dalgona Boba",170,195,"dalgona-boba.jpg"],["Spanish Latte Boba",155,185,"spanish-latte-boba.jpg"]],
  "Popping Boba":[["Red Bull Popping Boba",150,175,"red-bull-popping-boba.jpg"],["Popping Boba Fruit Tea",130,160,"popping-boba-fruit-tea.jpg"]],
  "Milk Tea Boba":[["Classic Boba",120,155,"classic-milk-tea-boba.jpg"],["Brown Sugar Milk Boba",135,165,"brown-sugar-boba.jpg"]],
  "Taro Boba":[["Classic Taro",150,180,"taro-boba.jpg"],["Brown Sugar Taro Boba",160,185,"brown-sugar-taro-boba.jpg"]],
  "Matcha Boba":[["Matcha Boba",155,185,"matcha-boba.jpg"],["Brown Sugar Matcha",165,185,"brown-sugar-matcha.jpg"],["Strawberry Matcha Latte Boba",175,190,"strawberry-matcha-boba.jpg"]],
  "Milk Boba":[["Oreo Milk Boba",160,195,"oreo-milk-boba.jpg"],["Lotus Milk Boba",160,195,"lotus-milk-boba.jpg"],["Chocolate Milk Boba",155,190,"chocolate-milk-boba.jpg"],["Caramel Milk Boba",155,190,"caramel-milk-boba.jpg"],["Red Velvet Milk Boba",160,195,"red-velvet-milk-boba.jpg"],["Mango Milk Boba",150,180,"mango-milk-boba.jpg"],["Blueberry Milk Boba",150,180,"blueberry-milk-boba.jpg"],["Strawberry Milk Boba",150,180,"strawberry-milk-boba.jpg"],["Watermelon Milk Boba",150,180,"watermelon-milk-boba.jpg"]],
  "Ice Cream":[["Mix Flavor Ice Cream",55,115,"mix-ice-cream.jpg"]],
  "Milkshake":[["Strawberry Milkshake",140,165,"strawberry-milkshake.jpg"]],
  "Iced Coffee":[["Iced Latte",125,null,"iced-latte.jpg"],["Iced Spanish Latte",135,null,"iced-spanish-latte.jpg"],["Iced Americano",90,null,"iced-americano.jpg"]],
  "Desserts":[["Walnut & Caramel Cheesecake",120,null,"walnut-caramel-cheesecake.jpg"],["Lotus Cheesecake",120,null,"lotus-cheesecake.jpg"],["Blueberry Cheesecake",120,null,"blueberry-cheesecake.jpg"]],
  "Hot Drinks":[["Espresso",60,null,"espresso.jpg"],["Double Espresso",85,null,"double-espresso.jpg"],["Americano",75,null,"americano.jpg"],["Cappuccino",95,null,"cappuccino.jpg"],["Caffè Latte",95,null,"latte.jpg"],["Spanish Latte",110,null,"spanish-latte.jpg"],["Macchiato",95,null,"macchiato.jpg"],["Cortado",95,null,"cortado.jpg"],["French Coffee",85,null,"french-coffee.jpg"],["Flat White",95,null,"flat-white.jpg"],["Mocha",95,null,"mocha.jpg"],["Turkish Coffee",70,null,"turkish-coffee.jpg"],["Black Tea",45,null,"black-tea.jpg"],["Green Tea",55,null,"green-tea.jpg"],["Hot Chocolate",110,null,"hot-chocolate.jpg"]],
  "Fresh Juices":[["Fresh Mango",85,null,"fresh-mango.jpg"],["Fresh Strawberry",85,null,"fresh-strawberry.jpg"],["Orange Juice",85,null,"orange-juice.jpg"],["Lemon Mint",85,null,"lemon-mint.jpg"],["Banana Milkshake",85,null,"banana-milkshake.jpg"]]
};

/* ================= ELEMENTS ================= */
const menu = document.getElementById("menu");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const tabsContainer = document.getElementById("tabs");
let cart = [];

/* ================= RENDER MENU ================= */
function renderMenu() {
  for(const category in menuData){
    const section = document.createElement("section");
    section.innerHTML=`<h2>${category}</h2>`;
    menuData[category].forEach(item=>{
      const [name,price1,price2,image]=item;
      const div=document.createElement("div");
      div.className="item";
      const imagePath=`images/${image||"default.jpg"}`;
      div.innerHTML=`
        <img src="${imagePath}" alt="${name}" onerror="this.src='images/default.jpg'">
        <strong>${name}</strong>
        ${price2?`<div class="prices">
          <button onclick="addToCart('${name}',${price1},'Small')">Small – ${price1} EGP</button>
          <button onclick="addToCart('${name}',${price2},'Large')">Large – ${price2} EGP</button>
        </div>`:`<button onclick="addToCart('${name}',${price1},'')">${price1} EGP</button>`}
      `;
      section.appendChild(div);
    });
    menu.appendChild(section);
  }
}

/* ================= TABS ================= */
for(const category in menuData){
  const tab=document.createElement("div");
  tab.className="tab"; tab.textContent=category;
  tab.addEventListener("click",()=>{
    document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active"));
    tab.classList.add("active");
    document.querySelectorAll("section").forEach(sec=>{
      sec.style.display=sec.querySelector("h2").textContent===category?"grid":"none";
    });
  });
  tabsContainer.appendChild(tab);
}
document.querySelector(".tab")?.click();

/* ================= BEST SELLER ================= */
const bestSellers=["Iced Latte Boba","Red Bull Popping Boba","Strawberry Milkshake"];
document.querySelectorAll(".item").forEach(item=>{
  const name=item.querySelector("strong").textContent;
  if(bestSellers.includes(name)){
    const span=document.createElement("span");
    span.className="best-seller"; span.textContent="⭐ Best Seller";
    item.querySelector("strong").appendChild(span);
  }
});

/* ================= SEARCH ================= */
document.getElementById("search").addEventListener("input",e=>{
  const term=e.target.value.toLowerCase();
  document.querySelectorAll(".item").forEach(item=>{
    const name=item.querySelector("strong").textContent.toLowerCase();
    item.style.display=name.includes(term)?"flex":"none";
  });
});

/* ================= CART ================= */
function addToCart(name,price,size){
  const existing=cart.find(i=>i.name===name&&i.size===size);
  existing?existing.quantity++:cart.push({name,price,size,quantity:1});
  renderCart();
}
function renderCart(){
  cartItems.innerHTML="";
  let total=0;
  cart.forEach((item,index)=>{
    total+=item.price*item.quantity;
    const li=document.createElement("li");
    li.innerHTML=`${item.name} ${item.size?`(${item.size})`:``} x${item.quantity}
      <span onclick="removeItem(${index})">✕</span>`;
    cartItems.appendChild(li);
  });
  cartTotal.textContent=`Total: ${total} EGP`;
}
function removeItem(index){cart.splice(index,1);renderCart();}

/* ================= WHATSAPP ================= */
function sendWhatsApp(){
  if(cart.length===0){alert("Your cart is empty");return;}
  let message="Hello Bamboo Team 👋\nI would like to order:\n\n";
  let total=0;
  cart.forEach(item=>{
    message+=`• ${item.name} ${item.size?`(${item.size})`:``} x${item.quantity}\n`;
    total+=item.price*item.quantity;
  });
  message+=`\nTotal: ${total} EGP`;
  const phone="201019634984";
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`,"_blank");
}

/* ================= INIT ================= */
renderMenu();
