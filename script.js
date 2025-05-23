// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Navbar functionality
    const navbar = document.getElementById('navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    
    // Hamburger menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close menu when nav link is clicked
    navLinksItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active nav link based on scroll position
        updateActiveNavLink();
    });
    
    // Typewriter effect
    const typewriterText = document.getElementById('typewriter');
    const text = typewriterText.textContent;
    typewriterText.textContent = '';
    
    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            typewriterText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        } else {
            // Add blinking cursor effect after typing is complete
            typewriterText.style.borderRight = '2px solid var(--highlight-color)';
            setInterval(() => {
                typewriterText.style.borderRight = typewriterText.style.borderRight === 'none' ? 
                    '2px solid var(--highlight-color)' : 'none';
            }, 700);
        }
    }
    
    // Start typewriter effect after a short delay
    setTimeout(typeWriter, 1000);
    
    // Scroll reveal animations
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    
    function checkReveal() {
        const triggerBottom = window.innerHeight * 0.8;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const delay = element.getAttribute('data-delay') || 0;
            
            if (elementTop < triggerBottom) {
                setTimeout(() => {
                    element.classList.add('reveal-visible');
                }, delay);
            }
        });
    }
    
    // Initial check for elements in view
    checkReveal();
    
    // Check on scroll
    window.addEventListener('scroll', checkReveal);
    
    // Update active nav link based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 200)) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Leadership carousel functionality
    const carousel = document.querySelector('.carousel');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const visionCards = document.querySelectorAll('.vision-card');
    
    let cardIndex = 0;
    const cardWidth = 330; // Card width + gap
    
    prevBtn.addEventListener('click', () => {
        cardIndex = Math.max(0, cardIndex - 1);
        scrollCarousel();
    });
    
    nextBtn.addEventListener('click', () => {
        cardIndex = Math.min(visionCards.length - 1, cardIndex + 1);
        scrollCarousel();
    });
    
    function scrollCarousel() {
        carousel.scrollTo({
            left: cardIndex * cardWidth,
            behavior: 'smooth'
        });
    }
    
    // Gallery modal functionality
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.querySelector('.gallery-modal');
    const modalImg = document.getElementById('modal-image');
    const modalCaption = document.getElementById('modal-caption');
    const closeModal = document.querySelector('.close-modal');
    const modalPrev = document.querySelector('.modal-prev');
    const modalNext = document.querySelector('.modal-next');
    
    let currentImgIndex = 0;
    
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentImgIndex = index;
            openModal(item.querySelector('img').src, item.querySelector('.gallery-caption').textContent);
        });
    });
    
    function openModal(imgSrc, caption) {
        modal.style.display = 'block';
        modalImg.src = imgSrc;
        modalCaption.textContent = caption;
        
        // Disable body scroll when modal is open
        document.body.style.overflow = 'hidden';
    }
    
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        
        // Re-enable body scroll when modal is closed
        document.body.style.overflow = 'auto';
    });
    
    modalPrev.addEventListener('click', () => {
        currentImgIndex = (currentImgIndex - 1 + galleryItems.length) % galleryItems.length;
        modalImg.src = galleryItems[currentImgIndex].querySelector('img').src;
        modalCaption.textContent = galleryItems[currentImgIndex].querySelector('.gallery-caption').textContent;
    });
    
    modalNext.addEventListener('click', () => {
        currentImgIndex = (currentImgIndex + 1) % galleryItems.length;
        modalImg.src = galleryItems[currentImgIndex].querySelector('img').src;
        modalCaption.textContent = galleryItems[currentImgIndex].querySelector('.gallery-caption').textContent;
    });
    
    // Close modal when clicking outside the image
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Keyboard navigation for modal
    document.addEventListener('keydown', (e) => {
        if (modal.style.display === 'block') {
            if (e.key === 'Escape') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            } else if (e.key === 'ArrowLeft') {
                currentImgIndex = (currentImgIndex - 1 + galleryItems.length) % galleryItems.length;
                modalImg.src = galleryItems[currentImgIndex].querySelector('img').src;
                modalCaption.textContent = galleryItems[currentImgIndex].querySelector('.gallery-caption').textContent;
            } else if (e.key === 'ArrowRight') {
                currentImgIndex = (currentImgIndex + 1) % galleryItems.length;
                modalImg.src = galleryItems[currentImgIndex].querySelector('img').src;
                modalCaption.textContent = galleryItems[currentImgIndex].querySelector('.gallery-caption').textContent;
            }
        }
    });
});