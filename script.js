// Enhanced Product Data with Ratings and Stock
const products = [
    {
        id: 1,
        name: "Paracetamol 500mg",
        category: "otc",
        price: 5.99,
        description: "For relief of mild to moderate pain and fever.",
        image: "https://via.placeholder.com/300x200?text=Paracetamol",
        rating: 4.5,
        reviews: 120,
        stock: 50,
        prescription: false
    },
    // More products with enhanced data...
];

// Enhanced Cart Functionality
class Cart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
    }
    
    addItem(product, quantity = 1) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({
                ...product,
                quantity
            });
        }
        
        this.save();
    }
    
    // More cart methods...
}

// DOM Elements
const dom = {
    productContainer: document.getElementById('product-container'),
    cartCount: document.getElementById('cart-count'),
    searchInput: document.getElementById('search-input'),
    mobileMenuToggle: document.querySelector('.mobile-menu-toggle'),
    mainNav: document.getElementById('main-nav'),
    // More element references...
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    const cart = new Cart();
    
    // Display initial products
    displayProducts();
    
    // Mobile menu toggle
    dom.mobileMenuToggle.addEventListener('click', () => {
        const expanded = dom.mobileMenuToggle.getAttribute('aria-expanded') === 'true';
        dom.mobileMenuToggle.setAttribute('aria-expanded', !expanded);
        dom.mainNav.classList.toggle('show');
    });
    
    // Search functionality
    dom.searchInput.addEventListener('input', (e) => {
        const results = searchProducts(e.target.value);
        displayProducts(results);
    });
    
    // Medicine reminder
    document.getElementById('reminder-btn').addEventListener('click', () => {
        if (Notification.permission !== 'granted') {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    showReminderModal();
                }
            });
        } else {
            showReminderModal();
        }
    });
    
    // More initialization...
});

// Enhanced Product Display with Sorting
function displayProducts(productsToShow = products, sortOption = 'name-asc') {
    // Clear container
    dom.productContainer.innerHTML = '';
    
    // Sort products
    const sortedProducts = [...productsToShow].sort((a, b) => {
        switch(sortOption) {
            case 'name-asc': return a.name.localeCompare(b.name);
            case 'name-desc': return b.name.localeCompare(a.name);
            case 'price-asc': return a.price - b.price;
            case 'price-desc': return b.price - a.price;
            default: return 0;
        }
    });
    
    // Display products
    sortedProducts.forEach(product => {
        const productCard = createProductCard(product);
        dom.productContainer.appendChild(productCard);
    });
}

// Create Product Card with all new features
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    // Stock badge
    const stockStatus = product.stock > 0 ? 'in-stock' : 'out-of-stock';
    const stockText = product.stock > 0 ? 'In Stock' : 'Out of Stock';
    
    card.innerHTML = `
        ${product.stock < 10 && product.stock > 0 ? '<span class="product-badge">Low Stock</span>' : ''}
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}" loading="lazy">
        </div>
        <div class="product-info">
            <span class="product-category">${formatCategory(product.category)}</span>
            <h3>${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-meta">
                <div class="product-rating">
                    <i class="fas fa-star"></i> ${product.rating} (${product.reviews})
                </div>
                <div class="product-stock ${stockStatus}">${stockText}</div>
            </div>
            <p class="product-price">$${product.price.toFixed(2)}</p>
            <div class="product-actions">
                <button class="add-to-cart" data-id="${product.id}" 
                    ${product.stock <= 0 ? 'disabled' : ''}>
                    ${product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
                <button class="view-details">Details</button>
            </div>
        </div>
    `;
    
    return card;
}

// Medicine Reminder Functionality
function showReminderModal() {
    // Implementation for reminder modal
}

// Prescription Upload Handling
function handlePrescriptionUpload(file) {
    // Validate file type and size
    const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    const maxSize = 5 * 1024 * 1024; // 5MB
    
    if (!validTypes.includes(file.type)) {
        showNotification('Invalid file type. Please upload JPEG, PNG or PDF.', 'error');
        return false;
    }
    
    if (file.size > maxSize) {
        showNotification('File too large. Max 5MB allowed.', 'error');
        return false;
    }
    
    // Process the file
    return true;
}

// Enhanced Notification System
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.setAttribute('role', 'alert');
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        ${message}
    `;
    
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

// Initialize all event listeners
function initEventListeners() {
    // Product filter buttons
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const category = button.dataset.category;
            displayProducts(category === 'all' ? products : products.filter(p => p.category === category));
        });
    });
    
    // Sort dropdown
    document.getElementById('sort').addEventListener('change', (e) => {
        displayProducts(undefined, e.target.value);
    });
    
    // More event listeners...
}

// Initialize the app
function init() {
    initEventListeners();
    updateCartCount();
    
    // Check for prescription items in cart
    if (cart.items.some(item => item.prescription)) {
        document.getElementById('prescription-required').style.display = 'block';
    }
}

init();