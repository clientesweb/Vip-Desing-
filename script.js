// main.js

document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        gsap.to(preloader, { opacity: 0, duration: 1, onComplete: () => preloader.style.display = 'none' });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // GSAP Animations
    gsap.registerPlugin(ScrollTrigger);

    // Fade-in animation for sections
    gsap.utils.toArray('.fade-in').forEach(section => {
        gsap.from(section, {
            opacity: 0,
            y: 50,
            duration: 1,
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Parallax effect for hero section
    gsap.to(".hero-content", {
        yPercent: 50,
        ease: "none",
        scrollTrigger: {
            trigger: ".hero-section",
            scrub: true
        }, 
    });

    // Gallery filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            
            filterButtons.forEach(btn => btn.classList.remove('active', 'bg-primary', 'text-black'));
            button.classList.add('active', 'bg-primary', 'text-black');
            
            galleryItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    gsap.to(item, { opacity: 1, duration: 0.5, display: 'block' });
                } else {
                    gsap.to(item, { opacity: 0, duration: 0.5, display: 'none' });
                }
            });
        });
    });

    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        // Add your form submission logic here
        // For example, you could use fetch to send the data to your server
        try {
            const formData = new FormData(contactForm);
            const response = await fetch('/api/contact', {
                method: 'POST',
                body: formData
            });
            if (response.ok) {
                alert('Thank you for your message. We will get back to you soon!');
                contactForm.reset();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('There was an error submitting your form. Please try again later.');
        }
    });

    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletter-form');
    newsletterForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        // Add your newsletter subscription logic here
        try {
            const formData = new FormData(newsletterForm);
            const response = await fetch('/api/newsletter', {
                method: 'POST',
                body: formData
            });
            if (response.ok) {
                alert('Thank you for subscribing to our newsletter!');
                newsletterForm.reset();
            } else {
                throw new Error('Newsletter subscription failed');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('There was an error subscribing to the newsletter. Please try again later.');
        }
    });

    // Back to Top button functionality
    const backToTopButton = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            gsap.to(backToTopButton, { opacity: 1, duration: 0.3, pointerEvents: 'auto' });
        } else {
            gsap.to(backToTopButton, { opacity: 0, duration: 0.3, pointerEvents: 'none' });
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Top banner messages
    const bannerMessages = [
        "Experience luxury like never before",
        "Customized vehicles for discerning clients",
        "Innovative designs, unparalleled craftsmanship",
        "Transform your ride with VIP Design"
    ];
    const bannerContainer = document.getElementById('banner-messages');
    let currentMessageIndex = 0;

    function updateBannerMessage() {
        gsap.to(bannerContainer, { opacity: 0, duration: 0.5, onComplete: () => {
            bannerContainer.innerHTML = `<div class="w-full text-center">${bannerMessages[currentMessageIndex]}</div>`;
            gsap.to(bannerContainer, { opacity: 1, duration: 0.5 });
            currentMessageIndex = (currentMessageIndex + 1) % bannerMessages.length;
            setTimeout(updateBannerMessage, 5000); // Change message every 5 seconds
        }});
    }

    updateBannerMessage();

    // Brand Logos Slider
    const brandLogosContainer = document.querySelector('.animate-marquee');
    const brandLogos = brandLogosContainer.innerHTML;
    brandLogosContainer.innerHTML = brandLogos + brandLogos; // Duplicate content for seamless loop

    // Instagram Posts Slider
    const instaSlider = document.querySelector('.instagram-slider .animate-slide');
    const instaPosts = instaSlider.innerHTML;
    instaSlider.innerHTML = instaPosts + instaPosts; // Duplicate content for seamless loop

    // Lazy loading for images and videos
    const lazyLoadElements = document.querySelectorAll('img[data-src], video[data-src]');
    const lazyLoadOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                element.src = element.dataset.src;
                element.removeAttribute('data-src');
                observer.unobserve(element);
            }
        });
    }, lazyLoadOptions);

    lazyLoadElements.forEach(element => lazyLoadObserver.observe(element));

    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Smooth reveal for services
    gsap.utils.toArray('.service-card').forEach((card, index) => {
        gsap.from(card, {
            opacity: 0,
            y: 50,
            duration: 0.8,
            delay: index * 0.2,
            scrollTrigger: {
                trigger: card,
                start: "top 80%"
            }
        });
    });

    // Instagram Reels horizontal scroll
    const reelsContainer = document.querySelector('.horizontal-scroll');
    let isDown = false;
    let startX;
    let scrollLeft;

    reelsContainer.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - reelsContainer.offsetLeft;
        scrollLeft = reelsContainer.scrollLeft;
    });

    reelsContainer.addEventListener('mouseleave', () => {
        isDown = false;
    });

    reelsContainer.addEventListener('mouseup', () => {
        isDown = false;
    });

    reelsContainer.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - reelsContainer.offsetLeft;
        const walk = (x - startX) * 2;
        reelsContainer.scrollLeft = scrollLeft - walk;
    });

    // Video playback optimization
    document.querySelectorAll('video').forEach(video => {
        video.addEventListener('canplay', () => {
            video.play();
        });

        video.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                video.pause();
            } else {
                video.play();
            }
        });
    });
});