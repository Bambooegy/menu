const menu = document.getElementById("menu");
const cartItems = document.getElementById("cartItems");
let cart = [];

/* ==== Render Menu With Images ==== */
for (const category in menuData) {
  const section = document.createElement("section");
  section.innerHTML = `<h2>${category}</h2>`;

  menuData[category].forEach(item => {
    const [name, price1, price2] = item;
    const div = document.createElement("div");
    div.className = "item";

    // Generate image name automatically
    const imageName = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/-$/, "");

    const imagePath = `images/${imageName}.jpg`;

    if (price2) {
      div.innerHTML = `
        <img 
          src="${imagePath}" 
          alt="${name}" 
          loading="lazy"
          onerror="this.src='images/default.jpg'"
        >
        <strong>${name}</strong>
        <div class="prices">
          <button onclick="addToCart('${name}', ${price1}, 'Small')">
            Small – ${price1} EGP
          </button>
          <button onclick="addToCart('${name}', ${price2}, 'Large')">
            Large – ${price2} EGP
          </button>
        </div>
      `;
    } else {
      div.innerHTML = `
        <img 
          src="${imagePath}" 
          alt="${name}" 
          loading="lazy"
          onerror="this.src='images/default.jpg'"
        >
        <strong>${name}</strong>
        <button onclick="addToCart('${name}', ${price1}, '')">
          ${price1} EGP
        </button>
      `;
    }

    section.appendChild(div);
  });

  menu.appendChild(section);
}

/* ===== Cart ===== */
function addToCart(name, price, size) {
  cart.push({ name, price, size });
  renderCart();
}

function renderCart() {
  cartItems.innerHTML = "";
  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} ${item.size ? "(" + item.size + ")" : ""} – ${item.price} EGP
      <span onclick="removeItem(${index})">✕</span>
    `;
    cartItems.appendChild(li);
  });
}

function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
}

/* ===== WhatsApp ===== */
function sendWhatsApp() {
  if (cart.length === 0) {
    alert("Your cart is empty");
    return;
  }

  let message = `Hello Bamboo Team 👋

I would like to place the following order:

`;
  let total = 0;

  cart.forEach(item => {
    message += `• ${item.name} ${item.size ? "(" + item.size + ")" : ""} – ${item.price} EGP\n`;
    total += item.price;
  });

  message += `\nTotal: ${total} EGP`;

  const phone = "201019634984";
  const encodedMessage = encodeURIComponent(message);

  window.open(`https://wa.me/${phone}?text=${encodedMessage}`, "_blank");
}

