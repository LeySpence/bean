document.addEventListener('DOMContentLoaded', function () {
    initWelcomeModal();
});

function initWelcomeModal() {
    var modal = document.getElementById('welcome-modal');
    if (!modal) return;

    var discountShown = localStorage.getItem('discountShown');
    if (!discountShown) {
        setTimeout(function () {
            modal.showModal();
        }, 1500);
    }

    var closeBtn = document.getElementById('modal-close');
    var dismissBtn = document.getElementById('modal-dismiss');
    var form = document.getElementById('modal-form');

    if (closeBtn) {
        closeBtn.addEventListener('click', function () {
            closeModal();
        });
    }

    if (dismissBtn) {
        dismissBtn.addEventListener('click', function () {
            closeModal();
        });
    }

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var emailInput = document.getElementById('modal-email');
            if (emailInput && emailInput.checkValidity()) {
                localStorage.setItem('newsletterEmail', emailInput.value);
                localStorage.setItem('discountShown', 'true');
                var body = modal.querySelector('.modal__body');
                if (body) {
                    body.innerHTML = '<h2 class="modal__title">Thank You!</h2>' +
                        '<p class="modal__text">Your 15% discount code has been sent to <strong>' + emailInput.value + '</strong>.</p>' +
                        '<button class="btn btn--primary btn--full" onclick="document.getElementById(\'welcome-modal\').close()" type="button">Start Shopping</button>';
                }
            }
        });
    }

    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    function closeModal() {
        localStorage.setItem('discountShown', 'true');
        modal.close();
    }
}
