// ---------- HAMBURGER MORPH & STAGGERED NAV REVEAL ----------
const hamburger = document.querySelector('.hamburger');
const navOverlay = document.getElementById('navOverlay');
const navLinks = document.querySelectorAll('.nav-list a');

if (hamburger && navOverlay) {
  hamburger.addEventListener('click', () => {
    const isOpen = navOverlay.classList.toggle('is-open');
    hamburger.classList.toggle('is-active');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navOverlay.classList.remove('is-open');
      hamburger.classList.remove('is-active');
      document.body.style.overflow = '';
    });
  });
}

// ---------- INTERSECTION OBSERVER SCROLL REVEAL ----------
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.08,
  rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ---------- SLIDESHOW ----------
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
  slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
  dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
  currentSlide = index;
}

function nextSlide() {
  showSlide((currentSlide + 1) % slides.length);
}

if (slides.length > 0) {
  setInterval(nextSlide, 4000);
  dots.forEach((dot, i) => dot.addEventListener('click', () => showSlide(i)));
}

// ---------- MODAL POPUP ----------
const modal = document.getElementById('discountModal');
const modalClose = document.querySelector('.modal-close');

if (modal && !localStorage.getItem('modalShown')) {
  setTimeout(() => {
    modal.classList.add('active');
    localStorage.setItem('modalShown', 'true');
  }, 2000);
}

if (modalClose) {
  modalClose.addEventListener('click', () => modal.classList.remove('active'));
}

if (modal) {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });
}

// ---------- CART ----------
function formatMWK(amount) {
  return Number(amount).toLocaleString('en-MW');
}

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
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="ph ph-check"></i> Added';
    btn.style.background = '#2a7a4b';
    btn.style.color = '#fff';
    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.style.background = '';
      btn.style.color = '';
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
          <i class="ph ph-shopping-cart" style="font-size: 2.5rem; margin-bottom: 1rem; display: block; color: var(--caramel);"></i>
          <p style="margin-bottom: 1.5rem;">Your cart is empty.</p>
          <a href="coffee.html" class="btn btn-primary btn-small">Browse Coffee</a>
          <a href="equipment.html" class="btn btn-outline btn-small" style="margin-left: 0.75rem;">Browse Equipment</a>
        </td>
      </tr>
    `;
    if (cartTotal) cartTotal.textContent = 'Total: MWK 0';
    return;
  }

  let total = 0;
  cartContainer.innerHTML = cart.map(item => {
    const itemTotal = item.price * item.qty;
    total += itemTotal;
    return `
      <tr>
        <td><img src="${item.image}" alt="${item.name}" class="cart-item-img"></td>
        <td><strong>${item.name}</strong></td>
        <td>MWK ${formatMWK(item.price)}</td>
        <td>
          <div class="qty-control">
            <button class="qty-btn" onclick="updateQuantity('${item.id}', -1)">−</button>
            <span>${item.qty}</span>
            <button class="qty-btn" onclick="updateQuantity('${item.id}', 1)">+</button>
          </div>
        </td>
        <td>
          <strong>MWK ${formatMWK(itemTotal)}</strong>
          <button class="qty-btn" onclick="removeFromCart('${item.id}')" style="margin-left: 0.75rem; color: #c0392b;" aria-label="Remove item">
            <i class="ph ph-trash"></i>
          </button>
        </td>
      </tr>
    `;
  }).join('');

  if (cartTotal) cartTotal.textContent = `Total: MWK ${formatMWK(total)}`;
}

// ---------- COFFEE SEARCH ----------
const searchInput = document.getElementById('coffeeSearch');
const productCards = document.querySelectorAll('.product-card');

if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    productCards.forEach(card => {
      const name = card.querySelector('.core-title').textContent.toLowerCase();
      const origin = card.querySelector('.card-origin')?.textContent.toLowerCase() || '';
      const notes = card.querySelector('.card-notes')?.textContent.toLowerCase() || '';
      const match = name.includes(term) || origin.includes(term) || notes.includes(term);
      card.closest('.shell').style.display = match ? '' : 'none';
    });
  });
}

// ---------- EVENT REGISTRATION ----------
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

// ---------- SUBSCRIPTION FORM ----------
const subscriptionForm = document.getElementById('subscriptionForm');
if (subscriptionForm) {
  subscriptionForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const plan = document.getElementById('planSelect').value;
    const planName = plan.charAt(0).toUpperCase() + plan.slice(1);
    alert('Thank you for subscribing to our ' + planName + ' plan! You will receive a confirmation email shortly.');
    this.reset();
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

// ---------- INIT ----------
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  renderCart();
});
