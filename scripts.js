/* ============================================
   Portfolio Scripts
   Author: Jeevan
   ============================================ */

// ============================================
// Projects Data (Editable Array)
// ============================================
// To add/edit projects, modify this array:
// - title: Project name
// - description: One-line blurb
// - tech: Array of technology tags
// - demoLink: Live/demo URL (or null)
// - codeLink: GitHub/source code URL (or null)

const projects = [
    {
        title: "Data Analytics Dashboard",
        description: "Interactive dashboard for visualizing sales trends and customer insights using Plotly and Pandas.",
        tech: ["Python", "Plotly", "Pandas", "Dash"],
        demoLink: "#",
        codeLink: "https://github.com/JeevaNN-pan"
    },
    {
        title: "ML Price Prediction Model",
        description: "Machine learning model for predicting house prices using PyTorch with automated deployment pipeline.",
        tech: ["PyTorch", "Scikit-learn", "FastAPI", "Docker"],
        demoLink: "#",
        codeLink: "https://github.com/JeevaNN-pan"
    },
    {
        title: "Web Scraper Suite",
        description: "Multi-site web scraping tool using BeautifulSoup and Scrapy with data extraction and API integration.",
        tech: ["Python", "BeautifulSoup", "Scrapy", "APIs"],
        demoLink: "#",
        codeLink: "https://github.com/JeevaNN-pan"
    }
];

// ============================================
// Utility: Check for Reduced Motion
// ============================================

function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
           document.body.classList.contains('reduce-motion');
}

// ============================================
// Particle System for Hero Background
// ============================================

function initParticles() {
    if (prefersReducedMotion()) return;
    
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const particles = [];
    const particleCount = 50;
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.2;
            const colors = ['rgba(79, 70, 229, ', 'rgba(6, 182, 212, ']; // indigo and cyan
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Wrap around edges
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color + this.opacity + ')';
            ctx.fill();
        }
    }
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw connections
        particles.forEach((particle, i) => {
            particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    ctx.beginPath();
                    const opacity = 0.2 * (1 - distance / 150);
                    ctx.strokeStyle = `rgba(79, 70, 229, ${opacity})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.stroke();
                }
            });
        });
        
        // Update and draw particles
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// ============================================
// Interactive Cursor Effect
// ============================================

function initCursorEffect() {
    if (prefersReducedMotion()) return;
    
    // Only enable on desktop devices
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        return;
    }
    
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid rgba(79, 70, 229, 0.8);
        border-radius: 50%;
        pointer-events: none;
        z-index: 99999;
        transition: transform 0.15s ease-out, border-color 0.2s ease, background 0.2s ease;
        transform: translate(-50%, -50%);
        display: none;
        background: rgba(79, 70, 229, 0.1);
        box-shadow: 0 0 10px rgba(79, 70, 229, 0.3);
    `;
    document.body.appendChild(cursor);
    document.body.classList.add('has-custom-cursor');
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let isAnimating = false;
    
    // Smooth animation loop
    function animateCursor() {
        if (!isAnimating) return;
        
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 0.5) {
            // Use faster smoothing for better responsiveness
            cursorX += dx * 0.15;
            cursorY += dy * 0.15;
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            requestAnimationFrame(animateCursor);
        } else {
            isAnimating = false;
        }
    }
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        if (!cursor.style.display || cursor.style.display === 'none') {
            cursor.style.display = 'block';
            cursorX = mouseX;
            cursorY = mouseY;
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
        }
        
        if (!isAnimating) {
            isAnimating = true;
            animateCursor();
        }
    });
    
    // Hide cursor when mouse leaves window
    document.addEventListener('mouseleave', () => {
        cursor.style.display = 'none';
        isAnimating = false;
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.display = 'block';
    });
    
    // Hover effects on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-tag, .tech-logo, .globe-control-btn');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.8)';
            cursor.style.borderColor = 'rgba(79, 70, 229, 1)';
            cursor.style.background = 'rgba(79, 70, 229, 0.2)';
            cursor.style.boxShadow = '0 0 20px rgba(79, 70, 229, 0.5)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.borderColor = 'rgba(79, 70, 229, 0.8)';
            cursor.style.background = 'rgba(79, 70, 229, 0.1)';
            cursor.style.boxShadow = '0 0 10px rgba(79, 70, 229, 0.3)';
        });
    });
    
    // Special handling for tools section elements
    const toolsSection = document.querySelector('.tools-section-wrapper');
    if (toolsSection) {
        toolsSection.addEventListener('mouseenter', () => {
            cursor.style.borderColor = 'rgba(6, 182, 212, 0.8)';
            cursor.style.background = 'rgba(6, 182, 212, 0.1)';
            cursor.style.boxShadow = '0 0 10px rgba(6, 182, 212, 0.3)';
        });
        
        toolsSection.addEventListener('mouseleave', () => {
            cursor.style.borderColor = 'rgba(79, 70, 229, 0.8)';
            cursor.style.background = 'rgba(79, 70, 229, 0.1)';
            cursor.style.boxShadow = '0 0 10px rgba(79, 70, 229, 0.3)';
        });
    }
}

// ============================================
// Navigation Scroll Highlighting
// ============================================

function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    const sections = document.querySelectorAll('section[id]');
    const navbar = document.getElementById('navbar');
    
    // Handle navbar scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
        
        // Highlight active section
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
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// Render Projects
// ============================================

function renderProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    
    if (!projectsGrid) return;
    
    projectsGrid.innerHTML = projects.map(project => {
        const demoLinkHTML = project.demoLink && project.demoLink !== '#' 
            ? `<a href="${project.demoLink}" target="_blank" rel="noopener noreferrer" class="project-link" aria-label="View ${project.title} demo">
                 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                   <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                   <polyline points="15 3 21 3 21 9"/>
                   <line x1="10" y1="14" x2="21" y2="3"/>
                 </svg>
                 Live Demo
               </a>`
            : '';
        
        const codeLinkHTML = project.codeLink && project.codeLink !== '#'
            ? `<a href="${project.codeLink}" target="_blank" rel="noopener noreferrer" class="project-link" aria-label="View ${project.title} source code">
                 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                   <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                 </svg>
                 Source Code
               </a>`
            : '';
        
        const techTagsHTML = project.tech.map(tech => 
            `<span class="tech-tag">${tech}</span>`
        ).join('');
        
        return `
            <article class="project-card" role="listitem" tabindex="0">
                <h3 class="project-title" data-project-title="${project.title}">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">${techTagsHTML}</div>
                <div class="project-links">
                    ${demoLinkHTML}
                    ${codeLinkHTML}
                </div>
            </article>
        `;
    }).join('');
    
    // Add entrance animations with staggered delays
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
        // Keyboard accessibility
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                const link = this.querySelector('.project-link');
                if (link) {
                    link.click();
                }
            }
        });
        
        // Enhanced 3D mouse tracking effect
        if (!prefersReducedMotion()) {
            card.addEventListener('mousemove', function(e) {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = ((y - centerY) / centerY) * -10;
                const rotateY = ((x - centerX) / centerX) * 10;
                
                card.style.transform = `
                    translateY(-25px) 
                    scale(1.08) 
                    rotateX(${rotateX}deg) 
                    rotateY(${rotateY}deg)
                `;
            });
            
            card.addEventListener('mouseleave', function() {
                card.style.transform = '';
            });
        }
        
        // Staggered entrance animation with more dynamic effect
        if (!prefersReducedMotion()) {
            setTimeout(() => {
                card.classList.add('animate-in');
                
                // Add particle burst on entrance
                if (typeof anime !== 'undefined') {
                    anime({
                        targets: card,
                        opacity: [0, 1],
                        scale: [0.8, 1],
                        translateY: [60, 0],
                        rotateX: [15, 0],
                        duration: 800,
                        delay: index * 150,
                        easing: 'easeOutElastic(1, .6)'
                    });
                }
            }, index * 150);
        } else {
            card.classList.add('animate-in');
        }
    });
    
    // Enhanced Intersection Observer for project cards with staggered animation
    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting && !entry.target.classList.contains('animate-in')) {
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                    
                    // Add extra visual feedback
                    if (!prefersReducedMotion() && typeof anime !== 'undefined') {
                        anime({
                            targets: entry.target,
                            opacity: [0, 1],
                            scale: [0.85, 1],
                            translateY: [50, 0],
                            rotateX: [10, 0],
                            duration: 800,
                            delay: index * 100,
                            easing: 'easeOutElastic(1, .6)'
                        });
                    }
                }, index * 100);
                
                projectObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    });
    
    projectCards.forEach(card => projectObserver.observe(card));
}

