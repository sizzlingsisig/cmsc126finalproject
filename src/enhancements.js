// Enhanced Visual Interactions for LeBron Fan Page
// This file adds new functionality without replacing existing JS

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all enhancements
    initScrollProgress();
    initParallaxEffects();
    initCounterAnimations();
    initHoverEffects();
    initTypewriterEffect();
    initImageLazyLoading();
    initSmoothAnimations();
});

// Scroll Progress Indicator
function initScrollProgress() {
    // Create scroll indicator
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    const scrollProgress = document.createElement('div');
    scrollProgress.className = 'scroll-progress';
    scrollIndicator.appendChild(scrollProgress);
    document.body.appendChild(scrollIndicator);
    
    // Update progress on scroll
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = scrollPercent + '%';
    });
}

// Parallax Effects for Hero Section
function initParallaxEffects() {
    const heroSection = document.getElementById('HeroBanner');
    if (!heroSection) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        heroSection.style.transform = `translateY(${rate}px)`;
    });
}

// Counter Animations for Stats
function initCounterAnimations() {
    const counters = [
        { selector: '.stat-card:nth-child(1) .font-bold', target: 27.2, suffix: '' },
        { selector: '.stat-card:nth-child(1) ul li:nth-child(2) .font-bold', target: 7.5, suffix: '' },
        { selector: '.stat-card:nth-child(1) ul li:nth-child(3) .font-bold', target: 7.3, suffix: '' }
    ];
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        observer.observe(statsSection);
    }
    
    function animateCounters() {
        counters.forEach(counter => {
            const element = document.querySelector(counter.selector);
            if (element) {
                animateCounter(element, 0, counter.target, 2000, counter.suffix);
            }
        });
    }
    
    function animateCounter(element, start, end, duration, suffix) {
        let startTime = null;
        
        function step(currentTime) {
            if (startTime === null) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const value = progress * (end - start) + start;
            element.textContent = value.toFixed(1) + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        }
        
        requestAnimationFrame(step);
    }
}

// Enhanced Hover Effects
function initHoverEffects() {
    // Add classes to existing elements for styling
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        if (section.querySelector('h2')) {
            const title = section.querySelector('h2').textContent.toLowerCase();
            if (title.includes('timeline')) {
                section.classList.add('timeline-section');
            } else if (title.includes('awards')) {
                section.classList.add('awards-section');
            } else if (title.includes('statistics')) {
                section.classList.add('stats-section');
            }
        }
    });
    
    // Add classes to cards
    document.querySelectorAll('[id^="nba"], [id^="mvp"], [id^="other"]').forEach(card => {
        card.classList.add('award-card');
    });
    
    document.querySelectorAll('[id^="career"]').forEach(card => {
        card.classList.add('stat-card');
    });
    
    // Add classes to timeline buttons and details
    document.querySelectorAll('button[onclick^="toggleDetail"]').forEach(btn => {
        btn.classList.add('timeline-button');
    });
    
    document.querySelectorAll('[id^="detail"]').forEach(detail => {
        detail.classList.add('timeline-detail');
    });
}

// Typewriter Effect for Hero Title
function initTypewriterEffect() {
    const heroTitle = document.querySelector('#HeroBanner h1');
    if (!heroTitle) return;
    
    const originalText = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let index = 0;
    function typeWriter() {
        if (index < originalText.length) {
            heroTitle.textContent += originalText.charAt(index);
            index++;
            setTimeout(typeWriter, 100);
        }
    }
    
    // Start typewriter effect after a short delay
    setTimeout(typeWriter, 1000);
}

// Lazy Loading for Images
function initImageLazyLoading() {
    const images = document.querySelectorAll('img[src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease-in-out';
                
                const newImg = new Image();
                newImg.onload = () => {
                    img.style.opacity = '1';
                };
                newImg.src = img.src;
                
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Smooth Animations on Scroll
function initSmoothAnimations() {
    const animateElements = document.querySelectorAll('.award-card, .stat-card, .timeline-detail');
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        animationObserver.observe(el);
    });
}

// Enhanced Timeline Interaction
function enhanceTimelineButtons() {
    const buttons = document.querySelectorAll('button[onclick^="toggleDetail"]');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.6)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.boxShadow = '';
        });
    });
}

// Add floating particles effect
function createFloatingParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
        overflow: hidden;
    `;
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(255, 215, 0, 0.6);
            border-radius: 50%;
            animation: float-${i} ${10 + Math.random() * 10}s linear infinite;
        `;
        
        // Create unique animation for each particle
        const keyframes = `
            @keyframes float-${i} {
                0% {
                    transform: translateY(100vh) translateX(${Math.random() * 100}vw) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(-10vh) translateX(${Math.random() * 100}vw) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        
        const style = document.createElement('style');
        style.textContent = keyframes;
        document.head.appendChild(style);
        
        particleContainer.appendChild(particle);
    }
    
    document.body.appendChild(particleContainer);
}

// Initialize particles on hero section
setTimeout(createFloatingParticles, 2000);

// Add golden glow effect to important elements
function addGoldenGlow() {
    const glowElements = document.querySelectorAll('h1, h2, .text-yellow-400');
    glowElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            el.style.textShadow = '0 0 20px rgba(255, 215, 0, 0.8)';
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.textShadow = '';
        });
    });
}

// Initialize golden glow
setTimeout(addGoldenGlow, 1000);