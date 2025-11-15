document.addEventListener('DOMContentLoaded', function() {
    // Get all slides and dots container
    const slides = document.querySelectorAll('.hero-slide');
    const dotsContainer = document.querySelector('.slider-dots');
    let currentSlide = 0;
    let slideInterval;
    const slideDuration = 5000; // 5 seconds per slide
    
    // Preload the next image when a slide becomes active
    function preloadNextSlide() {
        const nextSlide = (currentSlide + 1) % slides.length;
        const nextSlideEl = slides[nextSlide];
        const bgImage = nextSlideEl.getAttribute('data-bg');
        
        if (bgImage && !nextSlideEl.style.backgroundImage) {
            const img = new Image();
            img.src = bgImage;
            img.onload = function() {
                nextSlideEl.style.backgroundImage = `url('${bgImage}')`;
                nextSlideEl.removeAttribute('data-bg');
            };
        }
    }

    // Create dots for each slide
    function createDots() {
        slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('slider-dot');
            if (index === 0) dot.classList.add('active');
            dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
    }

    // Go to specific slide
    function goToSlide(slideIndex) {
        // Don't do anything if we're already on this slide
        if (currentSlide === slideIndex) return;
        
        // Reset all slides and dots
        const slides = document.querySelectorAll('.hero-slide');
        const dots = document.querySelectorAll('.slider-dot');
        
        // Fade out current slide
        slides[currentSlide].classList.remove('active');
        if (dots[currentSlide]) {
            dots[currentSlide].classList.remove('active');
        }
        
        // Update current slide index
        currentSlide = (slideIndex + slides.length) % slides.length;
        
        // Fade in new slide
        slides[currentSlide].classList.add('active');
        if (dots[currentSlide]) {
            dots[currentSlide].classList.add('active');
        }
        
        // Preload next slide for smoother transitions
        preloadNextSlide();
        
        // Reset the auto-slide timer
        resetSlideTimer();
    }

    // Go to next slide
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    // Go to previous slide
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    // Auto slide
    function startSlideShow() {
        slideInterval = setInterval(nextSlide, slideDuration);
    }

    // Reset slide timer
    function resetSlideTimer() {
        clearInterval(slideInterval);
        startSlideShow();
    }

    // Pause on hover
    function setupPauseOnHover() {
        const slider = document.querySelector('.hero-slider');
        slider.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        slider.addEventListener('mouseleave', () => {
            resetSlideTimer();
        });
    }

    // Initialize the slider
    function initSlider() {
        if (slides.length === 0) return;
        
        createDots();
        
        // Set first slide as active
        slides[0].classList.add('active');
        
        // Add event listeners for navigation buttons
        const prevBtn = document.querySelector('.slider-prev');
        const nextBtn = document.querySelector('.slider-next');
        
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        
        // Start autoplay
        startSlideShow();
        
        // Pause on hover
        setupPauseOnHover();
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                prevSlide();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
            }
        });
    }

    // Initialize the slider when the DOM is fully loaded
    initSlider();
});