// ============================================
// Entrance Animations
// ============================================

function setupAnimations() {
    if (prefersReducedMotion()) {
        // Just show all elements without animation
        document.querySelectorAll('[data-animation]').forEach(el => {
            el.classList.add('animate-in');
        });
        return;
    }
    
    // Check if Anime.js is loaded
    if (typeof anime === 'undefined') {
        console.warn('Anime.js not loaded, using CSS animations');
        document.querySelectorAll('[data-animation]').forEach(el => {
            el.classList.add('animate-in');
        });
        return;
    }
    
    // Animate elements on scroll
    const animatedElements = document.querySelectorAll('[data-animation]');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animate-in')) {
                const delay = parseInt(entry.target.dataset.delay) || 0;
                const animationType = entry.target.dataset.animation || 'fade-up';
                
                if (animationType === 'fade-up') {
                    anime({
                        targets: entry.target,
                        opacity: [0, 1],
                        translateY: [30, 0],
                        duration: 800,
                        delay: delay,
                        easing: 'easeOutCubic'
                    });
                }
                
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(el => observer.observe(el));
    
    // Hero section special animation
    const heroName = document.querySelector('.hero-name');
    const heroTagline = document.querySelector('.hero-tagline');
    const heroButtons = document.querySelector('.hero-buttons');
    
    if (heroName && typeof anime !== 'undefined') {
        anime({
            targets: heroName,
            opacity: [0, 1],
            translateY: [50, 0],
            duration: 1000,
            easing: 'easeOutCubic'
        });
    }
    
    if (heroTagline && typeof anime !== 'undefined') {
        anime({
            targets: heroTagline,
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 800,
            delay: 200,
            easing: 'easeOutCubic'
        });
    }
    
    if (heroButtons && typeof anime !== 'undefined') {
        anime({
            targets: heroButtons,
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 800,
            delay: 400,
            easing: 'easeOutCubic'
        });
    }
    
    // Animate project cards on load
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        if (!prefersReducedMotion() && typeof anime !== 'undefined') {
            card.style.opacity = '0';
            anime({
                targets: card,
                opacity: [0, 1],
                translateY: [50, 0],
                duration: 600,
                delay: index * 100,
                easing: 'easeOutCubic'
            });
        }
    });
}

// ============================================
// Technology Stack Data
// ============================================

const techStack = {
    'Languages & Fundamentals': [
        { name: 'Python', icon: '🐍', color: '#3776AB', description: 'Versatile programming language for data science, web development, and automation. Known for its simplicity and powerful libraries.' },
        { name: 'C', icon: '⚙️', color: '#A8B9CC', description: 'Low-level systems programming language. Foundation for many modern languages, ideal for performance-critical applications.' },
        { name: 'JavaScript', icon: '📜', color: '#F7DF1E', description: 'Dynamic scripting language for web development. Powers interactive websites and modern web applications.' },
        { name: 'HTML5', icon: '🌐', color: '#E34F26', description: 'Modern markup language for structuring web content. Foundation of every web page with semantic elements.' },
        { name: 'LaTeX', icon: '📝', color: '#008080', description: 'Document preparation system for high-quality typesetting, especially for academic and technical documents.' }
    ],
    'Data Science & ML': [
        { name: 'Pandas', icon: '🐼', color: '#150458', description: 'Powerful data manipulation and analysis library for Python. Essential for data cleaning, transformation, and analysis.' },
        { name: 'NumPy', icon: '🔢', color: '#013243', description: 'Fundamental library for numerical computing in Python. Provides arrays and mathematical operations.' },
        { name: 'Matplotlib', icon: '📊', color: '#11557C', description: 'Comprehensive plotting library for creating static, animated, and interactive visualizations in Python.' },
        { name: 'Plotly', icon: '📈', color: '#3F4F75', description: 'Interactive graphing library for creating beautiful, publication-quality charts and dashboards.' },
        { name: 'PyTorch', icon: '🔥', color: '#EE4C2C', description: 'Deep learning framework with dynamic computation graphs. Popular for research and production ML models.' }
    ],
    'Databases & Backend': [
        { name: 'MySQL', icon: '🗄️', color: '#4479A1', description: 'Open-source relational database management system. Widely used for web applications and data storage.' },
        { name: 'Firebase', icon: '🔥', color: '#FFCA28', description: 'Google\'s platform for building apps with real-time database, authentication, and cloud services.' }
    ],
    'Tools & Platforms': [
        { name: 'Git', icon: '📦', color: '#F05032', description: 'Distributed version control system for tracking changes in code. Essential for collaborative development.' },
        { name: 'GitHub', icon: '🐙', color: '#181717', description: 'Code hosting platform for version control and collaboration. The world\'s largest open-source community.' },
        { name: 'Docker', icon: '🐳', color: '#2496ED', description: 'Containerization platform for packaging and running applications in isolated environments.' },
        { name: 'Selenium', icon: '🤖', color: '#43B02A', description: 'Automation framework for web browsers. Used for testing and web scraping tasks.' }
    ],
    'Frameworks & Deployment': [
        { name: 'Streamlit', icon: '⚡', color: '#FF4B4B', description: 'Python framework for building interactive data science web apps quickly with minimal code.' },
        { name: 'Vercel', icon: '▲', color: '#000000', description: 'Deployment platform optimized for frontend frameworks and static sites with global CDN.' },
        { name: 'Netlify', icon: '🌐', color: '#00C7B7', description: 'All-in-one platform for deploying modern web projects with continuous deployment and edge functions.' },
        { name: 'WordPress', icon: '📝', color: '#21759B', description: 'Content management system powering millions of websites. Flexible and extensible platform.' }
    ],
    'Design Tools': [
        { name: 'Figma', icon: '🎨', color: '#F24E1E', description: 'Collaborative interface design tool. Industry standard for UI/UX design with real-time collaboration.' },
        { name: 'Canva', icon: '✨', color: '#00C4CC', description: 'Easy-to-use graphic design platform for creating visual content without design expertise.' }
    ]
};

// ============================================
// Create 3D Globe with Technologies
// ============================================

