const menuItems = [
  { name: "Iced Latte Boba", price: 150, img: "images/iced-latte.jpg" },
  { name: "Dalgona Boba", price: 170, img: "images/dalgona.jpg" },
  { name: "Spanish Latte Boba", price: 155, img: "images/spanish-latte.jpg" },
  { name: "Red Bull Popping Boba", price: 180, img: "images/redbull-boba.jpg" },
  { name: "Popping Boba Fruit Tea", price: 160, img: "images/popping-fruit-tea.jpg" }
];

const menu = document.getElementById('menu');
const cartItemsList = document.getElementById('cartItems');
let cart = [];

// إنشاء العناصر في الصفحة
menuItems.forEach(item => {
  const div = document.createElement('div');
  div.className = 'item';
  div.innerHTML = `
    <img src="${item.img}" alt="${item.name}">
    <h2>${item.name}</h2>
    <p>Price: ${item.price} EGP</p>
    <button onclick="addToCart('${item.name}', ${item.price})">Add to Cart</button>
  `;
  menu.appendChild(div);
});

// إضافة للسلة
function addToCart(name, price) {
  cart.push({ name, price });
  renderCart();
}

// عرض محتوى السلة
function renderCart() {
  cartItemsList.innerHTML = '';
  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `${item.name} - ${item.price} EGP <span onclick="removeItem(${index})">&times;</span>`;
    cartItemsList.appendChild(li);
  });
}

// إزالة عنصر
function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
}

// إرسال الطلب عبر WhatsApp
function sendWhatsApp() {
  if(cart.length === 0) return alert("Cart is empty!");
  let text = "Hello, I want to order:\n";
  cart.forEach(item => {
    text += `- ${item.name} : ${item.price} EGP\n`;
  });
  const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank");
}
