
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Get cart data from sessionStorage
let cart = JSON.parse(window.sessionStorage.getItem("cart")) || [];

// Display all products
function renderProducts() {
  productList.innerHTML = "";

  products.forEach((product) => {
    const li = document.createElement("li");

    li.innerHTML = `${product.name} - $${product.price} 
      <button class="add-to-cart-btn" data-id="${product.id}">
        Add to Cart
      </button>`;

    productList.appendChild(li);
  });
}

// Display cart items
function renderCart() {
  cartList.innerHTML = "";

  cart.forEach((product) => {
    const li = document.createElement("li");

    li.innerHTML = `${product.name} - $${product.price}
      <button class="remove-from-cart-btn" data-id="${product.id}">
        Remove
      </button>`;

    cartList.appendChild(li);
  });
}

// Add a product to cart
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);

  if (product) {
    cart.push(product);
    window.sessionStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  }
}

// Remove a product from cart
function removeFromCart(productId) {
  const index = cart.findIndex((p) => p.id === productId);

  if (index !== -1) {
    cart.splice(index, 1);
    window.sessionStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  }
}

// Clear the entire cart
function clearCart() {
  cart = [];
  window.sessionStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// Handle Add to Cart and Remove clicks
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("add-to-cart-btn")) {
    const productId = Number(event.target.dataset.id);
    addToCart(productId);
  }

  if (event.target.classList.contains("remove-from-cart-btn")) {
    const productId = Number(event.target.dataset.id);
    removeFromCart(productId);
  }
});

// Clear cart button
clearCartBtn.addEventListener("click", clearCart);

// Initial display
renderProducts();
renderCart();
