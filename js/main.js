document.addEventListener('DOMContentLoaded', function () {
    initMobileNav();
    updateCartCount();
    initScrollReveal();
    initAmbientBlob();
});

function initMobileNav() {
    var toggle = document.querySelector('.nav-toggle');
    var navLinks = document.querySelector('.nav-links');

    if (!toggle || !navLinks) return;

    toggle.addEventListener('click', function () {
        var isOpen = navLinks.classList.toggle('nav-links--open');
        toggle.classList.toggle('nav-toggle--open');
        toggle.setAttribute('aria-expanded', isOpen);
        document.body.classList.toggle('nav-open', isOpen);
    });

    navLinks.querySelectorAll('.nav-links__link').forEach(function (link) {
        link.addEventListener('click', function () {
            navLinks.classList.remove('nav-links--open');
            toggle.classList.remove('nav-toggle--open');
            toggle.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('nav-open');
        });
    });

    document.addEventListener('click', function (e) {
        if (document.body.classList.contains('nav-open') &&
            !navLinks.contains(e.target) &&
            !toggle.contains(e.target)) {
            navLinks.classList.remove('nav-links--open');
            toggle.classList.remove('nav-toggle--open');
            toggle.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('nav-open');
        }
    });
}

function updateCartCount() {
    var cartCountEl = document.getElementById('cartCount');
    if (!cartCountEl) return;

    var cart = JSON.parse(localStorage.getItem('beanBoutiqueCart') || '{"items":[]}');
    var total = cart.items.reduce(function (sum, item) {
        return sum + item.quantity;
    }, 0);
    cartCountEl.textContent = total;
}

function initScrollReveal() {
    var revealEls = document.querySelectorAll('.section, .hero__content, .hero__media');
    if (revealEls.length === 0) return;

    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    revealEls.forEach(function (el) {
        el.classList.add('reveal');
    });

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal--visible');

                var children = entry.target.querySelectorAll('.reveal-child');
                children.forEach(function (child, i) {
                    child.style.setProperty('--reveal-index', i);
                    child.classList.add('reveal--visible');
                });

                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) {
        observer.observe(el);
    });
}

function initAmbientBlob() {
    if (!document.querySelector('.ambient-blob')) {
        var blob = document.createElement('div');
        blob.className = 'ambient-blob';
        document.body.appendChild(blob);
    }
}
