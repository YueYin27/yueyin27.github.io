document.addEventListener('DOMContentLoaded', function() {

    // --- Theme Management ---
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
    const themeIcon = themeToggle.querySelector('i');
    
        function setTheme(theme, isUserPreference = false) {
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
            if (isUserPreference) {
                localStorage.setItem('userThemePreference', 'true');
            }
            updateThemeIcon(theme);
        }

    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-sun';
            themeToggle.title = 'Switch to light mode';
        } else {
            themeIcon.className = 'fas fa-moon';
            themeToggle.title = 'Switch to dark mode';
        }
    }

        function getTimeBasedTheme() {
            const hour = new Date().getHours();
            const isLightTime = (hour >= 6 && hour < 18);
            return isLightTime ? 'light' : 'dark';
        }

        function initializeTheme() {
            const sessionId = sessionStorage.getItem('sessionId');
            if (!sessionId) {
                sessionStorage.setItem('sessionId', 'active');
                localStorage.removeItem('userThemePreference');
            }

            const userPreference = localStorage.getItem('userThemePreference');
            const savedTheme = localStorage.getItem('theme');
            let currentTheme = 'light';

            if (userPreference === 'true' && savedTheme) {
                currentTheme = savedTheme;
            } else {
                currentTheme = getTimeBasedTheme();
            }
            setTheme(currentTheme);
        }

        themeToggle.addEventListener('click', function() {
            const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            setTheme(newTheme, true);
        });
        
        initializeTheme();
    }

    // --- Language Management ---
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        const nameTooltip = document.querySelector('.profile-info p[data-tooltip-en]');
        const cursorTooltip = document.querySelector('.cursor-toggle[data-tooltip-en]');
        let currentLang = localStorage.getItem('lang') || 'en';

        function setLanguage(lang) {
            document.documentElement.setAttribute('data-lang', lang);
            localStorage.setItem('lang', lang);
            currentLang = lang;
            langToggle.title = lang === 'en' ? '切换到中文' : 'Switch to English';

            if (nameTooltip) nameTooltip.setAttribute('data-tooltip', nameTooltip.getAttribute(`data-tooltip-${lang}`));
            if (cursorTooltip) cursorTooltip.setAttribute('data-tooltip', cursorTooltip.getAttribute(`data-tooltip-${lang}`));
        }

        langToggle.addEventListener('click', function() {
            setLanguage(currentLang === 'en' ? 'zh' : 'en');
        });

        setLanguage(currentLang);
    }

    // --- Mobile Navigation ---
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    if(navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    
        document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    navToggle.classList.remove('active');
            navMenu.classList.remove('active');
                }
        });
    });
    }

    // --- Publication Filtering ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const publications = document.querySelectorAll('.publication');
    if (filterButtons.length > 0 && publications.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            publications.forEach(pub => {
                if (filter === 'all' || pub.getAttribute('data-category') === filter) {
                    pub.style.display = 'flex';
                } else {
                    pub.style.display = 'none';
                }
                });
            });
        });
    }
});

// --- Other Functionalities (Outside DOMContentLoaded) ---

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetElement = document.querySelector(this.getAttribute('href'));
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Active navigation link highlighting on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav .nav-menu a');

window.addEventListener('scroll', () => {
    let currentId = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 70) { // Offset for header
            currentId = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (currentId && link.getAttribute('href').includes(currentId)) {
            link.classList.add('active');
        }
    });
    // Default to home if no section is active
    if (!currentId && navLinks.length > 0) {
        navLinks[0].classList.add('active');
    }
});

// Header background on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (header) {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    }
});

// Print-friendly styles
function addPrintStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @media print {
            body { font-size: 12px; color: #000; }
            header, footer, .hero-buttons, .social-links, .publications-filter, .gallery-link, .theme-toggle, .cursor-toggle, .lang-toggle, .nav-toggle { display: none !important; }
            section { padding: 20px 0; }
            a { color: #000 !important; text-decoration: none !important; }
            .publication { page-break-inside: avoid; }
        }
    `;
    document.head.appendChild(style);
}
addPrintStyles();

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