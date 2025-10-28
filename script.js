// Sample food data
 // Sample food data
const foodItems = [
  {
    id: 1,
    name: "Butter Noodles",
    category: "Noodles",
    price: 129,
    image: "butterNoodle.png",
    description: "Delicious butter noodles with fresh herbs and spices."
  },
  {
    id: 2,
    name: "Vegetable Noodles",
    category: "Noodles",
    price: 109,
    image: "vegetableNoodle.png",
    description: "Healthy vegetable noodles with assorted fresh veggies."
  },
  {
    id: 3,
    name: "Chicken Noodles",
    category: "Noodles",
    price: 139,
    image: "chickenNoodle.png",
    description: "Traditional chicken noodles with light broth."
  },
  {
    id: 4,
    name: "Spicy Noodles",
    category: "Noodles",
    price: 119,
    image: "spicyNoodle.png",
    description: "Perfectly cooked spicy noodles with your choice of sauce."
  },

  {
    id: 5,
    name: "Greek Salad",
    category: "Salad",
    price: 99,
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=80",
    description: "Fresh Greek salad with feta cheese and olives."
  },
  {
    id: 6,
    name: "Chicken Rolls",
    category: "Rolls",
    price: 89,
    image: "https://images.unsplash.com/photo-1481931098730-318b6f776db0?auto=format&fit=crop&w=400&q=80",
    description: "Tasty chicken rolls with special sauce."
  },
  {
    id: 7,
    name: "Chocolate Cake",
    category: "Desserts",
    price: 69,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80",
    description: "Rich chocolate cake with creamy frosting."
  },
  {
    id: 8,
    name: "Veggie Sandwich",
    category: "Sandwich",
    price: 79,
    image: "https://images.unsplash.com/photo-1551782450-17144efb9c50?auto=format&fit=crop&w=400&q=80",
    description: "Fresh vegetable sandwich with special sauce."
  },
  {
    id: 9,
    name: "Vegetable Pasta",
    category: "Pasta",
    price: 119,
    image: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?auto=format&fit=crop&w=400&q=80",
    description: "Pasta with fresh vegetables and herbs."
  },
  {
    id: 10,
    name: "Fruit Salad",
    category: "Salad",
    price: 89,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80",
    description: "Fresh fruit salad with honey dressing."
  },
  {
    id: 11,
    name: "Cheesecake",
    category: "Desserts",
    price: 79,
    image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=400&q=80",
    description: "Creamy cheesecake with berry topping."
  },
  {
    id: 12,
    name: "Vegetable Rolls",
    category: "Rolls",
    price: 75,
    image: "https://images.unsplash.com/photo-1481931098730-318b6f776db0?auto=format&fit=crop&w=400&q=80",
    description: "Fresh vegetable rolls with dipping sauce."
  }
];

// Special items data
const specialItems = [
  {
    id: "special-1",
    name: "Truffle Mushroom Pasta",
    price: 799,
    originalPrice: 999,
    image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=600&q=80",
    description: "Creamy pasta with wild mushrooms, black truffle, and parmesan cheese. A luxurious dish that will delight your senses."
  },
  {
    id: "special-2",
    name: "Grilled Salmon Steak",
    price: 899,
    originalPrice: 1199,
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80",
    description: "Fresh Atlantic salmon grilled to perfection with lemon butter sauce, served with roasted vegetables and herb rice."
  },
  {
    id: "special-3",
    name: "Gourmet Truffle Burger",
    price: 599,
    originalPrice: 749,
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=600&q=80",
    description: "Premium beef patty with truffle aioli, caramelized onions, Swiss cheese, and served with truffle fries."
  }
];


// Cart state - EMPTY INITIALLY
let cart = [];
let isAdminAuthenticated = false;
let currentCategory = 'all';

// DOM Elements
const foodGrid = document.getElementById('food-grid');
const cartDrawer = document.getElementById('cart-drawer');
const cartItems = document.getElementById('cart-items');
const cartBadge = document.querySelector('.cart-badge');
const cartSubtotal = document.getElementById('cart-subtotal');
const cartTotal = document.getElementById('cart-total');
const adminSection = document.getElementById('admin-section');
const adminLoginModal = document.getElementById('admin-login-modal');
const adminFoodsList = document.getElementById('admin-foods-list');
const addItemForm = document.getElementById('add-item-form');
const overlay = document.getElementById('overlay');
const specialSection = document.getElementById('special-section');
const viewSpecialBtn = document.getElementById('view-special-btn');
const categoryTitle = document.getElementById('category-title');
const contactSection = document.getElementById('contact-section');
const contactForm = document.getElementById('contact-form');

