document.addEventListener('DOMContentLoaded', function () {
    initForms();
});

function initForms() {
    initNewsletterForms();
    initBookingForm();
    initRegisterButtons();
}

function initNewsletterForms() {
    var forms = document.querySelectorAll('#newsletterForm, #offersNewsletterForm');
    forms.forEach(function (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var emailInput = form.querySelector('input[type="email"]');
            if (emailInput && emailInput.checkValidity()) {
                var btn = form.querySelector('button[type="submit"]');
                var originalText = btn.textContent;
                btn.textContent = 'Subscribed!';
                btn.disabled = true;
                emailInput.value = '';
                setTimeout(function () {
                    btn.textContent = originalText;
                    btn.disabled = false;
                }, 2500);
            }
        });
    });
}

function initBookingForm() {
    var form = document.getElementById('bookingForm');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        var firstName = document.getElementById('first-name');
        var lastName = document.getElementById('last-name');
        var email = document.getElementById('email');
        var eventSelect = document.getElementById('event-select');
        var valid = true;

        if (firstName && !firstName.checkValidity()) {
            showFieldError('first-name-error', 'Please enter a valid first name (2-50 characters).');
            valid = false;
        } else {
            clearFieldError('first-name-error');
        }

        if (lastName && !lastName.checkValidity()) {
            showFieldError('last-name-error', 'Please enter a valid last name (2-50 characters).');
            valid = false;
        } else {
            clearFieldError('last-name-error');
        }

        if (email && !email.checkValidity()) {
            showFieldError('email-error', 'Please enter a valid email address.');
            valid = false;
        } else {
            clearFieldError('email-error');
        }

        if (eventSelect && !eventSelect.value) {
            showFieldError('event-select-error', 'Please select an event.');
            valid = false;
        } else {
            clearFieldError('event-select-error');
        }

        if (!valid) {
            e.preventDefault();
        }
    });
}

function initRegisterButtons() {
    var registerBtns = document.querySelectorAll('.btn--register');
    registerBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var eventName = this.getAttribute('data-event');
            var eventSelect = document.getElementById('event-select');
            var registrationSection = document.getElementById('registration');

            if (registrationSection) {
                registrationSection.scrollIntoView({ behavior: 'smooth' });
            }

            if (eventSelect && eventName) {
                var options = eventSelect.options;
                for (var i = 0; i < options.length; i++) {
                    if (options[i].text.indexOf(eventName) !== -1) {
                        eventSelect.selectedIndex = i;
                        break;
                    }
                }
            }
        });
    });
}

function showFieldError(errorId, message) {
    var errorEl = document.getElementById(errorId);
    if (errorEl) {
        errorEl.textContent = message;
    }
}

function clearFieldError(errorId) {
    var errorEl = document.getElementById(errorId);
    if (errorEl) {
        errorEl.textContent = '';
    }
}
