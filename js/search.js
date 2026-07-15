document.addEventListener('DOMContentLoaded', function () {
    initSearch();
});

function initSearch() {
    var searchInput = document.getElementById('coffee-search');
    var clearBtn = document.getElementById('search-clear');
    var filterBtns = document.querySelectorAll('.filter-btn');
    var cards = document.querySelectorAll('.product-card');

    if (!searchInput || cards.length === 0) return;

    var activeFilter = 'all';

    function filterProducts() {
        var query = searchInput.value.toLowerCase().trim();

        cards.forEach(function (card) {
            var category = card.getAttribute('data-category') || '';
            var text = card.textContent.toLowerCase();
            var matchesFilter = activeFilter === 'all' || category === activeFilter;
            var matchesSearch = query === '' || text.indexOf(query) !== -1;

            if (matchesFilter && matchesSearch) {
                card.classList.remove('product-card--hidden');
            } else {
                card.classList.add('product-card--hidden');
            }
        });
    }

    searchInput.addEventListener('input', function () {
        if (clearBtn) {
            clearBtn.classList.toggle('search-filter__clear--visible', this.value.length > 0);
        }
        filterProducts();
    });

    if (clearBtn) {
        clearBtn.addEventListener('click', function () {
            searchInput.value = '';
            clearBtn.classList.remove('search-filter__clear--visible');
            filterProducts();
            searchInput.focus();
        });
    }

    filterBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            filterBtns.forEach(function (b) {
                b.classList.remove('filter-btn--active');
                b.setAttribute('aria-pressed', 'false');
            });
            this.classList.add('filter-btn--active');
            this.setAttribute('aria-pressed', 'true');
            activeFilter = this.getAttribute('data-filter');
            filterProducts();
        });
    });
}