// Initialize the app
function init() {
  // FIRST - Clear any existing cart data completely
  clearCartData();
  
  renderFoodItems();
  setupEventListeners();
  updateCartUI();
}

// Render food items on the menu page
function renderFoodItems(filterCategory = 'all') {
  foodGrid.innerHTML = '';
  
  const filteredItems = filterCategory === 'all' 
    ? foodItems 
    : foodItems.filter(item => item.category === filterCategory);
  
  if (filteredItems.length === 0) {
    foodGrid.innerHTML = `
      <div class="empty-cart" style="grid-column: 1 / -1;">
        <h3>No items found in this category</h3>
        <p>Try selecting a different category or check back later for new additions!</p>
      </div>
    `;
    return;
  }
  
  filteredItems.forEach(item => {
    const foodCard = document.createElement('div');
    foodCard.className = 'food-card';
    foodCard.innerHTML = `
      <div class="food-img">
        <img src="${item.image}" alt="${item.name}">
      </div>
      <div class="food-info">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <div class="food-meta">
          <div class="food-price">₹${item.price.toFixed(2)}</div>
          <div class="food-actions">
            <button class="btn-small btn-add" data-id="${item.id}">+ Add</button>
            <button class="btn-small btn-view">View</button>
          </div>
        </div>
      </div>
    `;
    foodGrid.appendChild(foodCard);
  });
  
  // Update category title
  updateCategoryTitle(filterCategory);
}

// Update category title based on filter
function updateCategoryTitle(category) {
  if (category === 'all') {
    categoryTitle.textContent = 'Top dishes near you';
  } else {
    categoryTitle.textContent = `${category} Items`;
  }
}

