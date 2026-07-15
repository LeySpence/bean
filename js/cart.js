document.addEventListener('DOMContentLoaded', function () {
    initAddToCart();
    if (document.getElementById('cartItems')) {
        renderCart();
    }
});

function getCart() {
    return JSON.parse(localStorage.getItem('beanBoutiqueCart') || '{"items":[]}');
}

function saveCart(cart) {
    localStorage.setItem('beanBoutiqueCart', JSON.stringify(cart));
    updateCartBadge();
}

function updateCartBadge() {
    var cart = getCart();
    var total = cart.items.reduce(function (sum, item) { return sum + item.quantity; }, 0);
    var els = document.querySelectorAll('#cartCount');
    els.forEach(function (el) { el.textContent = total; });
}

function addToCart(product) {
    var cart = getCart();
    var existing = cart.items.find(function (item) { return item.id === product.id; });

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.items.push({
            id: product.id,
            type: product.type,
            name: product.name,
            price: parseFloat(product.price),
            quantity: 1,
            image: product.image,
            addedAt: new Date().toISOString()
        });
    }

    saveCart(cart);
}

function removeFromCart(productId) {
    var cart = getCart();
    cart.items = cart.items.filter(function (item) { return item.id !== productId; });
    saveCart(cart);
    renderCart();
}

function updateQuantity(productId, quantity) {
    var cart = getCart();
    var item = cart.items.find(function (i) { return i.id === productId; });
    if (item) {
        item.quantity = Math.max(1, Math.min(99, parseInt(quantity) || 1));
    }
    saveCart(cart);
    renderCart();
}

function getCartTotal() {
    var cart = getCart();
    return cart.items.reduce(function (sum, item) { return sum + (item.price * item.quantity); }, 0);
}

function initAddToCart() {
    document.querySelectorAll('.btn--add-to-cart').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var product = {
                id: this.getAttribute('data-product-id'),
                name: this.getAttribute('data-name'),
                price: this.getAttribute('data-price'),
                image: this.getAttribute('data-image'),
                type: this.getAttribute('data-type')
            };
            addToCart(product);

            var originalText = this.textContent;
            this.textContent = 'Added!';
            this.disabled = true;
            var self = this;
            setTimeout(function () {
                self.textContent = originalText;
                self.disabled = false;
            }, 1200);
        });
    });

    document.querySelectorAll('.btn--subscribe').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var product = {
                id: 'sub-' + this.getAttribute('data-plan'),
                name: this.getAttribute('data-name'),
                price: this.getAttribute('data-price'),
                image: '',
                type: 'subscription'
            };
            addToCart(product);

            var originalText = this.textContent;
            this.textContent = 'Added!';
            this.disabled = true;
            var self = this;
            setTimeout(function () {
                self.textContent = originalText;
                self.disabled = false;
            }, 1200);
        });
    });
}

function renderCart() {
    var cartItemsEl = document.getElementById('cartItems');
    var cartEmptyEl = document.getElementById('cart-empty');
    var cartListEl = document.getElementById('cart-list');
    var checkoutBtn = document.getElementById('checkoutBtn');

    if (!cartItemsEl) return;

    var cart = getCart();

    if (cart.items.length === 0) {
        if (cartEmptyEl) cartEmptyEl.hidden = false;
        if (cartListEl) cartListEl.hidden = true;
        document.getElementById('cartSubtotal').textContent = '\u00A30.00';
        document.getElementById('cartTotal').innerHTML = '<strong>\u00A30.00</strong>';
        if (checkoutBtn) checkoutBtn.disabled = true;
        return;
    }

    if (cartEmptyEl) cartEmptyEl.hidden = true;
    if (cartListEl) cartListEl.hidden = false;
    if (checkoutBtn) checkoutBtn.disabled = false;

    cartItemsEl.innerHTML = '';

    cart.items.forEach(function (item) {
        var subtotal = (item.price * item.quantity).toFixed(2);
        var row = document.createElement('div');
        row.className = 'cart-item';
        row.innerHTML =
            '<div class="cart-item__info">' +
                (item.image ? '<img src="' + item.image + '" alt="' + item.name + '" class="cart-item__image" width="60" height="60">' : '') +
                '<span class="cart-item__name">' + item.name + '</span>' +
            '</div>' +
            '<span class="cart-item__price">\u00A3' + item.price.toFixed(2) + '</span>' +
            '<div class="cart-item__quantity">' +
                '<input type="number" min="1" max="99" value="' + item.quantity + '" data-cart-item-id="' + item.id + '" aria-label="Quantity for ' + item.name + '">' +
            '</div>' +
            '<span class="cart-item__subtotal">\u00A3' + subtotal + '</span>' +
            '<button class="cart-item__remove" data-cart-item-id="' + item.id + '" aria-label="Remove ' + item.name + '" type="button"><i class="ph-bold ph-x"></i></button>';

        cartItemsEl.appendChild(row);
    });

    var total = getCartTotal();
    document.getElementById('cartSubtotal').textContent = '\u00A3' + total.toFixed(2);
    document.getElementById('cartTotal').innerHTML = '<strong>\u00A3' + total.toFixed(2) + '</strong>';

    cartItemsEl.querySelectorAll('.cart-item__remove').forEach(function (btn) {
        btn.addEventListener('click', function () {
            removeFromCart(this.getAttribute('data-cart-item-id'));
        });
    });

    cartItemsEl.querySelectorAll('.cart-item__quantity input').forEach(function (input) {
        input.addEventListener('change', function () {
            updateQuantity(this.getAttribute('data-cart-item-id'), this.value);
        });
    });

    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function () {
            alert('Checkout is not yet available. Online transactions will be enabled in a future update.');
        });
    }
}
