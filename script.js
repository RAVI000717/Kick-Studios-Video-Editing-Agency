// Use strict mode for better performance
'use strict';

// Portfolio Items Data
const portfolioData = [
    {
        title: 'Gaming Channel Highlights',
        description: 'Professional gaming montage with dynamic effects',
        category: 'youtube',
        image: 'https://images.unsplash.com/photo-1535016120720-40c646be5580'
    },
    {
        title: 'Corporate Training Series',
        description: 'Professional training videos for enterprise',
        category: 'corporate',
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3'
    },
    {
        title: 'Instagram Stories Collection',
        description: 'Engaging social media content',
        category: 'social',
        image: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0'
    },
    {
        title: 'Wedding Highlights Reel',
        description: 'Beautiful wedding ceremony coverage',
        category: 'wedding',
        image: 'https://images.unsplash.com/photo-1519741497674-611481863552'
    }
];

// Load Portfolio Items
function loadPortfolio() {
    const portfolioGrid = document.querySelector('.portfolio-grid');
    if (!portfolioGrid) return;

    try {
        // Clear existing items
        portfolioGrid.innerHTML = '';
        
        portfolioData.forEach(item => {
            const portfolioItem = document.createElement('div');
            portfolioItem.className = 'portfolio-item';
            portfolioItem.setAttribute('data-category', item.category);
            
            portfolioItem.innerHTML = `
                <div class="portfolio-image">
                    <img src="${item.image}" alt="${item.title}" loading="lazy">
                    <div class="portfolio-overlay">
                        <h3>${item.title}</h3>
                        <p>${item.description}</p>
                        <a href="#" class="portfolio-link" data-video="${item.category}"><i class="fas fa-play-circle"></i></a>
                    </div>
                </div>
            `;

            portfolioGrid.appendChild(portfolioItem);
        });

        // Show all items initially
        filterPortfolio('all');
    } catch (error) {
        console.error('Error loading portfolio:', error);
    }
}

// Filter Portfolio Items
function filterPortfolio(category) {
    const items = document.querySelectorAll('.portfolio-item');
    
    items.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (category === 'all' || category === itemCategory) {
            item.style.display = 'block';
            setTimeout(() => item.classList.add('fade-in'), 10);
        } else {
            item.style.display = 'none';
            item.classList.remove('fade-in');
        }
    });
}

// Testimonials Data
const testimonials = [
    {
        name: 'John Doe',
        role: 'YouTuber',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
        text: 'The video editing service transformed my content. My engagement rates have doubled since working with them!'
    },
    {
        name: 'Sarah Smith',
        role: 'Marketing Director',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
        text: 'Professional, punctual, and perfect execution. Exactly what we needed for our corporate videos.'
    }
];

// Load Testimonials
function loadTestimonials() {
    const testimonialSlider = document.querySelector('.testimonials-slider');
    if (!testimonialSlider) return;

    try {
        testimonials.forEach(testimonial => {
            const testimonialItem = document.createElement('div');
            testimonialItem.className = 'testimonial-item fade-in';
            
            const img = new Image();
            img.src = testimonial.image;
            img.alt = testimonial.name;
            img.loading = 'lazy';
            
            img.onerror = () => {
                img.src = 'placeholder.jpg'; // Add a placeholder image for failed loads
            };

            testimonialItem.innerHTML = `
                <img src="${testimonial.image}" alt="${testimonial.name}">
                <p class="testimonial-text">${testimonial.text}</p>
                <h4>${testimonial.name}</h4>
                <p class="role">${testimonial.role}</p>
            `;
            testimonialSlider.appendChild(testimonialItem);
        });
    } catch (error) {
        console.error('Error loading testimonials:', error);
    }
}

// Mobile Navigation
function initMobileNav() {
    const navLinks = document.querySelector('.nav-links');
    
    if (!navLinks) return;
    
    hamburger.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.style.display = 'none';
            hamburger.classList.remove('active');
        }
    });
}