function createTechGlobe() {
    const globe = document.getElementById('tech-globe');
    if (!globe) return;

    const allTechs = [];
    Object.values(techStack).forEach(category => {
        allTechs.push(...category);
    });

    // Clear existing logos
    globe.innerHTML = '';

    // Create tooltip element
    let tooltip = document.getElementById('tech-tooltip');
    if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.id = 'tech-tooltip';
        tooltip.className = 'tech-tooltip';
        tooltip.style.cssText = `
            position: fixed;
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 14px;
            pointer-events: none;
            z-index: 10000;
            opacity: 0;
            transform: translate(-50%, -100%) scale(0.8);
            transition: opacity 0.2s ease, transform 0.2s ease;
            white-space: nowrap;
        `;
        document.body.appendChild(tooltip);
    }

    // Wait for container to be sized
    const createGlobeItems = () => {
        // Clear existing items
        globe.innerHTML = '';

        const radius = Math.min(globe.offsetWidth || 800, globe.offsetHeight || 500) * 0.35;
        const centerX = (globe.offsetWidth || 800) / 2;
        const centerY = (globe.offsetHeight || 500) / 2;

        // Convert techs array to spherical coordinates
        allTechs.forEach((tech, index) => {
            const totalItems = allTechs.length;
            const phi = Math.acos(-1 + (2 * index) / totalItems); // Vertical angle
            const theta = Math.sqrt(totalItems * Math.PI) * phi; // Horizontal angle

            // Convert to Cartesian coordinates
            const x = radius * Math.cos(theta) * Math.sin(phi);
            const y = radius * Math.sin(theta) * Math.sin(phi);
            const z = radius * Math.cos(phi);

            // Create tech logo element
            const techLogo = document.createElement('div');
            techLogo.className = 'tech-logo';
            techLogo.setAttribute('data-tech', tech.name);
            techLogo.style.left = `${centerX + x - 30}px`;
            techLogo.style.top = `${centerY + y - 30}px`;
            techLogo.style.transform = `translateZ(${z}px)`;
            techLogo.style.setProperty('--tech-color', tech.color);

            techLogo.innerHTML = `
                <span class="tech-logo-icon">${tech.icon}</span>
                <span class="tech-logo-name">${tech.name}</span>
            `;

            // Add pulsing animation
            if (!prefersReducedMotion() && typeof anime !== 'undefined') {
                anime({
                    targets: techLogo,
                    scale: [1, 1.1, 1],
                    opacity: [0.7, 1, 0.7],
                    duration: 3000 + Math.random() * 2000,
                    delay: index * 100,
                    easing: 'easeInOutSine',
                    loop: true
                });
            }

            // Add hover tooltip
            techLogo.addEventListener('mouseenter', function(e) {
                if (prefersReducedMotion()) return;
                tooltip.textContent = `${tech.icon} ${tech.name}`;
                tooltip.style.left = e.pageX + 'px';
                tooltip.style.top = (e.pageY - 10) + 'px';
                tooltip.style.opacity = '1';
                tooltip.style.transform = 'translate(-50%, -100%) scale(1)';

                // Particle effects
                for (let i = 0; i < 8; i++) {
                    createParticle(e.target);
                }
            });

            techLogo.addEventListener('mousemove', function(e) {
                tooltip.style.left = e.pageX + 'px';
                tooltip.style.top = (e.pageY - 10) + 'px';
            });

            techLogo.addEventListener('mouseleave', function() {
                tooltip.style.opacity = '0';
                tooltip.style.transform = 'translate(-50%, -100%) scale(0.8)';
            });

            // Add click/touch event to show description
            techLogo.addEventListener('click', function(e) {
                e.stopPropagation();
                showTechDescription(tech);
                if (!prefersReducedMotion()) {
                    for (let i = 0; i < 15; i++) {
                        createParticle(e.target, true);
                    }
                }
            });

            // Add touch event for mobile
            techLogo.addEventListener('touchend', function(e) {
                e.preventDefault();
                e.stopPropagation();
                showTechDescription(tech);
                if (!prefersReducedMotion()) {
                    for (let i = 0; i < 15; i++) {
                        createParticle(e.target, true);
                    }
                }
            });

            globe.appendChild(techLogo);
        });
    };

    // Initialize
    if (document.readyState === 'complete') {
        createGlobeItems();
    } else {
        window.addEventListener('load', createGlobeItems);
    }

    // Recreate on resize with debounce
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(createGlobeItems, 250);
    });

    // Enable auto-rotation with particle trails
    globe.classList.add('rotating');

    // Mouse interaction for manual rotation
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;

    globe.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        globe.classList.remove('rotating');
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;

        currentRotationY += deltaX * 0.5;
        currentRotationX -= deltaY * 0.5;

        globe.style.transform = `rotateY(${currentRotationY}deg) rotateX(${currentRotationX}deg)`;

        startX = e.clientX;
        startY = e.clientY;

        // Add particle trail on drag
        if (!prefersReducedMotion()) {
            createParticle({ getBoundingClientRect: () => ({ left: e.clientX, top: e.clientY, width: 0, height: 0 }) });
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        // Resume auto-rotation after a delay
        setTimeout(() => {
            if (!isDragging) {
                globe.classList.add('rotating');
                currentRotationX = 0;
                currentRotationY = 0;
                globe.style.transform = '';
            }
        }, 2000);
    });

    // Touch support for mobile
    globe.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        globe.classList.remove('rotating');
    });

    globe.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const deltaX = e.touches[0].clientX - startX;
        const deltaY = e.touches[0].clientY - startY;

        currentRotationY += deltaX * 0.5;
        currentRotationX -= deltaY * 0.5;

        globe.style.transform = `rotateY(${currentRotationY}deg) rotateX(${currentRotationX}deg)`;

        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;

        // Add particle trail on touch drag
        if (!prefersReducedMotion()) {
            createParticle({ getBoundingClientRect: () => ({ left: e.touches[0].clientX, top: e.touches[0].clientY, width: 0, height: 0 }) });
        }
    });

    globe.addEventListener('touchend', () => {
        isDragging = false;
        setTimeout(() => {
            if (!isDragging) {
                globe.classList.add('rotating');
                currentRotationX = 0;
                currentRotationY = 0;
                globe.style.transform = '';
            }
        }, 2000);
    });
}

// ============================================
// Skills Section Background Animation with Anime.js
// ============================================

function initSkillsBackgroundAnimation() {
    if (prefersReducedMotion()) return;
    if (typeof anime === 'undefined') return;
    
    const bgContainer = document.getElementById('skills-bg-animation');
    if (!bgContainer) return;
    
    const section = document.querySelector('.skills-section');
    if (!section) return;
    
    // Create animated shapes
    const shapeCount = 15;
    const shapes = [];
    
    for (let i = 0; i < shapeCount; i++) {
        const shape = document.createElement('div');
        const shapeTypes = ['circle', 'square'];
        const shapeType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
        shape.className = `skills-animated-shape ${shapeType}`;
        
        // Random size
        const size = Math.random() * 200 + 100;
        shape.style.width = size + 'px';
        shape.style.height = size + 'px';
        
        // Random colors
        const colors = [
            'rgba(79, 70, 229, 0.15)',
            'rgba(6, 182, 212, 0.15)',
            'rgba(79, 70, 229, 0.1)',
            'rgba(6, 182, 212, 0.1)'
        ];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        if (shapeType === 'circle' || shapeType === 'square') {
            shape.style.background = randomColor;
        }
        
        // Random starting position
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        shape.style.left = startX + '%';
        shape.style.top = startY + '%';
        
        bgContainer.appendChild(shape);
        shapes.push(shape);
    }
    
    // Animate each shape with anime.js
    shapes.forEach((shape, index) => {
        const duration = 15000 + Math.random() * 10000; // 15-25 seconds
        const delay = index * 200;
        
        // Create floating animation
        anime({
            targets: shape,
            translateX: [
                { value: Math.random() * 200 - 100, duration: duration * 0.5 },
                { value: Math.random() * 200 - 100, duration: duration * 0.5 }
            ],
            translateY: [
                { value: Math.random() * 200 - 100, duration: duration * 0.5 },
                { value: Math.random() * 200 - 100, duration: duration * 0.5 }
            ],
            scale: [
                { value: [1, 1.3], duration: duration * 0.3 },
                { value: [1.3, 0.8], duration: duration * 0.3 },
                { value: [0.8, 1], duration: duration * 0.4 }
            ],
            opacity: [
                { value: [0.1, 0.2], duration: duration * 0.3 },
                { value: [0.2, 0.15], duration: duration * 0.4 },
                { value: [0.15, 0.1], duration: duration * 0.3 }
            ],
            rotate: [
                { value: [0, 180], duration: duration * 0.5 },
                { value: [180, 360], duration: duration * 0.5 }
            ],
            delay: delay,
            easing: 'easeInOutSine',
            loop: true,
            direction: 'alternate'
        });
    });
    
    // Add pulsating background effect
    anime({
        targets: bgContainer,
        opacity: [
            { value: [0.3, 0.6], duration: 4000 },
            { value: [0.6, 0.3], duration: 4000 }
        ],
        easing: 'easeInOutSine',
        loop: true
    });
}

