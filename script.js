// Smooth scrolling and navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Detect current theme based on stylesheet
    function getCurrentTheme() {
        const stylesheets = Array.from(document.styleSheets);
        for (let stylesheet of stylesheets) {
            try {
                const href = stylesheet.href || '';
                if (href.includes('styles-blue.css')) {
                    return 'dark'; // Blue theme uses dark background
                } else if (href.includes('styles-blue-light.css')) {
                    return 'light'; // Blue light theme uses light background
                } else if (href.includes('styles-light.css')) {
                    return 'light'; // Light theme uses light background
                } else if (href.includes('styles.css')) {
                    return 'light'; // Current styles.css is blue light theme
                }
            } catch (e) {
                // Skip stylesheets that can't be accessed due to CORS
                continue;
            }
        }
        return 'light'; // Default to light theme
    }

    const currentTheme = getCurrentTheme();
    
    // Handle scroll effects
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        
        // Ensure hero maintains white background on scroll
        const hero = document.querySelector('.hero');
        if (hero && currentTheme === 'light') {
            hero.style.backgroundColor = '#FFFFFF';
        }
        
        // Add background to navbar when scrolled (theme-aware)
        if (currentTheme === 'light') {
            // Light theme - use white background
            if (scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            }
        } else {
            // Dark theme (original or blue) - use dark background
            if (scrollY > 50) {
                navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            } else {
                navbar.style.background = 'rgba(10, 10, 10, 0.8)';
            }
        }
        
        // Update active navigation link
        updateActiveNavLink();
        
        // Trigger animations for elements in view
        animateOnScroll();
    });
    
    // Update active navigation link based on scroll position
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Only prevent default and handle smooth scrolling for internal anchor links
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 72; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
            // For external links (like qfort-gateway.html), let the browser handle navigation normally
        });
    });
    
    // CTA buttons scroll to contact section
    const ctaButtons = document.querySelectorAll('.cta-button, .hero-cta, .contact-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                const offsetTop = contactSection.offsetTop - 72;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animation on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.mv-card, .tech-pillar, .solution-card, .standard-card, .why-card');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('fade-in-up');
            }
        });
    }
    
    // Initial call to set up animations
    animateOnScroll();
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('.mv-card, .tech-pillar, .solution-card, .standard-card, .why-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add typing effect to hero title
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }
    
    // Apply typing effect to hero title after a delay
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            const originalText = heroTitle.textContent;
            typeWriter(heroTitle, originalText, 30);
        }
    }, 1000);
    
    // Add particle effect to hero background
    function createParticles() {
        const hero = document.querySelector('.hero');
        const particleCount = 50;
        
        // Set particle color based on theme
        const particleColor = currentTheme === 'light' 
            ? 'rgba(0, 102, 255, 0.3)'  // Blue for light themes
            : 'rgba(0, 229, 153, 0.3)'; // Green for dark themes
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: ${particleColor};
                border-radius: 50%;
                pointer-events: none;
                animation: float ${Math.random() * 10 + 5}s linear infinite;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation-delay: ${Math.random() * 5}s;
            `;
            hero.appendChild(particle);
        }
    }
    
    // Add CSS for particle animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% {
                transform: translateY(0px) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Initialize particles
    createParticles();
    
    // Add click effect to buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add CSS for ripple effect
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
    
    // Add parallax effect to hero background
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.grid-pattern');
        if (parallax) {
            const speed = scrolled * 0.5;
            parallax.style.transform = `translateY(${speed}px)`;
        }
    });
    
    // Add intersection observer for better performance
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe all cards and sections
    const animatedElements = document.querySelectorAll('.mv-card, .tech-pillar, .solution-card, .standard-card, .why-card, .section-header');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // Add mobile menu toggle (for future enhancement)
    function createMobileMenu() {
        const navbar = document.querySelector('.navbar .nav-content');
        const navLinks = document.querySelector('.nav-links');
        
        // Create mobile menu button
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = '☰';
        mobileMenuBtn.style.cssText = `
            display: none;
            background: none;
            border: none;
            color: #00E599;
            font-size: 24px;
            cursor: pointer;
            padding: 8px;
        `;
        
        // Add mobile menu styles
        const mobileStyle = document.createElement('style');
        mobileStyle.textContent = `
            @media (max-width: 768px) {
                .mobile-menu-btn {
                    display: block !important;
                }
                .nav-links {
                    display: none;
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background: rgba(255, 255, 255, 0.98);
                    flex-direction: column;
                    padding: 20px;
                    border-top: 1px solid #E5E7EB;
                }
                .nav-links.active {
                    display: flex;
                }
            }
        `;
        document.head.appendChild(mobileStyle);
        
        navbar.appendChild(mobileMenuBtn);
        
        // Toggle mobile menu
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    // Initialize mobile menu
    createMobileMenu();
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Add loading styles
    const loadingStyle = document.createElement('style');
    loadingStyle.textContent = `
        body:not(.loaded) {
            overflow: hidden;
        }
        body:not(.loaded) .hero-content {
            opacity: 0;
            transform: translateY(30px);
        }
        body.loaded .hero-content {
            animation: fadeInUp 0.8s ease-out;
        }
    `;
    document.head.appendChild(loadingStyle);
});