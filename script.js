// Preloader
window.addEventListener('load', function() {
    document.getElementById('preloader').style.display = 'none';
});

// Fade-in effect
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
});

document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));

// Banner messages
const bannerMessages = [
    "Welcome to VIP Design - Dubai's Premier Luxury Automobile Customization",
    "Experience the pinnacle of automotive luxury and innovation",
    "Transforming vehicles into masterpieces of design and comfort"
];

let currentBannerMessage = 0;

function rotateBannerMessage() {
    currentBannerMessage = (currentBannerMessage + 1) % bannerMessages.length;
    const bannerContainer = document.getElementById('banner-messages');
    bannerContainer.style.transform = 'translateY(-100%)';
    setTimeout(() => {
        bannerContainer.innerHTML = `<p class="text-center w-full">${bannerMessages[currentBannerMessage]}</p>`;
        bannerContainer.style.transform = 'translateY(0)';
    }, 500);
}

setInterval(rotateBannerMessage, 5000);
rotateBannerMessage();  // Initial call to display the first message

// Gallery filter
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        
        filterButtons.forEach(btn => btn.classList.remove('active', 'bg-primary', 'text-black'));
        button.classList.add('active', 'bg-primary', 'text-black');

        galleryItems.forEach(item => {
            if (filter === 'all' || item.classList.contains(filter)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Reservation Modal
const reservationBtn = document.getElementById('reservation-btn');
const closeModal = document.getElementById('close-modal');
const reservationModal = document.getElementById('reservation-modal');
const reservationForm = document.getElementById('reservation-form');

reservationBtn.addEventListener('click', () => {
    reservationModal.classList.remove('hidden');
});

closeModal.addEventListener('click', () => {
    reservationModal.classList.add('hidden');
});

reservationForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(reservationForm);
    
    try {
        const response = await fetch('https://formspree.io/f/your_formspree_id', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            alert('Reservation submitted successfully!');
            reservationForm.reset();
            reservationModal.classList.add('hidden');
        } else {
            throw new Error('Reservation submission failed');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('There was an error submitting your reservation. Please try again.');
    }
});

// Close modal if clicking outside
reservationModal.addEventListener('click', (e) => {
    if (e.target === reservationModal) {
        reservationModal.classList.add('hidden');
    }
});

// Back to Top Button
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
    } else {
        backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
    }
});

backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Contact form submission
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    
    try {
        const response = await fetch('https://formspree.io/f/your_formspree_id', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            alert('Thank you for your message. We will get back to you soon!');
            contactForm.reset();
        } else {
            throw new Error('Message submission failed');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('There was an error submitting your message. Please try again.');
    }
});

// Newsletter form submission
const newsletterForm = document.getElementById('newsletter-form');

newsletterForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(newsletterForm);
    
    try {
        const response = await fetch('https://formspree.io/f/your_formspree_id', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            alert('Thank you for subscribing to our newsletter!');
            newsletterForm.reset();
        } else {
            throw new Error('Newsletter subscription failed');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('There was an error subscribing to the newsletter. Please try again.');
    }
});

// FAQ toggle
function toggleFAQ(element) {
    const content = element.nextElementSibling;
    const icon = element.querySelector('i');
    content.classList.toggle('hidden');
    icon.classList.toggle('fa-chevron-down');
    icon.classList.toggle('fa-chevron-up');
}

// Initialize AOS (Animate on Scroll)
AOS.init({
    duration: 1000,
    once: true,
});

// Initialize Swiper for customer reviews
const swiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        640: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
    },
});