// Navbar Functionality
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const header = document.querySelector('.header');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Add scrolled class to header when scrolling
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Update active link based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Active link on scroll
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Smooth Scrolling
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                const navLinks = document.querySelector('.nav-links');
                if (navLinks) {
                    navLinks.style.display = 'none';
                    hamburger.classList.remove('active');
                }
            }
        });
    });
}

// Form Validation
function validateForm(formData) {
    const errors = [];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!formData.get('name').trim()) {
        errors.push('Name is required');
    }
    
    if (!emailRegex.test(formData.get('email'))) {
        errors.push('Please enter a valid email address');
    }
    
    if (!formData.get('message').trim()) {
        errors.push('Message is required');
    }
    
    return errors;
}

// Form Submission
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const errors = validateForm(formData);
        
        if (errors.length > 0) {
            alert(errors.join('\n'));
            return;
        }

        const submitButton = form.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            alert('Thank you for your message! We will get back to you soon.');
            form.reset();
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('There was an error sending your message. Please try again.');
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
        }
    });
}

// Scroll to Top Button
function initScrollToTop() {
    const scrollButton = document.createElement('button');
    scrollButton.className = 'scroll-to-top';
    scrollButton.innerHTML = '↑';
    document.body.appendChild(scrollButton);

    window.addEventListener('scroll', () => {
        scrollButton.style.display = window.scrollY > 500 ? 'block' : 'none';
    });

    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Stats Counter Animation
const counters = document.querySelectorAll('.counter');
const speed = 200;

const animateCounter = (counter) => {
    const target = +counter.getAttribute('data-target');
    let count = 0;
    
    const updateCount = () => {
        const increment = target / speed;
        if (count < target) {
            count += increment;
            counter.innerText = Math.ceil(count);
            setTimeout(updateCount, 1);
        } else {
            counter.innerText = target;
        }
    };
    
    updateCount();
};

// Start counter animation when element is in viewport
const startCounterOnScroll = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    });

    counters.forEach(counter => observer.observe(counter));
};

// Testimonial Slider
const testimonialSlides = document.querySelectorAll('.testimonial');
const prevBtn = document.querySelector('.prev-testimonial');
const nextBtn = document.querySelector('.next-testimonial');
let currentTestimonial = 0;

const showTestimonial = (index) => {
    testimonialSlides.forEach(testimonial => {
        testimonial.classList.remove('active');
    });
    
    testimonialSlides[index].classList.add('active');
};

const nextTestimonial = () => {
    currentTestimonial = (currentTestimonial + 1) % testimonialSlides.length;
    showTestimonial(currentTestimonial);
};

const prevTestimonial = () => {
    currentTestimonial = (currentTestimonial - 1 + testimonialSlides.length) % testimonialSlides.length;
    showTestimonial(currentTestimonial);
};

// Auto-advance testimonials
let testimonialInterval = setInterval(nextTestimonial, 5000);

// Pause auto-advance on hover
const testimonialSlider = document.querySelector('.testimonial-slider');
testimonialSlider.addEventListener('mouseenter', () => {
    clearInterval(testimonialInterval);
});

testimonialSlider.addEventListener('mouseleave', () => {
    testimonialInterval = setInterval(nextTestimonial, 5000);
});

// Button click handlers
prevBtn.addEventListener('click', () => {
    prevTestimonial();
    clearInterval(testimonialInterval);
});

nextBtn.addEventListener('click', () => {
    nextTestimonial();
    clearInterval(testimonialInterval);
});

// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    try {
        loadPortfolio();
        loadTestimonials();
        initMobileNav();
        initSmoothScroll();
        initContactForm();
        initScrollToTop();
        startCounterOnScroll();
        showTestimonial(0);
        
        // Optimize portfolio filtering
        const filterButtons = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        const portfolioItemsArray = Array.from(portfolioItems);

        // Use event delegation for filter buttons
        document.querySelector('.portfolio-filters').addEventListener('click', (e) => {
            const button = e.target.closest('.filter-btn');
            if (!button) return;

            // Update active state
            document.querySelector('.filter-btn.active').classList.remove('active');
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');
            
            // Use requestAnimationFrame for smooth animations
            requestAnimationFrame(() => {
                portfolioItemsArray.forEach(item => {
                    const shouldShow = filterValue === 'all' || item.classList.contains(filterValue);
                    item.style.display = shouldShow ? 'block' : 'none';
                    item.style.opacity = shouldShow ? '1' : '0';
                });
            });
        });

        // Add click handlers to filter buttons
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');
                
                const filterValue = button.getAttribute('data-filter');
                filterPortfolio(filterValue);
            });
        });
        
        // Portfolio Filtering
        portfolioItems.forEach(item => {
            item.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                filterButtons[0].classList.add('active');

                const filterValue = 'all';

                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.classList.contains(filterValue)) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    } catch (error) {
        console.error('Error initializing website:', error);
    }
});

// Optimize initial load animation
window.addEventListener('load', () => {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    requestAnimationFrame(() => {
        portfolioItems.forEach(item => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        });
    });
});

// Optimize intersection observer
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target); // Stop observing once animated
        }
    });
}, observerOptions);

// Observe elements only when needed
document.querySelectorAll('[data-aos]').forEach(element => {
    observer.observe(element);
});

// Initialize portfolio items with animation
window.addEventListener('load', () => {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Intersection Observer for animations
const observer2 = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '50px'
});

// Observe all sections and animated elements
document.querySelectorAll('section, .fade-in').forEach(element => {
    observer2.observe(element);
});

// Use strict mode for better performance
'use strict';

// Initialize only when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Cache DOM elements
    const nav = document.querySelector('.nav-menu');
    
    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        nav.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Portfolio filtering - using event delegation
    const portfolioContainer = document.querySelector('.portfolio-filters');
    const items = document.querySelectorAll('.portfolio-item');
    
    portfolioContainer.addEventListener('click', e => {
        if (!e.target.matches('.filter-btn')) return;
        
        const filter = e.target.dataset.filter;
        document.querySelector('.filter-btn.active').classList.remove('active');
        e.target.classList.add('active');
        
        items.forEach(item => {
            const isVisible = filter === 'all' || item.classList.contains(filter);
            item.style.display = isVisible ? 'block' : 'none';
        });
    });
});

// Lazy load images
document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }
});

// Defer non-critical animations
window.addEventListener('load', () => {
    requestAnimationFrame(() => {
        document.querySelectorAll('.portfolio-item').forEach(item => {
            item.style.opacity = '1';
        });
    });
});

// Video Modal Functionality
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('videoModal');
    const videoFrame = document.getElementById('videoFrame');
    const closeModal = document.querySelector('.close-modal');
    
    // Video URLs mapping (you can add your actual video URLs here)
    const videoUrls = {
        'tech-review': 'https://www.youtube.com/embed/your-video-id',
        'instagram': 'https://www.youtube.com/embed/your-video-id',
        'corporate': 'https://www.youtube.com/embed/your-video-id',
        'wedding': 'https://www.youtube.com/embed/your-video-id'
    };
    
    // Open modal when clicking portfolio items
    document.querySelectorAll('.portfolio-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const videoId = link.getAttribute('data-video');
            const videoUrl = videoUrls[videoId];
            if (videoUrl) {
                videoFrame.src = videoUrl;
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Close modal functionality
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        videoFrame.src = '';
        document.body.style.overflow = 'auto';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            videoFrame.src = '';
            document.body.style.overflow = 'auto';
        }
    });
});

// Enhanced Portfolio Filtering
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const portfolioGrid = document.querySelector('.portfolio-grid');
    
    if (!portfolioGrid) return;
    
    const animateItems = (items, show) => {
        items.forEach(item => {
            if (show) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    };
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                const shouldShow = filterValue === 'all' || item.classList.contains(filterValue);
                animateItems([item], shouldShow);
            });
        });
    });
    
    // Initialize all items as visible
    animateItems(portfolioItems, true);
});