// Render admin foods list
function renderAdminFoodsList() {
  adminFoodsList.innerHTML = '';
  
  foodItems.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><img src="${item.image}" alt="${item.name}"></td>
      <td>${item.name}</td>
      <td>${item.category}</td>
      <td>₹${item.price.toFixed(2)}</td>
      <td>
        <button class="action-btn delete-item" data-id="${item.id}">✕</button>
      </td>
    `;
    adminFoodsList.appendChild(row);
  });

  // Add event listeners for delete buttons in admin
  document.querySelectorAll('.delete-item').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const itemId = parseInt(e.target.getAttribute('data-id'));
      deleteFoodItem(itemId);
    });
  });
}

// Delete food item from admin
function deleteFoodItem(itemId) {
  if (confirm('Are you sure you want to delete this item?')) {
    const index = foodItems.findIndex(item => item.id === itemId);
    if (index !== -1) {
      foodItems.splice(index, 1);
      renderFoodItems(currentCategory);
      renderAdminFoodsList();
      alert('Item deleted successfully!');
    }
  }
}

// Setup event listeners
function setupEventListeners() {
  // Cart icon click
  document.querySelector('.cart-icon').addEventListener('click', () => {
    cartDrawer.classList.add('open');
    overlay.classList.add('active');
  });

  // Close cart drawer
  document.querySelector('.close-cart').addEventListener('click', () => {
    cartDrawer.classList.remove('open');
    overlay.classList.remove('active');
  });

  // Overlay click
  overlay.addEventListener('click', () => {
    cartDrawer.classList.remove('open');
    overlay.classList.remove('active');
    adminLoginModal.classList.add('hidden');
  });

  // Add to cart buttons
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-add')) {
      const itemId = parseInt(e.target.getAttribute('data-id'));
      addToCart(itemId);
    }
  });

  // Add special items to cart
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-add-special')) {
      const specialId = e.target.getAttribute('data-id');
      addSpecialToCart(specialId);
    }
  });

  // View special section button
  viewSpecialBtn.addEventListener('click', () => {
    specialSection.scrollIntoView({ behavior: 'smooth' });
  });

  // Category filtering
  document.querySelectorAll('.category').forEach(category => {
    category.addEventListener('click', (e) => {
      const categoryValue = e.currentTarget.getAttribute('data-category');
      
      // Update active category
      document.querySelectorAll('.category').forEach(cat => {
        cat.classList.remove('active');
      });
      e.currentTarget.classList.add('active');
      
      // Filter items
      currentCategory = categoryValue;
      renderFoodItems(categoryValue);
    });
  });

  // Navigation links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const section = e.target.getAttribute('data-section');
      
      // Update active nav link
      document.querySelectorAll('.nav-link').forEach(navLink => {
        navLink.classList.remove('active');
      });
      e.target.classList.add('active');
      
      if (section === 'home') {
        showSection('home-section');
        showSection('special-section');
        hideSection('menu-section');
        hideSection('contact-section');
        hideSection('admin-section');
      } else if (section === 'menu') {
        showSection('menu-section');
        hideSection('home-section');
        hideSection('special-section');
        hideSection('contact-section');
        hideSection('admin-section');
      } else if (section === 'contact') {
        showSection('contact-section');
        hideSection('home-section');
        hideSection('special-section');
        hideSection('menu-section');
        hideSection('admin-section');
      }
    });
  });

  // Contact form submission
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you for your message! We will get back to you soon.');
      contactForm.reset();
    });
  }

  // Admin link
  document.getElementById('admin-link').addEventListener('click', (e) => {
    e.preventDefault();
    if (isAdminAuthenticated) {
      showSection('admin-section');
      hideSection('home-section');
      hideSection('special-section');
      hideSection('menu-section');
      hideSection('contact-section');
    } else {
      adminLoginModal.classList.remove('hidden');
      overlay.classList.add('active');
    }
  });

  // Admin login
  document.getElementById('login-admin').addEventListener('click', () => {
    const password = document.getElementById('admin-password').value;
    if (password === 'admin123') {
      isAdminAuthenticated = true;
      adminLoginModal.classList.add('hidden');
      overlay.classList.remove('active');
      showSection('admin-section');
      hideSection('home-section');
      hideSection('special-section');
      hideSection('menu-section');
      hideSection('contact-section');
    } else {
      alert('Incorrect password. Please try again.');
    }
  });

  // Cancel admin login
  document.getElementById('cancel-admin').addEventListener('click', () => {
    adminLoginModal.classList.add('hidden');
    overlay.classList.remove('active');
  });

  // Logout admin
  document.getElementById('logout-admin').addEventListener('click', () => {
    isAdminAuthenticated = false;
    showSection('home-section');
    showSection('special-section');
    hideSection('admin-section');
  });

  // Admin tabs
  document.querySelectorAll('.admin-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const tabId = tab.getAttribute('data-tab');
      
      // Update active tab
      document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      // Show corresponding content
      document.querySelectorAll('.admin-tab-content').forEach(content => {
        content.classList.add('hidden');
      });
      document.getElementById(`${tabId}-tab`).classList.remove('hidden');
    });
  });

  // Toggle password visibility
  document.querySelector('.toggle-password').addEventListener('click', () => {
    const passwordInput = document.getElementById('admin-password');
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
    } else {
      passwordInput.type = 'password';
    }
  });

  // Add item form submission
  addItemForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('item-name').value;
    const category = document.getElementById('item-category').value;
    const price = parseFloat(document.getElementById('item-price').value);
    const image = document.getElementById('item-image').value;
    const description = document.getElementById('item-description').value;
    
    const newItem = {
      id: foodItems.length > 0 ? Math.max(...foodItems.map(item => item.id)) + 1 : 1,
      name,
      category,
      price,
      image,
      description
    };
    
    foodItems.push(newItem);
    renderFoodItems(currentCategory);
    renderAdminFoodsList();
    addItemForm.reset();
    
    alert('Item added successfully!');
  });

  // Close modal
  document.querySelector('.close-modal').addEventListener('click', () => {
    adminLoginModal.classList.add('hidden');
    overlay.classList.remove('active');
  });

  // Checkout button
  document.querySelector('.checkout-btn').addEventListener('click', () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) + 2.99;
    alert(`Order placed successfully! Total: ₹${total.toFixed(2)}\nThank you for your order!`);
    
    // Clear cart after successful checkout
    cart = [];
    updateCartUI();
    saveCartToStorage();
    cartDrawer.classList.remove('open');
    overlay.classList.remove('active');
  });
}

// Add item to cart
function addToCart(itemId) {
  const item = foodItems.find(food => food.id === itemId);
  if (!item) return;
  
  const existingItem = cart.find(cartItem => cartItem.id === itemId);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1
    });
  }
  
  updateCartUI();
  saveCartToStorage();
  showCartNotification(item.name);
}

// Add special item to cart
function addSpecialToCart(specialId) {
  const specialItem = specialItems.find(item => item.id === specialId);
  if (!specialItem) return;
  
  const existingItem = cart.find(cartItem => cartItem.id === specialId);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: specialItem.id,
      name: specialItem.name,
      price: specialItem.price,
      image: specialItem.image,
      quantity: 1,
      isSpecial: true
    });
  }
  
  updateCartUI();
  saveCartToStorage();
  showCartNotification(specialItem.name);
}

// Show cart notification
function showCartNotification(itemName) {
  // Create notification element
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: var(--primary);
    color: white;
    padding: 15px 20px;
    border-radius: 8px;
    box-shadow: var(--shadow);
    z-index: 10000;
    transform: translateX(400px);
    transition: transform 0.3s ease;
  `;
  notification.innerHTML = `
    <strong>${itemName}</strong> added to cart!
  `;
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Animate out and remove
  setTimeout(() => {
    notification.style.transform = 'translateX(400px)';
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

// Update cart UI
function updateCartUI() {
  // Update cart badge
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  cartBadge.textContent = totalItems;
  
  // Update cart items
  cartItems.innerHTML = '';
  
  if (cart.length === 0) {
    cartItems.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
    cartSubtotal.textContent = '₹0.00';
    cartTotal.textContent = '₹49';
    return;
  }
  
  let subtotal = 0;
  
  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;
    
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.innerHTML = `
      <div class="cart-item-info">
        <div class="cart-item-img">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="cart-item-details">
          <h4>${item.name}</h4>
          <p>₹${item.price.toFixed(2)}</p>
        </div>
      </div>
      <div class="cart-item-controls">
        <button class="qty-btn" data-id="${item.id}" data-action="decrease">-</button>
        <span class="qty-value">${item.quantity}</span>
        <button class="qty-btn" data-id="${item.id}" data-action="increase">+</button>
        <button class="remove-item" data-id="${item.id}">✕</button>
      </div>
    `;
    cartItems.appendChild(cartItem);
  });
  
  // Update totals
  cartSubtotal.textContent = `₹${subtotal.toFixed(2)}`;
  cartTotal.textContent = `₹${(subtotal + 2.99).toFixed(2)}`;
  
  // Add event listeners for cart controls
  document.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const itemId = parseInt(e.target.getAttribute('data-id'));
      const action = e.target.getAttribute('data-action');
      updateCartItemQuantity(itemId, action);
    });
  });
  
  document.querySelectorAll('.remove-item').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const itemId = parseInt(e.target.getAttribute('data-id'));
      removeFromCart(itemId);
    });
  });
}

