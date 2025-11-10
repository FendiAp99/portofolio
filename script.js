// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
            
            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            
            const targetId = this.getAttribute('href').substring(1);
            const navLink = document.querySelector(`.nav-link[href="#${targetId}"]`);
            if (navLink) {
                navLink.classList.add('active');
            }
            
            // Close mobile menu
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// ===== MOBILE MENU TOGGLE =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-menu') && !e.target.closest('.hamburger')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// ===== TYPEWRITER EFFECT =====
const texts = [
    "FRESH GRADUATE",
    "JUNIOR WEB PROGRAMMER",
    "CONTENT CREATOR", 
    "UI/UX DESIGNER",
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const deletingSpeed = 50;
const delayBetweenTexts = 2000;
const typingElement = document.querySelector('.typing-text');

function typeWriter() {
    const currentText = texts[textIndex];
    
    if (!isDeleting) {
        // Typing
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        
        if (charIndex === currentText.length) {
            // Finished typing, wait before deleting
            isDeleting = true;
            setTimeout(typeWriter, delayBetweenTexts);
            return;
        }
    } else {
        // Deleting
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        
        if (charIndex === 0) {
            // Finished deleting, move to next text
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(typeWriter, 500);
            return;
        }
    }
    
    setTimeout(typeWriter, isDeleting ? deletingSpeed : typingSpeed);
}

// Start typewriter on load
window.addEventListener('load', () => {
    setTimeout(typeWriter, 1000);
});

// ===== ANIMATE SKILL BARS ON SCROLL =====
const animateSkillBars = () => {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.width = progress + '%';
    });
};

// Intersection Observer for skills section
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillBars();
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const skillsSection = document.getElementById('skills');
if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// ===== ACTIVE SECTION ON SCROLL =====
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// ===== NAVBAR SCROLL EFFECT (Add shadow on scroll) =====
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// ===== FADE IN ANIMATION FOR CARDS =====
const observeCards = () => {
    const cards = document.querySelectorAll('.card, .project-card, .contact-card, .cert-card');
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                cardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        cardObserver.observe(card);
    });
};

// Initialize card animations on load
window.addEventListener('load', observeCards);

// ===== PREVENT DEFAULT ANCHOR BEHAVIOR =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href === '#' || href === '') {
            e.preventDefault();
        }
    });
});

// ===== CONSOLE WELCOME MESSAGE =====
console.log('%c👋 Halo! Terima kasih telah mengunjungi portfolio saya!', 
    'color: #00f5ff; font-size: 20px; font-weight: bold;');
console.log('%c📧 Hubungi saya: fendiardyp99@gmail.com', 
    'color: #00ff88; font-size: 14px;');
console.log('%c💼 Siap bekerja dan berkembang bersama!', 
    'color: #7c3aed; font-size: 14px;');

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== SMOOTH PAGE LOAD =====
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});
