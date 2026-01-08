/* ================= MENU DATA ================= */

const menuData = {
  "Coffee Boba":[
    ["Iced Latte Boba",150,180,"iced-latte-boba.jpg"],
    ["Dalgona Boba",170,195,"dalgona-boba.jpg"],
    ["Spanish Latte Boba",155,185,"spanish-latte-boba.jpg"]
  ],
  "Popping Boba":[
    ["Red Bull Popping Boba",150,175,"red-bull-popping-boba.jpg"],
    ["Popping Boba Fruit Tea",130,160,"popping-boba-fruit-tea.jpg"]
  ],
  "Milkshake":[
    ["Strawberry Milkshake",140,165,"strawberry-milkshake.jpg"]
  ],
  "Hot Drinks":[
    ["Espresso",60,null,"espresso.jpg"],
    ["Cappuccino",95,null,"cappuccino.jpg"],
    ["Hot Chocolate",110,null,"hot-chocolate.jpg"]
  ]
};

/* ================= ELEMENTS ================= */

const menu = document.getElementById("menu");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const tabsContainer = document.getElementById("tabs");
let cart = [];
let images = [];
let current = 0;

/* ================= IMAGE MODAL ================= */

const modal = document.createElement("div");
modal.style.cssText = `
  position:fixed; inset:0;
  background:rgba(0,0,0,.9);
  display:none;
  align-items:center;
  justify-content:center;
  z-index:9999;
`;
modal.innerHTML = `<img id="modalImg" style="max-width:90%;max-height:90%;border-radius:12px">`;
document.body.appendChild(modal);

const modalImg = modal.querySelector("img");

modal.onclick = () => modal.style.display = "none";

let startX = 0;
modalImg.addEventListener("touchstart", e => startX = e.touches[0].clientX);
modalImg.addEventListener("touchend", e => {
  const diff = startX - e.changedTouches[0].clientX;
  if(diff > 50) nextImg();
  if(diff < -50) prevImg();
});

function showImg(i){
  current = i;
  modalImg.src = images[i];
  modal.style.display = "flex";
}
function nextImg(){ showImg((current+1)%images.length); }
function prevImg(){ showImg((current-1+images.length)%images.length); }

/* ================= RENDER MENU ================= */

function renderMenu(){
  menu.innerHTML="";
  images=[];

  for(const cat in menuData){
    const section=document.createElement("section");
    section.innerHTML=`<h2>${cat}</h2>`;

    menuData[cat].forEach(item=>{
      const [name,p1,p2,img]=item;
      const path=`images/${img}`;
      images.push(path);
      const idx=images.length-1;

      const div=document.createElement("div");
      div.className="item";
      div.innerHTML=`
        <img src="${path}">
        <strong>${name}</strong>
        ${p2?
          `<div class="prices">
            <button onclick="addToCart('${name}',${p1},'Medium')">Medium ${p1}</button>
            <button onclick="addToCart('${name}',${p2},'Large')">Large ${p2}</button>
          </div>`
          :
          `<button onclick="addToCart('${name}',${p1},'')">${p1} EGP</button>`
        }
      `;
      div.querySelector("img").onclick=()=>showImg(idx);
      section.appendChild(div);
    });
    menu.appendChild(section);
  }
}

/* ================= TABS ================= */

for(const cat in menuData){
  const t=document.createElement("div");
  t.className="tab";
  t.textContent=cat;
  t.onclick=()=>{
    document.querySelectorAll(".tab").forEach(x=>x.classList.remove("active"));
    t.classList.add("active");
    document.querySelectorAll("section").forEach(s=>{
      s.style.display=s.querySelector("h2").textContent===cat?"grid":"none";
    });
  };
  tabsContainer.appendChild(t);
}
setTimeout(()=>document.querySelector(".tab").click(),50);

/* ================= CART ================= */

function addToCart(name,price,size){
  const i=cart.find(x=>x.name===name&&x.size===size);
  i?i.q++:cart.push({name,price,size,q:1});
  renderCart();
}
function renderCart(){
  cartItems.innerHTML="";
  let total=0;
  cart.forEach((i,idx)=>{
    total+=i.price*i.q;
    const li=document.createElement("li");
    li.innerHTML=`${i.name} ${i.size} x${i.q}
      <span onclick="cart.splice(${idx},1);renderCart()">✕</span>`;
    cartItems.appendChild(li);
  });
  cartTotal.textContent=`Total: ${total} EGP`;
}

function sendWhatsApp(){
  if(!cart.length) return alert("Cart empty");
  let msg="Order:\n";
  let total=0;
  cart.forEach(i=>{
    msg+=`${i.name} ${i.size} x${i.q}\n`;
    total+=i.price*i.q;
  });
  msg+=`Total: ${total} EGP`;
  window.open(`https://wa.me/201019634984?text=${encodeURIComponent(msg)}`);
}

/* ================= INIT ================= */

renderMenu();
