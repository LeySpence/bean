document.addEventListener('DOMContentLoaded', function () {
    initSlideshow('.hero__slideshow', '.hero__slide', '.hero__slide--active', '.hero__dot', '.hero__btn--prev', '.hero__btn--next');
});

function initSlideshow(containerSelector, slideSelector, activeClass, dotSelector, prevSelector, nextSelector) {
    var container = document.querySelector(containerSelector);
    if (!container) return;

    var slides = container.querySelectorAll(slideSelector);
    var dots = container.querySelectorAll(dotSelector);
    var prevBtn = container.querySelector(prevSelector);
    var nextBtn = container.querySelector(nextSelector);
    var currentIndex = 0;
    var autoPlayInterval = null;
    var autoPlayDelay = 5000;

    function goToSlide(index) {
        slides[currentIndex].classList.remove(activeClass.replace('.', ''));
        if (dots[currentIndex]) {
            dots[currentIndex].classList.remove(activeClass.replace('.', ''));
            dots[currentIndex].setAttribute('aria-selected', 'false');
        }

        currentIndex = (index + slides.length) % slides.length;

        slides[currentIndex].classList.add(activeClass.replace('.', ''));
        if (dots[currentIndex]) {
            dots[currentIndex].classList.add(activeClass.replace('.', ''));
            dots[currentIndex].setAttribute('aria-selected', 'true');
        }
    }

    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    function prevSlide() {
        goToSlide(currentIndex - 1);
    }

    function startAutoPlay() {
        stopAutoPlay();
        autoPlayInterval = setInterval(nextSlide, autoPlayDelay);
    }

    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        }
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function () {
            nextSlide();
            startAutoPlay();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function () {
            prevSlide();
            startAutoPlay();
        });
    }

    dots.forEach(function (dot, index) {
        dot.addEventListener('click', function () {
            goToSlide(index);
            startAutoPlay();
        });
    });

    container.addEventListener('mouseenter', stopAutoPlay);
    container.addEventListener('mouseleave', startAutoPlay);
    container.addEventListener('focusin', stopAutoPlay);
    container.addEventListener('focusout', startAutoPlay);

    startAutoPlay();
}