// ============================================
// Video Background Animation with Anime.js
// ============================================

function initVideoBackgroundAnimation() {
    if (prefersReducedMotion()) return;
    if (typeof anime === 'undefined') return;
    
    const videoBg = document.getElementById('video-bg-animation');
    if (!videoBg) return;
    
    const section = document.querySelector('.skills-section');
    if (!section) return;
    
    // Create animated particle streams
    const particleStreamCount = 8;
    const particleStreams = [];
    
    for (let i = 0; i < particleStreamCount; i++) {
        const stream = document.createElement('div');
        stream.className = 'video-particle-stream';
        stream.style.left = (i * 12.5) + '%';
        videoBg.appendChild(stream);
        
        // Create particles in each stream
        const particleCount = 5 + Math.floor(Math.random() * 5);
        for (let j = 0; j < particleCount; j++) {
            const particle = document.createElement('div');
            particle.className = 'video-particle';
            particle.style.width = (2 + Math.random() * 4) + 'px';
            particle.style.height = particle.style.width;
            particle.style.background = Math.random() > 0.5 ? 'rgba(79, 70, 229, 0.8)' : 'rgba(6, 182, 212, 0.8)';
            particle.style.borderRadius = '50%';
            particle.style.position = 'absolute';
            particle.style.left = (Math.random() * 20 - 10) + 'px';
            particle.style.top = '100%';
            stream.appendChild(particle);
            
            // Animate particle flow
            anime({
                targets: particle,
                translateY: ['100%', '-100%'],
                opacity: [0, 1, 0],
                duration: 3000 + Math.random() * 2000,
                delay: j * 200 + Math.random() * 1000,
                easing: 'easeInOutQuad',
                loop: true
            });
        }
        
        particleStreams.push(stream);
    }
    
    // Create morphing geometric shapes
    const shapeCount = 6;
    const shapes = [];
    
    for (let i = 0; i < shapeCount; i++) {
        const shape = document.createElement('div');
        shape.className = 'video-morphing-shape';
        shape.style.position = 'absolute';
        shape.style.width = (50 + Math.random() * 100) + 'px';
        shape.style.height = shape.style.width;
        shape.style.left = Math.random() * 80 + '%';
        shape.style.top = Math.random() * 80 + '%';
        shape.style.background = 'linear-gradient(45deg, rgba(79, 70, 229, 0.3), rgba(6, 182, 212, 0.3))';
        shape.style.borderRadius = Math.random() > 0.5 ? '50%' : '0%';
        videoBg.appendChild(shape);
        shapes.push(shape);
    }
    
    // Animate morphing shapes
    shapes.forEach((shape, index) => {
        anime({
            targets: shape,
            translateX: [
                { value: Math.random() * 200 - 100, duration: 8000 },
                { value: Math.random() * 200 - 100, duration: 8000 }
            ],
            translateY: [
                { value: Math.random() * 200 - 100, duration: 6000 },
                { value: Math.random() * 200 - 100, duration: 6000 }
            ],
            scale: [
                { value: [1, 1.5], duration: 4000 },
                { value: [1.5, 0.8], duration: 4000 },
                { value: [0.8, 1.2], duration: 4000 }
            ],
            rotate: [
                { value: [0, 360], duration: 10000 }
            ],
            borderRadius: [
                { value: ['50%', '0%'], duration: 5000 },
                { value: ['0%', '50%'], duration: 5000 }
            ],
            opacity: [
                { value: [0.3, 0.6], duration: 3000 },
                { value: [0.6, 0.2], duration: 3000 },
                { value: [0.2, 0.5], duration: 3000 }
            ],
            delay: index * 500,
            easing: 'easeInOutSine',
            loop: true,
            direction: 'alternate'
        });
    });
    
    // Create color-shifting gradients
    const gradientCount = 3;
    for (let i = 0; i < gradientCount; i++) {
        const gradient = document.createElement('div');
        gradient.className = 'video-gradient-overlay';
        gradient.style.position = 'absolute';
        gradient.style.width = '100%';
        gradient.style.height = '100%';
        gradient.style.background = 'radial-gradient(circle at ' + Math.random() * 100 + '% ' + Math.random() * 100 + '%, rgba(79, 70, 229, 0.1) 0%, transparent 70%)';
        gradient.style.pointerEvents = 'none';
        videoBg.appendChild(gradient);
        
        anime({
            targets: gradient,
            background: [
                'radial-gradient(circle at ' + Math.random() * 100 + '% ' + Math.random() * 100 + '%, rgba(79, 70, 229, 0.1) 0%, transparent 70%)',
                'radial-gradient(circle at ' + Math.random() * 100 + '% ' + Math.random() * 100 + '%, rgba(6, 182, 212, 0.1) 0%, transparent 70%)',
                'radial-gradient(circle at ' + Math.random() * 100 + '% ' + Math.random() * 100 + '%, rgba(79, 70, 229, 0.05) 0%, transparent 70%)'
            ],
            duration: 8000 + Math.random() * 4000,
            easing: 'easeInOutSine',
            loop: true,
            delay: i * 2000
        });
    }
    
    // Add flowing wave patterns
    const waveCount = 4;
    for (let i = 0; i < waveCount; i++) {
        const wave = document.createElement('div');
        wave.className = 'video-flowing-wave';
        wave.style.position = 'absolute';
        wave.style.width = '200%';
        wave.style.height = '2px';
        wave.style.background = 'linear-gradient(90deg, transparent, rgba(79, 70, 229, 0.4), transparent)';
        wave.style.left = '-100%';
        wave.style.top = (20 + i * 20) + '%';
        wave.style.transform = 'rotate(' + (Math.random() * 10 - 5) + 'deg)';
        videoBg.appendChild(wave);
        
        anime({
            targets: wave,
            translateX: ['-100%', '100%'],
            opacity: [0, 1, 0],
            duration: 6000 + Math.random() * 3000,
            delay: i * 1500,
            easing: 'easeInOutQuad',
            loop: true
        });
    }
    
    // Create data stream effect
    const dataStreamCount = 5;
    for (let i = 0; i < dataStreamCount; i++) {
        const stream = document.createElement('div');
        stream.className = 'video-data-stream';
        stream.style.position = 'absolute';
        stream.style.width = '1px';
        stream.style.height = '100%';
        stream.style.background = 'linear-gradient(to bottom, transparent, rgba(6, 182, 212, 0.6), transparent)';
        stream.style.left = (15 + i * 15) + '%';
        stream.style.top = '0';
        videoBg.appendChild(stream);
        
        anime({
            targets: stream,
            opacity: [0, 1, 0],
            scaleY: [0, 1, 0],
            duration: 4000 + Math.random() * 2000,
            delay: i * 800,
            easing: 'easeInOutCubic',
            loop: true
        });
    }
}

// ============================================
// Tools Section Background Animation with Anime.js
// ============================================