// Update cart item quantity - FIXED: Remove item when quantity reaches 0
function updateCartItemQuantity(itemId, action) {
  const itemIndex = cart.findIndex(cartItem => cartItem.id === itemId);
  
  if (itemIndex === -1) return;
  
  if (action === 'increase') {
    cart[itemIndex].quantity += 1;
  } else if (action === 'decrease') {
    cart[itemIndex].quantity -= 1;
    
    // REMOVE ITEM if quantity becomes 0
    if (cart[itemIndex].quantity <= 0) {
      cart.splice(itemIndex, 1);
    }
  }
  
  updateCartUI();
  saveCartToStorage();
}

// Remove item from cart - FIXED: Completely remove item
function removeFromCart(itemId) {
  const itemIndex = cart.findIndex(item => item.id === itemId);
  
  if (itemIndex !== -1) {
    cart.splice(itemIndex, 1);
    updateCartUI();
    saveCartToStorage();
  }
}

// Save cart to localStorage
function saveCartToStorage() {
  localStorage.setItem('tomatoCart', JSON.stringify(cart));
}

// Load cart from localStorage - BUT WE'RE NOT USING THIS FOR NOW
function loadCartFromStorage() {
  // We're not loading from storage to ensure cart starts empty
  cart = [];
}

// Clear all cart data completely
function clearCartData() {
  cart = [];
  localStorage.removeItem('tomatoCart');
  updateCartUI();
}

// Show section
function showSection(sectionId) {
  document.getElementById(sectionId).classList.remove('hidden');
}

// Hide section
function hideSection(sectionId) {
  document.getElementById(sectionId).classList.add('hidden');
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Export for debugging
if (typeof window !== 'undefined') {
  window.clearCartData = clearCartData;
  window.getCart = () => cart; // For debugging
}