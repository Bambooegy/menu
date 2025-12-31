/* ================= MENU DATA ================= */

const menuData = {
  "Coffee Boba": [
    ["Iced Latte Boba",150,180],
    ["Dalgona Boba",170,195],
    ["Spanish Latte Boba",155,185]
  ],
  "Popping Boba": [
    ["Red Bull Popping Boba",150,175],
    ["Popping Boba Fruit Tea",130,160]
  ],
  "Milk Tea Boba": [
    ["Classic Boba",120,155],
    ["Brown Sugar Milk Boba",135,165]
  ],
  "Taro Boba": [
    ["Classic Taro",150,180],
    ["Brown Sugar Taro Boba",160,185]
  ],
  "Matcha Boba": [
    ["Matcha Boba",155,185],
    ["Brown Sugar Matcha",165,185],
    ["Strawberry Matcha Latte Boba",175,190]
  ],
  "Milk Boba": [
    ["Oreo Milk Boba",160,195],
    ["Lotus Milk Boba",160,195],
    ["Chocolate Milk Boba",155,190],
    ["Caramel Milk Boba",155,190],
    ["Red Velvet Milk Boba",160,195],
    ["Mango Milk Boba",150,180],
    ["Blueberry Milk Boba",150,180],
    ["Strawberry Milk Boba",150,180],
    ["Watermelon Milk Boba",150,180]
  ],
  "Ice Cream":[["Mix Flavor",55,115]],
  "Milkshake":[["Strawberry Milkshake",140,165]],
  "Iced Coffee":[["Iced Latte",125],["Iced Spanish Latte",135],["Iced Americano",90]],
  "Desserts":[["Lotus Cheesecake",120],["Blueberry Cheesecake",120]],
  "Hot Drinks":[["Espresso",60],["Americano",75],["Cappuccino",95],["Spanish Latte",110],["Hot Chocolate",110]],
  "Fresh Juices":[["Fresh Mango",85],["Fresh Strawberry",85],["Orange Juice",85],["Lemon Mint",85]]
};

/* ================= ELEMENTS ================= */

const menu = document.getElementById("menu");
const tabs = document.getElementById("tabs");
const search = document.getElementById("search");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
let cart = [];

/* ================= BEST SELLERS ================= */

const bestSellers = [
  "Iced Latte Boba",
  "Red Bull Popping Boba",
  "Strawberry Milkshake"
];

/* ================= RENDER MENU ================= */

function renderMenu() {
  menu.innerHTML = "";

  for (const category in menuData) {
    const section = document.createElement("section");
    section.dataset.category = category;

    menuData[category].forEach(item => {
      const [name, price1, price2] = item;

      const div = document.createElement("div");
      div.className = "item";

      div.innerHTML = `
        <img src="images/${name.toLowerCase().replace(/[^a-z0-9]/g,"-")}.jpg"
             onerror="this.src='images/default.jpg'">
        <strong>${name}
          ${bestSellers.includes(name) ? '<span class="best">⭐ Best</span>' : ''}
        </strong>

        ${price2 ? `
          <div class="prices">
            <button onclick="addToCart('${name}',${price1},'Small')">Small ${price1}</button>
            <button onclick="addToCart('${name}',${price2},'Large')">Large ${price2}</button>
          </div>
        ` : `
          <button onclick="addToCart('${name}',${price1},'')">${price1} EGP</button>
        `}
      `;

      section.appendChild(div);
    });

    menu.appendChild(section);
  }
}

/* ================= TABS ================= */

function renderTabs() {
  for (const category in menuData) {
    const tab = document.createElement("div");
    tab.className = "tab";
    tab.textContent = category;

    tab.onclick = () => {
      document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      document.querySelectorAll("section").forEach(sec => {
        sec.style.display = sec.dataset.category === category ? "grid" : "none";
      });
    };

    tabs.appendChild(tab);
  }

  document.querySelector(".tab")?.click();
}

/* ================= SEARCH ================= */

search.addEventListener("input", e => {
  const value = e.target.value.toLowerCase();
  document.querySelectorAll(".item").forEach(item => {
    item.style.display = item.textContent.toLowerCase().includes(value)
      ? "flex"
      : "none";
  });
});

/* ================= CART ================= */

function addToCart(name, price, size) {
  const found = cart.find(i => i.name === name && i.size === size);
  found ? found.qty++ : cart.push({ name, price, size, qty: 1 });
  renderCart();
}

function renderCart() {
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, i) => {
    total += item.price * item.qty;
    cartItems.innerHTML += `
      <li>
        ${item.name} ${item.size} x${item.qty}
        <span onclick="removeItem(${i})">✕</span>
      </li>`;
  });

  cartTotal.textContent = `Total: ${total} EGP`;
}

function removeItem(i) {
  cart.splice(i, 1);
  renderCart();
}

/* ================= WHATSAPP ================= */

function sendWhatsApp() {
  if (!cart.length) return alert("Cart is empty");

  let msg = "Hello Bamboo 👋\nMy order:\n\n";
  let total = 0;

  cart.forEach(i => {
    msg += `• ${i.name} ${i.size} x${i.qty}\n`;
    total += i.price * i.qty;
  });

  msg += `\nTotal: ${total} EGP`;
  window.open(`https://wa.me/201019634984?text=${encodeURIComponent(msg)}`);
}

/* ================= INIT ================= */

renderMenu();
renderTabs();
