// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Function to determine time-based theme
    function getTimeBasedTheme() {
        const hour = new Date().getHours();
        // Light mode from 6 AM (06:00) to 6 PM (18:00)
        // Dark mode from 6 PM (18:00) to 6 AM (06:00)
        const isLightTime = (hour >= 6 && hour < 18);
        console.log(`Current hour: ${hour}, Light mode: ${isLightTime}`);
        return isLightTime ? 'light' : 'dark';
    }
    
    // Check if this is a fresh page load using sessionStorage
    const sessionId = sessionStorage.getItem('sessionId');
    const isFreshLoad = !sessionId;
    
    // Generate new session ID if fresh load
    if (isFreshLoad) {
        sessionStorage.setItem('sessionId', Date.now().toString());
    }
    
    console.log('Page load detection:', { 
        isFreshLoad, 
        sessionId,
        referrer: document.referrer,
        navigationType: performance.navigation.type 
    });
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    const userPreference = localStorage.getItem('userThemePreference');
    let currentTheme;
    
    console.log('Theme initialization:', { savedTheme, userPreference, isFreshLoad });
    
    if (isFreshLoad) {
        // Fresh page load (new tab, bookmark, external link), use time-based theme
        currentTheme = getTimeBasedTheme();
        localStorage.setItem('theme', currentTheme);
        // Clear user preference for fresh loads
        localStorage.removeItem('userThemePreference');
        console.log('Fresh load detected, using time-based theme:', currentTheme);
    } else if (userPreference === 'true') {
        // User has set a preference and this is a refresh, use saved theme
        currentTheme = savedTheme || 'light';
        console.log('Using saved user preference (refresh):', currentTheme);
    } else {
        // No user preference, use time-based theme
        currentTheme = getTimeBasedTheme();
        localStorage.setItem('theme', currentTheme);
        console.log('No user preference, using time-based theme:', currentTheme);
    }
    
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    // Theme toggle click handler
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        console.log('Theme toggle clicked:', { currentTheme, newTheme });
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        localStorage.setItem('userThemePreference', 'true'); // Mark as user preference
        updateThemeIcon(newTheme);
    });
    
    // Update theme icon based on current theme
    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-sun';
            themeToggle.title = 'Switch to light mode';
        } else {
            themeIcon.className = 'fas fa-moon';
            themeToggle.title = 'Switch to dark mode';
        }
        console.log('Theme icon updated:', theme);
    }
    
    // Auto-switch theme based on time (every minute)
    setInterval(function() {
        const userPreference = localStorage.getItem('userThemePreference');
        // Only auto-switch if user hasn't explicitly set a preference
        if (userPreference !== 'true') {
            const timeBasedTheme = getTimeBasedTheme();
            const currentTheme = document.documentElement.getAttribute('data-theme');
            
            if (timeBasedTheme !== currentTheme) {
                console.log('Auto-switching theme:', { from: currentTheme, to: timeBasedTheme });
                document.documentElement.setAttribute('data-theme', timeBasedTheme);
                localStorage.setItem('theme', timeBasedTheme);
                updateThemeIcon(timeBasedTheme);
            }
        }
    }, 60000); // Check every minute
    
    // Mobile-specific: Ensure theme toggle is accessible
    if (window.innerWidth <= 768) {
        console.log('Mobile device detected, ensuring theme toggle accessibility');
        // Add touch-friendly styles if needed
        themeToggle.style.minHeight = '44px';
        themeToggle.style.minWidth = '44px';
    }
});

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Publication Filtering
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const publications = document.querySelectorAll('.publication');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter publications
            publications.forEach(pub => {
                if (filter === 'all' || pub.getAttribute('data-category') === filter) {
                    pub.style.display = 'flex';
                    pub.classList.add('fade-in-up');
                } else {
                    pub.style.display = 'none';
                    pub.classList.remove('fade-in-up');
                }
            });
        });
    });
});

// Scroll Animations
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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.research-area, .course, .stat, .contact-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });
});

// Active Navigation Highlight
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Header Background on Scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Typing Effect for Hero Section (Optional)
function typeWriter(element, text, speed = 100) {
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

// Initialize typing effect if desired
document.addEventListener('DOMContentLoaded', function() {
    const heroTitle = document.querySelector('.hero-text h1');
    if (heroTitle && heroTitle.textContent === 'Your Name') {
        // Uncomment the line below to enable typing effect
        // typeWriter(heroTitle, 'Your Name', 150);
    }
});

// Form Validation (if contact form is added later)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Copy Email to Clipboard
document.addEventListener('DOMContentLoaded', function() {
    const emailElement = document.querySelector('.contact-item p');
    if (emailElement && emailElement.textContent.includes('@')) {
        emailElement.style.cursor = 'pointer';
        emailElement.addEventListener('click', function() {
            const email = this.textContent;
            navigator.clipboard.writeText(email).then(() => {
                // Show a temporary tooltip or notification
                const originalText = this.textContent;
                this.textContent = 'Email copied!';
                setTimeout(() => {
                    this.textContent = originalText;
                }, 2000);
            });
        });
    }
});

// Lazy Loading for Images (if added later)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Print-friendly styles
function addPrintStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @media print {
            header, footer, .nav-toggle, .publications-filter, .social-links { display: none !important; }
            body { font-size: 12pt; }
            .hero { background: white !important; color: black !important; }
            .section-title::after { display: none; }
            .publication, .course, .research-area { break-inside: avoid; }
        }
    `;
    document.head.appendChild(style);
}

// Add print styles
addPrintStyles(); 