function initToolsBackgroundAnimation() {
    if (prefersReducedMotion()) return;
    if (typeof anime === 'undefined') return;
    
    const bgContainer = document.getElementById('tools-bg-animation');
    const canvas = document.getElementById('tools-particles-canvas');
    if (!bgContainer || !canvas) return;
    
    const wrapper = document.querySelector('.tools-section-wrapper');
    if (!wrapper) return;
    
    // Set canvas size
    const resizeCanvas = () => {
        const rect = wrapper.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particle system for canvas
    const ctx = canvas.getContext('2d');
    const particles = [];
    const particleCount = 30;
    
    class ToolParticle {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2 + 1;
            this.opacity = Math.random() * 0.3 + 0.2;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            
            // Keep particles within bounds
            this.x = Math.max(0, Math.min(canvas.width, this.x));
            this.y = Math.max(0, Math.min(canvas.height, this.y));
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(79, 70, 229, ${this.opacity})`;
            ctx.fill();
        }
    }
    
    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new ToolParticle());
    }
    
    // Draw connections between particles
    function drawConnections() {
        particles.forEach((particle, i) => {
            particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    ctx.beginPath();
                    const opacity = 0.15 * (1 - distance / 150);
                    ctx.strokeStyle = `rgba(6, 182, 212, ${opacity})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.stroke();
                }
            });
        });
    }
    
    // Animation loop for particles
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        drawConnections();
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        requestAnimationFrame(animateParticles);
    }
    animateParticles();
    
    // Create animated shapes with anime.js
    const shapeCount = 12;
    const shapes = [];
    
    for (let i = 0; i < shapeCount; i++) {
        const shape = document.createElement('div');
        const shapeTypes = ['circle', 'square'];
        const shapeType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
        shape.className = `tools-animated-shape ${shapeType}`;
        
        // Random size
        const size = Math.random() * 250 + 150;
        shape.style.width = size + 'px';
        shape.style.height = size + 'px';
        
        // Random colors
        const colors = [
            'rgba(79, 70, 229, 0.2)',
            'rgba(6, 182, 212, 0.2)',
            'rgba(79, 70, 229, 0.15)',
            'rgba(6, 182, 212, 0.15)',
            'rgba(79, 70, 229, 0.12)',
            'rgba(6, 182, 212, 0.12)'
        ];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        if (shapeType === 'circle' || shapeType === 'square') {
            shape.style.background = randomColor;
        }
        
        // Random starting position
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        shape.style.left = startX + '%';
        shape.style.top = startY + '%';
        
        bgContainer.appendChild(shape);
        shapes.push(shape);
    }
    
    // Animate each shape with anime.js
    shapes.forEach((shape, index) => {
        const duration = 12000 + Math.random() * 8000; // 12-20 seconds
        const delay = index * 150;
        
        // Create complex floating animation
        anime({
            targets: shape,
            translateX: [
                { value: Math.random() * 300 - 150, duration: duration * 0.4 },
                { value: Math.random() * 300 - 150, duration: duration * 0.3 },
                { value: Math.random() * 300 - 150, duration: duration * 0.3 }
            ],
            translateY: [
                { value: Math.random() * 300 - 150, duration: duration * 0.4 },
                { value: Math.random() * 300 - 150, duration: duration * 0.3 },
                { value: Math.random() * 300 - 150, duration: duration * 0.3 }
            ],
            scale: [
                { value: [0.5, 1.5], duration: duration * 0.3 },
                { value: [1.5, 0.8], duration: duration * 0.35 },
                { value: [0.8, 1.2], duration: duration * 0.35 }
            ],
            opacity: [
                { value: [0.1, 0.3], duration: duration * 0.3 },
                { value: [0.3, 0.2], duration: duration * 0.4 },
                { value: [0.2, 0.25], duration: duration * 0.3 }
            ],
            rotate: [
                { value: [0, 180], duration: duration * 0.5 },
                { value: [180, 360], duration: duration * 0.5 }
            ],
            delay: delay,
            easing: 'easeInOutSine',
            loop: true,
            direction: 'alternate'
        });
    });
    
    // Add pulsating background effect
    anime({
        targets: bgContainer,
        opacity: [
            { value: [0.4, 0.8], duration: 5000 },
            { value: [0.8, 0.4], duration: 5000 }
        ],
        easing: 'easeInOutSine',
        loop: true
    });
    
    // Add rotating gradient animation
    anime({
        targets: bgContainer,
        backgroundPosition: [
            { value: ['0% 0%', '100% 100%'], duration: 20000 },
            { value: ['100% 100%', '0% 0%'], duration: 20000 }
        ],
        easing: 'easeInOutSine',
        loop: true
    });
    
    // Create wave animations
    const wavesContainer = document.getElementById('tools-waves-container');
    if (wavesContainer) {
        const wave1 = document.createElement('div');
        wave1.className = 'tools-wave tools-wave-1';
        wavesContainer.appendChild(wave1);
        
        const wave2 = document.createElement('div');
        wave2.className = 'tools-wave tools-wave-2';
        wavesContainer.appendChild(wave2);
        
        const wave3 = document.createElement('div');
        wave3.className = 'tools-wave tools-wave-3';
        wavesContainer.appendChild(wave3);
        
        // Animate waves with anime.js for extra effects
        [wave1, wave2, wave3].forEach((wave, index) => {
            anime({
                targets: wave,
                opacity: [
                    { value: [0.3, 0.6], duration: 4000 },
                    { value: [0.6, 0.3], duration: 4000 }
                ],
                scaleX: [
                    { value: [1, 1.2], duration: 5000 },
                    { value: [1.2, 1], duration: 5000 }
                ],
                easing: 'easeInOutSine',
                loop: true,
                delay: index * 1000
            });
        });
    }
    
    // Create glowing orbs
    const orb1 = document.createElement('div');
    orb1.className = 'tools-glow-orb orb-1';
    orb1.style.left = '15%';
    orb1.style.top = '20%';
    bgContainer.appendChild(orb1);
    
    const orb2 = document.createElement('div');
    orb2.className = 'tools-glow-orb orb-2';
    orb2.style.right = '20%';
    orb2.style.bottom = '25%';
    bgContainer.appendChild(orb2);
    
    // Animate glowing orbs
    anime({
        targets: [orb1, orb2],
        opacity: [
            { value: [0, 0.6], duration: 3000 },
            { value: [0.6, 0.2], duration: 3000 },
            { value: [0.2, 0.6], duration: 3000 }
        ],
        scale: [
            { value: [0.8, 1.3], duration: 4000 },
            { value: [1.3, 0.9], duration: 4000 },
            { value: [0.9, 1.2], duration: 4000 }
        ],
        translateX: [
            { value: [0, 50], duration: 6000 },
            { value: [50, -30], duration: 6000 },
            { value: [-30, 0], duration: 6000 }
        ],
        translateY: [
            { value: [0, -40], duration: 5000 },
            { value: [-40, 30], duration: 5000 },
            { value: [30, 0], duration: 5000 }
        ],
        easing: 'easeInOutSine',
        loop: true,
        delay: (target, index) => index * 1000
    });
    
    // Create ripple effects
    const ripplesContainer = document.getElementById('tools-ripples-container');
    if (ripplesContainer) {
        function createRipple(x, y, isCyan = false) {
            const ripple = document.createElement('div');
            ripple.className = `tools-ripple ${isCyan ? 'cyan' : ''}`;
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.width = '0px';
            ripple.style.height = '0px';
            ripplesContainer.appendChild(ripple);
            
            anime({
                targets: ripple,
                width: ['0px', '400px'],
                height: ['0px', '400px'],
                opacity: [
                    { value: [0.6, 0.4], duration: 1000 },
                    { value: [0.4, 0], duration: 1000 }
                ],
                easing: 'easeOutCubic',
                duration: 2000,
                complete: () => ripple.remove()
            });
        }
        
        // Create periodic ripples
        setInterval(() => {
            const rect = wrapper.getBoundingClientRect();
            const x = Math.random() * rect.width;
            const y = Math.random() * rect.height;
            createRipple(x, y, Math.random() > 0.5);
        }, 3000);
        
        // Create initial ripples
        setTimeout(() => {
            const rect = wrapper.getBoundingClientRect();
            for (let i = 0; i < 3; i++) {
                setTimeout(() => {
                    const x = rect.width * (0.2 + Math.random() * 0.6);
                    const y = rect.height * (0.2 + Math.random() * 0.6);
                    createRipple(x, y, i % 2 === 0);
                }, i * 500);
            }
        }, 1000);
    }
    
    // Create light beams
    const lightBeamCount = 4;
    for (let i = 0; i < lightBeamCount; i++) {
        const beam = document.createElement('div');
        beam.className = 'tools-light-beam';
        beam.style.left = (25 + i * 20) + '%';
        beam.style.transform = `rotate(${Math.random() * 10 - 5}deg)`;
        bgContainer.appendChild(beam);
        
        const delay = i * 2000;
        anime({
            targets: beam,
            opacity: [
                { value: [0, 0.4], duration: 2000 },
                { value: [0.4, 0], duration: 2000 }
            ],
            translateX: [
                { value: [0, 20], duration: 4000 },
                { value: [20, 0], duration: 4000 }
            ],
            easing: 'easeInOutSine',
            loop: true,
            delay: delay
        });
    }
    
    // Create floating lines
    const lineCount = 6;
    for (let i = 0; i < lineCount; i++) {
        const line = document.createElement('div');
        line.className = 'tools-floating-line';
        const width = Math.random() * 200 + 100;
        line.style.width = width + 'px';
        line.style.left = Math.random() * 80 + '%';
        line.style.top = Math.random() * 80 + '%';
        line.style.transform = `rotate(${Math.random() * 360}deg)`;
        bgContainer.appendChild(line);
        
        anime({
            targets: line,
            opacity: [
                { value: [0, 0.5], duration: 2000 },
                { value: [0.5, 0], duration: 2000 }
            ],
            translateX: [
                { value: [0, Math.random() * 200 - 100], duration: 8000 },
                { value: [Math.random() * 200 - 100, 0], duration: 8000 }
            ],
            translateY: [
                { value: [0, Math.random() * 200 - 100], duration: 8000 },
                { value: [Math.random() * 200 - 100, 0], duration: 8000 }
            ],
            rotate: [
                { value: [0, 360], duration: 15000 }
            ],
            easing: 'easeInOutSine',
            loop: true,
            delay: i * 500
        });
    }
}

