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
        image: "data:image/jpeg;base64,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"
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