// Sample product data
const products = [
  {
    id: 1,
    name: "Elegant Vase",
    price: 29.99,
    image: "images/vase.jpg",
    description: "A beautifully crafted ceramic vase."
  },
  {
    id: 2,
    name: "Modern Lamp",
    price: 45.50,
    image: "images/lamp.jpg",
    description: "A sleek lamp for modern interiors."
  },
  {
    id: 3,
    name: "Wooden Chair",
    price: 85.00,
    image: "images/chair.jpg",
    description: "Comfortable wooden chair with cushion."
  },
  {
    id: 4,
    name: "Artistic Painting",
    price: 150.00,
    image: "images/painting.jpg",
    description: "Abstract art to elevate your space."
  }
];

// Initialize cart
let cart = [];

// Function to render products
function renderProducts(productList) {
  const productsContainer = document.querySelector('.products');
  productsContainer.innerHTML = '';

  productList.forEach(product => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}" style="width:100%; border-top-left-radius:10px; border-top-right-radius:10px;">
      <div class="card-content">
        <h3>${product.name}</h3>
        <p class="price">$${product.price.toFixed(2)}</p>
        <p>${product.description}</p>
        <div class="btn-group">
          <button onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
      </div>
    `;

    productsContainer.appendChild(productCard);
  });
}

// Function to add product to cart
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (product) {
    cart.push(product);
    updateCartCount();
    showNotification(`${product.name} added to cart!`);
  }
}

// Function to update cart count
function updateCartCount() {
  const cartCount = document.getElementById('cart-count');
  if (cartCount) {
    cartCount.textContent = cart.length;
  }
}

// Function to show notification
function showNotification(message) {
  const notification = document.getElementById('notification');
  if (notification) {
    notification.textContent = message;
    notification.classList.add('show');
    setTimeout(() => {
      notification.classList.remove('show');
    }, 3000);
  }
}

// Function to filter products based on search input
function filterProducts() {
  const searchInput = document.getElementById('product-filter').value.toLowerCase();
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchInput) ||
    product.description.toLowerCase().includes(searchInput)
  );
  renderProducts(filteredProducts);
}

// Scroll to top functionality
const scrollToTopBtn = document.getElementById('scrollToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollToTopBtn.style.display = 'block';
  } else {
    scrollToTopBtn.style.display = 'none';
  }
});

scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  renderProducts(products);

  // Attach event listener to search input
  const searchInput = document.getElementById('product-filter');
  if (searchInput) {
    searchInput.addEventListener('input', filterProducts);
  }

  // Initialize cart count
  updateCartCount();
});
