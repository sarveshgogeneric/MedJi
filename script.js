// Sample product data
const products = [
    {
        id: 1,
        name: "Paracetamol 500mg",
        category: "otc",
        price: 5.99,
        description: "For relief of mild to moderate pain and fever.",
        image: "assets/images/sarvesh.jpg"
    },
    {
        id: 2,
        name: "Ibuprofen 200mg",
        category: "otc",
        price: 7.49,
        description: "Anti-inflammatory for pain relief and fever reduction.",
        image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.indiamart.com%2Fproddetail%2Fibuprofen-tablets-ip-200-mg-24994070188.html&psig=AOvVaw22kdDbg1rEH6yLwhSTMDD4&ust=1749367644423000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCOCQ17vk3o0DFQAAAAAdAAAAABAE"
    },
    {
        id: 3,
        name: "Amoxicillin 500mg",
        category: "prescription",
        price: 12.99,
        description: "Antibiotic for bacterial infections. Prescription required.",
        image: "https://via.placeholder.com/300x200?text=Amoxicillin"
    },
    {
        id: 4,
        name: "Vitamin C 1000mg",
        category: "wellness",
        price: 9.99,
        description: "Immune system support and antioxidant.",
        image: "https://via.placeholder.com/300x200?text=Vitamin+C"
    },
    {
        id: 5,
        name: "Loratadine 10mg",
        category: "otc",
        price: 8.29,
        description: "Antihistamine for allergy relief.",
        image: "https://via.placeholder.com/300x200?text=Loratadine"
    },
    {
        id: 6,
        name: "Omeprazole 20mg",
        category: "prescription",
        price: 15.49,
        description: "For acid reflux and heartburn relief.",
        image: "https://via.placeholder.com/300x200?text=Omeprazole"
    },
    {
        id: 7,
        name: "Multivitamin Complex",
        category: "wellness",
        price: 14.99,
        description: "Daily essential vitamins and minerals.",
        image: "https://via.placeholder.com/300x200?text=Multivitamin"
    },
    {
        id: 8,
        name: "Cetirizine 10mg",
        category: "otc",
        price: 6.79,
        description: "For allergy symptoms and hives.",
        image: "https://via.placeholder.com/300x200?text=Cetirizine"
    }
];

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// DOM Elements
const productContainer = document.getElementById('product-container');
const cartCount = document.getElementById('cart-count');
const cartLink = document.getElementById('cart-link');
const cartModal = document.getElementById('cart-modal');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const emptyCartMessage = document.getElementById('empty-cart-message');
const checkoutBtn = document.getElementById('checkout-btn');
const checkoutModal = document.getElementById('checkout-modal');
const closeButtons = document.querySelectorAll('.close');
const filterButtons = document.querySelectorAll('.filter-btn');

// Display products
function displayProducts(category = 'all') {
    productContainer.innerHTML = '';
    
    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(product => product.category === category);
    
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <span class="product-category">${formatCategory(product.category)}</span>
                <h3>${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <div class="product-actions">
                    <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                    <button class="view-details">Details</button>
                </div>
            </div>
        `;
        productContainer.appendChild(productCard);
    });
    
    // Add event listeners to "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            addToCart(productId);
        });
    });
}

// Format category for display
function formatCategory(category) {
    const categories = {
        'otc': 'Over-the-Counter',
        'prescription': 'Prescription',
        'wellness': 'Wellness'
    };
    return categories[category] || category;
}

// Add to cart function
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    updateCart();
    showNotification(`${product.name} added to cart`);
}

// Update cart display
function updateCart() {
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart modal
    if (cart.length === 0) {
        emptyCartMessage.style.display = 'block';
        cartItems.innerHTML = '';
    } else {
        emptyCartMessage.style.display = 'none';
        cartItems.innerHTML = '';
        
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-info">
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div>
                        <h4>${item.name}</h4>
                        <p>$${item.price.toFixed(2)}</p>
                    </div>
                </div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn minus" data-id="${item.id}">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn plus" data-id="${item.id}">+</button>
                </div>
                <div class="cart-item-price">
                    $${(item.price * item.quantity).toFixed(2)}
                </div>
                <button class="remove-item" data-id="${item.id}">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            cartItems.appendChild(cartItem);
        });
        
        // Add event listeners to quantity buttons
        document.querySelectorAll('.quantity-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = parseInt(e.target.getAttribute('data-id'));
                const isPlus = e.target.classList.contains('plus');
                updateCartItemQuantity(productId, isPlus);
            });
        });
        
        // Add event listeners to remove buttons
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = parseInt(e.target.getAttribute('data-id'));
                removeFromCart(productId);
            });
        });
    }
    
    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);
}

// Update cart item quantity
function updateCartItemQuantity(productId, isPlus) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    if (isPlus) {
        item.quantity += 1;
    } else {
        item.quantity -= 1;
        if (item.quantity <= 0) {
            cart = cart.filter(item => item.id !== productId);
        }
    }
    
    updateCart();
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    showNotification('Item removed from cart');
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    updateCart();
    
    // Filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const category = button.getAttribute('data-category');
            displayProducts(category);
        });
    });
    
    // Cart modal
    cartLink.addEventListener('click', (e) => {
        e.preventDefault();
        cartModal.style.display = 'block';
    });
    
    // Checkout button
    checkoutBtn.addEventListener('click', () => {
        cartModal.style.display = 'none';
        checkoutModal.style.display = 'block';
    });
    
    // Close modals
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            cartModal.style.display = 'none';
            checkoutModal.style.display = 'none';
        });
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.style.display = 'none';
        }
        if (e.target === checkoutModal) {
            checkoutModal.style.display = 'none';
        }
    });
    
    // Payment method toggle
    document.querySelectorAll('input[name="payment"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            const creditCardInfo = document.getElementById('credit-card-info');
            if (e.target.value === 'cod') {
                creditCardInfo.style.display = 'none';
            } else {
                creditCardInfo.style.display = 'block';
            }
        });
    });
    
    // Checkout form submission
    document.getElementById('checkout-form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Order placed successfully! Thank you for your purchase.');
        cart = [];
        updateCart();
        checkoutModal.style.display = 'none';
    });
    
    // Contact form submission
    document.getElementById('contact-form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message. We will get back to you soon.');
        e.target.reset();
    });
});

// Add notification styles dynamically
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background-color: var(--primary-color);
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        box-shadow: var(--box-shadow);
        opacity: 0;
        transition: opacity 0.3s;
        z-index: 1000;
    }
    .notification.show {
        opacity: 1;
    }
`;
document.head.appendChild(notificationStyles);