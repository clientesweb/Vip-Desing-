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
const openReservationModal = document.getElementById('openReservationModal');
const closeReservationModal = document.getElementById('closeReservationModal');
const reservationModal =

 document.getElementById('reservationModal');
const reservationForm = document.getElementById('reservationForm');

openReservationModal.addEventListener('click', () => {
    reservationModal.classList.remove('hidden');
});

closeReservationModal.addEventListener('click', () => {
    reservationModal.classList.add('hidden');
});

reservationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(reservationForm);
    let message = "New Reservation:\n\n";
    for (let [key, value] of formData.entries()) {
        message += `${key}: ${value}\n`;
    }
    
    // Replace this URL with your actual WhatsApp API endpoint
    const whatsappUrl = `https://api.whatsapp.com/send?phone=971528231111&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    reservationModal.classList.add('hidden');
    reservationForm.reset();
});

// Close modal if clicking outside
reservationModal.addEventListener('click', (e) => {
    if (e.target === reservationModal) {
        reservationModal.classList.add('hidden');
    }
});

// Scroll to Top button
const scrollToTopBtn = document.getElementById('scrollToTopBtn');

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.remove('hidden');
    } else {
        scrollToTopBtn.classList.add('hidden');
    }
});

scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Contact form submission
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    let message = "New Contact Form Submission:\n\n";
    for (let [key, value] of formData.entries()) {
        message += `${key}: ${value}\n`;
    }
    
    // Replace this URL with your actual WhatsApp API endpoint
    const whatsappUrl = `https://api.whatsapp.com/send?phone=971528231111&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    contactForm.reset();
    alert('Thank you for your message. We will get back to you soon!');
});