// ============================================
// Tech Description Modal
// ============================================

function showTechDescription(tech) {
    const modal = document.getElementById('tech-modal');
    const modalIcon = document.getElementById('tech-modal-icon');
    const modalTitle = document.getElementById('tech-modal-title');
    const modalDescription = document.getElementById('tech-modal-description');
    
    if (!modal || !tech) return;
    
    // Set modal content
    if (modalIcon) modalIcon.textContent = tech.icon;
    if (modalTitle) modalTitle.textContent = tech.name;
    if (modalDescription) modalDescription.textContent = tech.description || 'No description available.';
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Prevent globe rotation when modal is open
    const globe = document.getElementById('tech-globe');
    if (globe) {
        globe.classList.remove('rotating');
    }
}

function hideTechDescription() {
    const modal = document.getElementById('tech-modal');
    if (!modal) return;
    
    modal.classList.remove('active');
    document.body.style.overflow = '';
    
    // Resume globe rotation if it was active
    const rotateBtn = document.getElementById('globe-rotate-btn');
    const globe = document.getElementById('tech-globe');
    if (rotateBtn && rotateBtn.classList.contains('active') && globe) {
        globe.classList.add('rotating');
    }
}

function setupTechModal() {
    const modal = document.getElementById('tech-modal');
    const closeBtn = modal?.querySelector('.tech-modal-close');
    const overlay = modal?.querySelector('.tech-modal-overlay');
    
    if (!modal) return;
    
    // Close on button click
    if (closeBtn) {
        closeBtn.addEventListener('click', hideTechDescription);
    }
    
    // Close on overlay click
    if (overlay) {
        overlay.addEventListener('click', hideTechDescription);
    }
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            hideTechDescription();
        }
    });
}

// ============================================
// Globe Controls
// ============================================

function setupGlobeControls() {
    const rotateBtn = document.getElementById('globe-rotate-btn');
    const globe = document.getElementById('tech-globe');
    const controlIcon = rotateBtn?.querySelector('.control-icon');
    const controlText = rotateBtn?.querySelector('.control-text');
    
    if (!rotateBtn || !globe) return;
    
    let isRotating = true;
    rotateBtn.classList.add('active');
    
    rotateBtn.addEventListener('click', (e) => {
        e.preventDefault();
        isRotating = !isRotating;
        
        if (isRotating) {
            globe.classList.add('rotating');
            rotateBtn.classList.add('active');
            if (controlIcon) controlIcon.textContent = '⏸️';
            if (controlText) controlText.textContent = 'Pause';
        } else {
            globe.classList.remove('rotating');
            rotateBtn.classList.remove('active');
            if (controlIcon) controlIcon.textContent = '▶️';
            if (controlText) controlText.textContent = 'Explore';
        }
        
        // Add a fun pulse effect on toggle
        rotateBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            rotateBtn.style.transform = '';
        }, 150);
        
        // Create burst particles on click
        if (!prefersReducedMotion()) {
            for (let i = 0; i < 10; i++) {
                createParticle(e.target, true);
            }
        }
    });
    
    // Add interactive hover effect - particles on hover
    rotateBtn.addEventListener('mouseenter', function(e) {
        if (prefersReducedMotion()) return;
        for (let i = 0; i < 6; i++) {
            createParticle(e.target, false);
        }
    });
}

// ============================================
// Skill Tags Interaction with Particle Effects
// ============================================

function setupSkillInteractions() {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function(e) {
            if (prefersReducedMotion()) return;
            
            // Create floating particles
            for (let i = 0; i < 5; i++) {
                createParticle(e.target);
            }
        });
        
        tag.addEventListener('click', function(e) {
            if (prefersReducedMotion()) return;
            
            // Create burst effect on click
            for (let i = 0; i < 10; i++) {
                createParticle(e.target, true);
            }
        });
    });
}

