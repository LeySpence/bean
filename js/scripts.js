/* ============================================
   BEAN BOUTIQUE COFFEE SHOP
   External JavaScript - script.js
   ============================================ */

// ---------- SLIDESHOW ----------
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
    currentSlide = index;
}

function nextSlide() {
    showSlide((currentSlide + 1) % slides.length);
}

if (slides.length > 0) {
    setInterval(nextSlide, 4000);
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => showSlide(i));
    });
}

// ---------- MOBILE NAVIGATION ----------
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('nav ul');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ---------- MODAL POPUP ----------
const modal = document.getElementById('discountModal');
const modalClose = document.querySelector('.modal-close');

function openModal() {
    if (modal) {
        modal.classList.add('active');
        localStorage.setItem('modalShown', 'true');
    }
}

function closeModal() {
    if (modal) {
        modal.classList.remove('active');
    }
}

if (modal && !localStorage.getItem('modalShown')) {
    setTimeout(openModal, 2000);
}

if (modalClose) {
    modalClose.addEventListener('click', closeModal);
}

if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
}

// ---------- CART FUNCTIONALITY ----------
let cart = JSON.parse(localStorage.getItem('beanCart')) || [];

function updateCartCount() {
    const countElements = document.querySelectorAll('.cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    countElements.forEach(el => {
        el.textContent = totalItems;
        el.style.display = totalItems > 0 ? 'flex' : 'none';
    });
}

function saveCart() {
    localStorage.setItem('beanCart', JSON.stringify(cart));
    updateCartCount();
    renderCart();
}

function addToCart(id, name, price, image) {
    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.qty++;
    } else {
        cart.push({ id, name, price, image, qty: 1 });
    }
    saveCart();

    const btn = document.querySelector(`button[data-id="${id}"]`);
    if (btn) {
        const originalText = btn.textContent;
        btn.textContent = 'Added!';
        btn.style.backgroundColor = '#28a745';
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.backgroundColor = '';
        }, 1500);
    }
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
}

function updateQuantity(id, change) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.qty += change;
        if (item.qty <= 0) {
            removeFromCart(id);
        } else {
            saveCart();
        }
    }
}

function renderCart() {
    const cartContainer = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');

    if (!cartContainer) return;

    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <tr>
                <td colspan="5" class="cart-empty">
                    <i class="fas fa-shopping-cart" style="font-size: 3rem; margin-bottom: 1rem; display: block; color: var(--accent);"></i>
                    <p>Your cart is empty.</p>
                    <a href="coffee.html" class="btn btn-primary mt-2">Browse Coffee</a>
                    <a href="equipment.html" class="btn btn-outline mt-2">Browse Equipment</a>
                </td>
            </tr>
        `;
        if (cartTotal) cartTotal.textContent = 'Total: MWK 0.00';
        return;
    }

    let total = 0;
    cartContainer.innerHTML = cart.map(item => {
        const itemTotal = item.price * item.qty;
        total += itemTotal;
        return `
            <tr>
                <td>
                    <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                </td>
                <td><strong>${item.name}</strong></td>
                <td>MWK ${item.price.toFixed(2)}</td>
                <td>
                    <div class="qty-control">
                        <button class="qty-btn" onclick="updateQuantity('${item.id}', -1)">-</button>
                        <span>${item.qty}</span>
                        <button class="qty-btn" onclick="updateQuantity('${item.id}', 1)">+</button>
                    </div>
                </td>
                <td>
                    <strong>MWK ${itemTotal.toFixed(2)}</strong>
                    <button class="qty-btn" onclick="removeFromCart('${item.id}')" style="margin-left: 1rem; color: #dc3545;" aria-label="Remove item">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    }).join('');

    if (cartTotal) cartTotal.textContent = `Total: MWK ${total.toFixed(2)}`;
}

// ---------- SEARCH FUNCTIONALITY ----------
const searchInput = document.getElementById('coffeeSearch');
const productCards = document.querySelectorAll('.product-card');

if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        productCards.forEach(card => {
            const name = card.querySelector('.card-title').textContent.toLowerCase();
            const origin = card.querySelector('.card-origin')?.textContent.toLowerCase() || '';
            const notes = card.querySelector('.card-notes')?.textContent.toLowerCase() || '';

            if (name.includes(term) || origin.includes(term) || notes.includes(term)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// ---------- EVENTS REGISTRATION ----------
const eventForm = document.getElementById('eventRegistration');
if (eventForm) {
    eventForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const eventName = document.getElementById('eventName').value;

        const subject = encodeURIComponent(`Event Registration: ${eventName}`);
        const body = encodeURIComponent(`Name: ${firstName} ${lastName}\nEmail: ${email}\nEvent: ${eventName}`);

        window.location.href = `mailto:events@beanboutique.com?subject=${subject}&body=${body}`;

        alert('Thank you for registering! Your email client should open shortly.');
        eventForm.reset();
    });
}

// ---------- NEWSLETTER ----------
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for subscribing to our newsletter!');
        newsletterForm.reset();
    });
}

// ---------- CHECKOUT ----------
const checkoutBtn = document.getElementById('checkoutBtn');
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty!');
        } else {
            alert('Thank you for your order! This is a prototype - checkout would proceed to payment in a live site.');
        }
    });
}

// ---------- AOS INITIALIZATION ----------
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 800,
        once: true,
        offset: 100
    });
}

// ---------- INITIALIZE ----------
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    renderCart();
});