function createParticle(element, burst = false) {
    const particle = document.createElement('div');
    const colors = ['#4F46E5', '#06B6D4']; // indigo and cyan
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    particle.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: ${randomColor};
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        opacity: 0.8;
    `;
    
    const rect = element.getBoundingClientRect();
    const startX = rect.left + rect.width / 2;
    const startY = rect.top + rect.height / 2;
    
    const angle = burst ? (Math.random() * Math.PI * 2) : (Math.random() * Math.PI * 2 - Math.PI);
    const velocity = burst ? (Math.random() * 5 + 3) : (Math.random() * 3 + 1);
    const distance = burst ? (Math.random() * 100 + 50) : (Math.random() * 50 + 20);
    
    particle.style.left = startX + 'px';
    particle.style.top = startY + 'px';
    
    document.body.appendChild(particle);
    
    if (typeof anime !== 'undefined') {
        anime({
            targets: particle,
            translateX: Math.cos(angle) * distance,
            translateY: Math.sin(angle) * distance,
            opacity: [0.8, 0],
            scale: [1, 0],
            duration: 800,
            easing: 'easeOutCubic',
            complete: () => particle.remove()
        });
    } else {
        // Fallback animation
        let frame = 0;
        const animate = () => {
            frame++;
            const progress = frame / 40;
            if (progress < 1) {
                particle.style.transform = `translate(${Math.cos(angle) * distance * progress}px, ${Math.sin(angle) * distance * progress}px) scale(${1 - progress})`;
                particle.style.opacity = 0.8 * (1 - progress);
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        };
        animate();
    }
}

// ============================================
// Smooth Scroll for CTA Buttons
// ============================================

function setupCTAButtons() {
    const ctaButtons = document.querySelectorAll('.btn');
    
    ctaButtons.forEach(button => {
        if (button.getAttribute('href') && button.getAttribute('href').startsWith('#')) {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = button.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        }
    });
}

// ============================================
// Video-like Background Effects with Anime.js
// ============================================

function initVideoLikeBackgroundEffects() {
    if (prefersReducedMotion()) return;
    if (typeof anime === 'undefined') return;

    const skillsSection = document.querySelector('.skills-section');
    if (!skillsSection) return;

    // Create video-like particle streams
    const particleStreamCount = 12;
    const particleStreams = [];

    for (let i = 0; i < particleStreamCount; i++) {
        const stream = document.createElement('div');
        stream.className = 'video-particle-stream';
        stream.style.left = (i * 8.33) + '%';
        stream.style.height = '100%';
        stream.style.position = 'absolute';
        stream.style.width = '1px';
        stream.style.background = 'linear-gradient(to bottom, transparent, rgba(79, 70, 229, 0.6), transparent)';
        stream.style.opacity = '0';
        skillsSection.appendChild(stream);

        // Create particles in each stream
        const particleCount = 8 + Math.floor(Math.random() * 4);
        for (let j = 0; j < particleCount; j++) {
            const particle = document.createElement('div');
            particle.className = 'video-particle';
            particle.style.width = (1 + Math.random() * 3) + 'px';
            particle.style.height = particle.style.width;
            particle.style.background = Math.random() > 0.5 ? 'rgba(79, 70, 229, 0.9)' : 'rgba(6, 182, 212, 0.9)';
            particle.style.borderRadius = '50%';
            particle.style.position = 'absolute';
            particle.style.left = '-2px';
            particle.style.top = '100%';
            particle.style.boxShadow = '0 0 6px currentColor';
            stream.appendChild(particle);

            // Animate particle flow
            anime({
                targets: particle,
                translateY: ['100%', '-100%'],
                opacity: [0, 1, 0],
                duration: 4000 + Math.random() * 3000,
                delay: j * 300 + Math.random() * 1000,
                easing: 'easeInOutQuad',
                loop: true
            });
        }

        particleStreams.push(stream);
    }

    // Animate streams with staggered opacity
    particleStreams.forEach((stream, index) => {
        anime({
            targets: stream,
            opacity: [0, 0.8, 0],
            duration: 6000,
            delay: index * 200,
            easing: 'easeInOutSine',
            loop: true
        });
    });

    // Create morphing geometric shapes
    const shapeCount = 8;
    const shapes = [];

    for (let i = 0; i < shapeCount; i++) {
        const shape = document.createElement('div');
        shape.className = 'video-morphing-shape';
        shape.style.position = 'absolute';
        shape.style.width = (60 + Math.random() * 120) + 'px';
        shape.style.height = shape.style.width;
        shape.style.left = Math.random() * 80 + '%';
        shape.style.top = Math.random() * 80 + '%';
        shape.style.background = 'linear-gradient(45deg, rgba(79, 70, 229, 0.4), rgba(6, 182, 212, 0.4))';
        shape.style.borderRadius = Math.random() > 0.5 ? '50%' : '0%';
        shape.style.opacity = '0';
        skillsSection.appendChild(shape);
        shapes.push(shape);
    }

    // Animate morphing shapes
    shapes.forEach((shape, index) => {
        anime({
            targets: shape,
            translateX: [
                { value: Math.random() * 300 - 150, duration: 10000 },
                { value: Math.random() * 300 - 150, duration: 10000 }
            ],
            translateY: [
                { value: Math.random() * 300 - 150, duration: 8000 },
                { value: Math.random() * 300 - 150, duration: 8000 }
            ],
            scale: [
                { value: [0.5, 1.8], duration: 6000 },
                { value: [1.8, 0.3], duration: 6000 },
                { value: [0.3, 1.5], duration: 6000 }
            ],
            rotate: [
                { value: [0, 360], duration: 12000 }
            ],
            borderRadius: [
                { value: ['50%', '0%'], duration: 6000 },
                { value: ['0%', '50%'], duration: 6000 }
            ],
            opacity: [
                { value: [0, 0.6], duration: 3000 },
                { value: [0.6, 0.2], duration: 4000 },
                { value: [0.2, 0.8], duration: 3000 }
            ],
            delay: index * 600,
            easing: 'easeInOutSine',
            loop: true,
            direction: 'alternate'
        });
    });

    // Create color-shifting gradients
    const gradientCount = 5;
    for (let i = 0; i < gradientCount; i++) {
        const gradient = document.createElement('div');
        gradient.className = 'video-gradient-overlay';
        gradient.style.position = 'absolute';
        gradient.style.width = '100%';
        gradient.style.height = '100%';
        gradient.style.background = 'radial-gradient(circle at ' + Math.random() * 100 + '% ' + Math.random() * 100 + '%, rgba(79, 70, 229, 0.15) 0%, transparent 80%)';
        gradient.style.pointerEvents = 'none';
        gradient.style.opacity = '0';
        skillsSection.appendChild(gradient);

        anime({
            targets: gradient,
            background: [
                'radial-gradient(circle at ' + Math.random() * 100 + '% ' + Math.random() * 100 + '%, rgba(79, 70, 229, 0.15) 0%, transparent 80%)',
                'radial-gradient(circle at ' + Math.random() * 100 + '% ' + Math.random() * 100 + '%, rgba(6, 182, 212, 0.15) 0%, transparent 80%)',
                'radial-gradient(circle at ' + Math.random() * 100 + '% ' + Math.random() * 100 + '%, rgba(79, 70, 229, 0.08) 0%, transparent 80%)'
            ],
            opacity: [0, 0.8, 0],
            duration: 10000 + Math.random() * 5000,
            easing: 'easeInOutSine',
            loop: true,
            delay: i * 2000
        });
    }

    // Create flowing wave patterns
    const waveCount = 6;
    for (let i = 0; i < waveCount; i++) {
        const wave = document.createElement('div');
        wave.className = 'video-flowing-wave';
        wave.style.position = 'absolute';
        wave.style.width = '150%';
        wave.style.height = '3px';
        wave.style.background = 'linear-gradient(90deg, transparent, rgba(79, 70, 229, 0.5), transparent)';
        wave.style.left = '-50%';
        wave.style.top = (15 + i * 15) + '%';
        wave.style.transform = 'rotate(' + (Math.random() * 15 - 7.5) + 'deg)';
        wave.style.opacity = '0';
        skillsSection.appendChild(wave);

        anime({
            targets: wave,
            translateX: ['-50%', '50%'],
            opacity: [0, 1, 0],
            duration: 8000 + Math.random() * 4000,
            delay: i * 2000,
            easing: 'easeInOutQuad',
            loop: true
        });
    }

    // Create data stream effect
    const dataStreamCount = 8;
    for (let i = 0; i < dataStreamCount; i++) {
        const stream = document.createElement('div');
        stream.className = 'video-data-stream';
        stream.style.position = 'absolute';
        stream.style.width = '2px';
        stream.style.height = '100%';
        stream.style.background = 'linear-gradient(to bottom, transparent, rgba(6, 182, 212, 0.7), transparent)';
        stream.style.left = (12.5 * i) + '%';
        stream.style.top = '0';
        stream.style.opacity = '0';
        skillsSection.appendChild(stream);

        anime({
            targets: stream,
            opacity: [0, 1, 0],
            scaleY: [0, 1, 0],
            duration: 5000 + Math.random() * 3000,
            delay: i * 1000,
            easing: 'easeInOutCubic',
            loop: true
        });
    }

    // Create electric-like sparks
    const sparkCount = 4;
    for (let i = 0; i < sparkCount; i++) {
        const spark = document.createElement('div');
        spark.className = 'video-electric-spark';
        spark.style.position = 'absolute';
        spark.style.width = '1px';
        spark.style.height = '20px';
        spark.style.background = 'linear-gradient(to bottom, rgba(79, 70, 229, 0.8), transparent)';
        spark.style.left = Math.random() * 90 + '%';
        spark.style.top = Math.random() * 90 + '%';
        spark.style.opacity = '0';
        skillsSection.appendChild(spark);

        anime({
            targets: spark,
            opacity: [0, 1, 0],
            scaleY: [0, 1, 0],
            translateY: [0, -50, 0],
            duration: 2000 + Math.random() * 1000,
            delay: i * 1500 + Math.random() * 1000,
            easing: 'easeInOutCubic',
            loop: true
        });
    }

    // Create holographic grid effect
    const grid = document.createElement('div');
    grid.className = 'video-holographic-grid';
    grid.style.position = 'absolute';
    grid.style.width = '100%';
    grid.style.height = '100%';
    grid.style.backgroundImage = `
        linear-gradient(rgba(79, 70, 229, 0.1) 1px, transparent 1px),
        linear-gradient(90deg, rgba(79, 70, 229, 0.1) 1px, transparent 1px)
    `;
    grid.style.backgroundSize = '50px 50px';
    grid.style.opacity = '0';
    skillsSection.appendChild(grid);

    anime({
        targets: grid,
        opacity: [0, 0.3, 0],
        backgroundPosition: ['0px 0px', '50px 50px'],
        duration: 15000,
        easing: 'linear',
        loop: true
    });

    // Create dynamic code matrix rain effect
    const matrixRainCount = 8;
    for (let i = 0; i < matrixRainCount; i++) {
        const rainColumn = document.createElement('div');
        rainColumn.className = 'matrix-rain-column';
        rainColumn.style.left = (i * 12.5) + '%';
        rainColumn.style.position = 'absolute';
        rainColumn.style.top = '0';
        rainColumn.style.width = '1px';
        rainColumn.style.height = '100%';
        rainColumn.style.opacity = '0';
        skillsSection.appendChild(rainColumn);

        // Create falling characters
        const charCount = 15 + Math.floor(Math.random() * 10);
        for (let j = 0; j < charCount; j++) {
            const char = document.createElement('div');
            char.className = 'matrix-char';
            char.textContent = String.fromCharCode(33 + Math.floor(Math.random() * 94)); // Random ASCII chars
            char.style.position = 'absolute';
            char.style.left = '0';
            char.style.top = (j * 6) + '%';
            char.style.color = Math.random() > 0.5 ? 'rgba(79, 70, 229, 0.8)' : 'rgba(6, 182, 212, 0.8)';
            char.style.fontSize = '10px';
            char.style.fontFamily = 'monospace';
            char.style.opacity = '0';
            rainColumn.appendChild(char);

            anime({
                targets: char,
                opacity: [0, 1, 0],
                translateY: ['-100%', '100%'],
                duration: 3000 + Math.random() * 2000,
                delay: j * 200 + Math.random() * 1000,
                easing: 'linear',
                loop: true
            });
        }

        anime({
            targets: rainColumn,
            opacity: [0, 0.6, 0],
            duration: 8000,
            delay: i * 1000,
            easing: 'easeInOutSine',
            loop: true
        });
    }

    // Create advanced particle vortex effect
    const vortexContainer = document.createElement('div');
    vortexContainer.className = 'particle-vortex';
    vortexContainer.style.position = 'absolute';
    vortexContainer.style.width = '100%';
    vortexContainer.style.height = '100%';
    vortexContainer.style.pointerEvents = 'none';
    skillsSection.appendChild(vortexContainer);

    const vortexParticleCount = 20;
    for (let i = 0; i < vortexParticleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'vortex-particle';
        particle.style.position = 'absolute';
        particle.style.width = '3px';
        particle.style.height = '3px';
        particle.style.background = Math.random() > 0.5 ? 'rgba(79, 70, 229, 0.9)' : 'rgba(6, 182, 212, 0.9)';
        particle.style.borderRadius = '50%';
        particle.style.left = '50%';
        particle.style.top = '50%';
        particle.style.opacity = '0';
        vortexContainer.appendChild(particle);

        // Create spiral motion
        const angle = (i / vortexParticleCount) * Math.PI * 2;
        const radius = 50 + Math.random() * 150;
        const speed = 8000 + Math.random() * 4000;

        anime({
            targets: particle,
            opacity: [0, 1, 0],
            translateX: [
                { value: Math.cos(angle) * radius, duration: speed },
                { value: Math.cos(angle + Math.PI * 4) * (radius * 0.3), duration: speed }
            ],
            translateY: [
                { value: Math.sin(angle) * radius, duration: speed },
                { value: Math.sin(angle + Math.PI * 4) * (radius * 0.3), duration: speed }
            ],
            scale: [
                { value: [0.5, 2, 0.5], duration: speed }
            ],
            delay: i * 200,
            easing: 'easeInOutSine',
            loop: true
        });
    }
}

// ============================================
// Initialize Everything
// ============================================

// ============================================
// Colorize Headings with Alternating Colors
// ============================================

function colorizeHeading(element) {
    if (!element) return;
    
    const text = element.textContent.trim();
    const colors = ['#4F46E5', '#06B6D4']; // indigo and cyan
    const coloredHTML = text.split('').map((char, index) => {
        if (char === ' ') {
            return '<span class="letter" style="width: 0.3em; display: inline-block;"></span>';
        }
        const colorIndex = index % colors.length;
        const color = colors[colorIndex];
        return `<span class="letter" style="color: ${color};">${char}</span>`;
    }).join('');
    
    element.innerHTML = coloredHTML;
    element.setAttribute('data-text', text);
}

function setupColoredHeadings() {
    const colors = ['#4F46E5', '#06B6D4']; // indigo and cyan
    
    // Colorize hero name
    const heroName = document.querySelector('.hero-name');
    if (heroName) {
        colorizeHeading(heroName);
    }
    
    // Colorize all section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        // Skip if it already has colored letters or special content (like fire icon)
        if (title.querySelector('.fire-icon')) {
            // Handle titles with icons separately
            const textNode = Array.from(title.childNodes).find(node => node.nodeType === Node.TEXT_NODE);
            if (textNode) {
                const text = textNode.textContent.trim();
                const coloredHTML = text.split('').map((char, index) => {
                    if (char === ' ') {
                        return '<span class="letter" style="width: 0.3em; display: inline-block;"></span>';
                    }
                    const colorIndex = index % colors.length;
                    const color = colors[colorIndex];
                    return `<span class="letter" style="color: ${color};">${char}</span>`;
                }).join('');
                
                const icon = title.querySelector('.fire-icon');
                title.innerHTML = '';
                if (icon) title.appendChild(icon);
                title.insertAdjacentHTML('beforeend', coloredHTML);
                title.setAttribute('data-text', text);
            }
        } else {
            colorizeHeading(title);
        }
    });
    
    // Colorize skill category titles
    const skillCategoryTitles = document.querySelectorAll('.skill-category-title');
    skillCategoryTitles.forEach(title => {
        if (!title.querySelector('.letter')) {
            const text = title.textContent.trim();
            const coloredHTML = text.split('').map((char, index) => {
                if (char === ' ') {
                    return '<span class="letter" style="width: 0.3em; display: inline-block;"></span>';
                }
                const colorIndex = index % colors.length;
                const color = colors[colorIndex];
                return `<span class="letter" style="color: ${color};">${char}</span>`;
            }).join('');
            title.innerHTML = coloredHTML;
        }
    });
}

function init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
        return;
    }
    
    // Setup all features
    setupNavigation();
    renderProjects();
    setupAnimations();
    setupSkillInteractions();
    setupCTAButtons();
    initParticles();
    initCursorEffect();
    createTechGlobe();
    setupGlobeControls();
    setupColoredHeadings();
    setupTechModal();
    initVideoBackgroundAnimation();
    initToolsBackgroundAnimation();
    initVideoLikeBackgroundEffects();
    initSkillsBackgroundAnimation();

    // Add class to body to indicate JS is loaded
    document.body.classList.add('js-loaded');
    
    console.log('Portfolio initialized successfully!');
    console.log(`Loaded ${projects.length} projects`);
    console.log('Tech globe created with', Object.values(techStack).flat().length, 'technologies');
}

// Start initialization
init();

// ============================================
// Export for external use (if needed)
// ============================================

// To disable animations globally, add 'reduce-motion' class to body:
// document.body.classList.add('reduce-motion');

