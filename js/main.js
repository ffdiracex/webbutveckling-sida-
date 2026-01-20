/*
// Pure native JavaScript - no element ID dependencies

// Run when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM ready - starting native JS implementation');
    
    // Create a simple state object
    const appState = {
        counter: 0,
        colors: ['#3a86ff', '#ff006e', '#38b000', '#8338ec', '#ff9e00', '#ff5400'],
        currentColorIndex: 0
    };
    
    // 1. Set current year in footer
    updateYear();
    
    // 2. Start live time updates
    startLiveTime();
    
    // 3. Set up all event listeners using event delegation
    setupEventDelegation();
    
    // 4. Initial render
    console.log('App initialized successfully');
});

// Function to update current year
function updateYear() {
    // Find all elements with class 'year-display'
    const yearElements = document.querySelectorAll('.year-display');
    const currentYear = new Date().getFullYear();
    
    yearElements.forEach(element => {
        element.textContent = currentYear;
    });
    console.log('Year updated to:', currentYear);
}

// Function to update time
function updateTime() {
    // Find all elements with class 'time-display'
    const timeElements = document.querySelectorAll('.time-display');
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    
    timeElements.forEach(element => {
        element.textContent = timeString;
        // Add a visual pulse effect
        element.style.transform = 'scale(1.1)';
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 200);
    });
}

// Start live time updates every second
function startLiveTime() {
    updateTime(); // Update immediately
    setInterval(updateTime, 1000);
}

// Handle counter increment
function incrementCounter() {
    // Find all elements with class 'counter-display'
    const counterElements = document.querySelectorAll('.counter-display');
    
    // Get counter value from the first element (assuming only one)
    if (counterElements.length > 0) {
        const currentElement = counterElements[0];
        let currentValue = parseInt(currentElement.textContent) || 0;
        currentValue++;
        
        // Update all counter displays
        counterElements.forEach(element => {
            element.textContent = currentValue;
            
            // Color logic based on count
            if (currentValue >= 10) {
                element.style.color = '#ff006e';
            } else if (currentValue >= 5) {
                element.style.color = '#38b000';
            } else {
                element.style.color = '#3a86ff';
            }
            
            // Add animation
            element.style.transform = 'scale(1.2)';
            setTimeout(() => {
                element.style.transform = 'scale(1)';
            }, 150);
        });
        
        console.log('Counter incremented to:', currentValue);
    }
}

// Handle counter reset
function resetCounter() {
    // Find all elements with class 'counter-display'
    const counterElements = document.querySelectorAll('.counter-display');
    
    counterElements.forEach(element => {
        element.textContent = '0';
        element.style.color = '#3a86ff';
        
        // Add reset animation
        element.style.transform = 'scale(0.8)';
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 200);
    });
    
    console.log('Counter reset to 0');
}

// Handle color change
function changeColor() {
    // Find all elements with class 'color-display'
    const colorElements = document.querySelectorAll('.color-display');
    
    // Cycle through colors
    const colors = ['#3a86ff', '#ff006e', '#38b000', '#8338ec', '#ff9e00', '#ff5400'];
    const currentElement = colorElements[0];
    
    if (currentElement) {
        // Get current background color
        const currentColor = currentElement.style.backgroundColor || 'rgb(58, 134, 255)';
        
        // Convert RGB to hex if needed
        let colorIndex = colors.findIndex(color => 
            color === currentColor || 
            color === rgbToHex(currentColor)
        );
        
        // Get next color index
        colorIndex = (colorIndex + 1) % colors.length;
        
        // Update all color displays
        colorElements.forEach(element => {
            element.style.backgroundColor = colors[colorIndex];
            
            // Add animation
            element.style.transform = 'rotate(10deg)';
            setTimeout(() => {
                element.style.transform = 'rotate(0deg)';
            }, 200);
        });
        
        console.log('Color changed to:', colors[colorIndex]);
    }
}

// Helper function to convert RGB to hex
function rgbToHex(rgb) {
    // If it's already hex, return it
    if (rgb.startsWith('#')) return rgb;
    
    // Extract RGB values
    const match = rgb.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (!match) return '#3a86ff';
    
    const r = parseInt(match[1]);
    const g = parseInt(match[2]);
    const b = parseInt(match[3]);
    
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

// Event delegation setup - ONE event listener for ALL buttons
function setupEventDelegation() {
    // Add single event listener to document body
    document.body.addEventListener('click', function(event) {
        const clickedElement = event.target;
        
        // Check which button was clicked by its class
        if (clickedElement.classList.contains('counter-btn')) {
            incrementCounter();
            addClickEffect(clickedElement);
        }
        else if (clickedElement.classList.contains('reset-btn')) {
            resetCounter();
            addClickEffect(clickedElement);
        }
        else if (clickedElement.classList.contains('time-btn')) {
            // Manual time update
            updateTime();
            addClickEffect(clickedElement);
        }
        else if (clickedElement.classList.contains('color-btn')) {
            changeColor();
            addClickEffect(clickedElement);
        }
    });
    
    console.log('Event delegation set up successfully');
}

// Add visual feedback for button clicks
function addClickEffect(button) {
    button.style.transform = 'scale(0.95)';
    button.style.opacity = '0.8';
    
    setTimeout(() => {
        button.style.transform = '';
        button.style.opacity = '';
    }, 150);
}

// Add some visual effects when page loads
window.addEventListener('load', function() {
    console.log('Page fully loaded');
    
    // Add fade-in animation to all sections
    const sections = document.querySelectorAll('.demo-section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            section.style.transition = 'all 0.5s ease';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, 100 * index);
    });
    
    // Welcome message in console
    console.log('%c¿ Website Ready! ¿', 'color: #3a86ff; font-size: 16px; font-weight: bold;');
    console.log('%cAll JavaScript features are now active.', 'color: #38b000;');
});
// Pure native JavaScript - no element ID dependencies

// Run when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM ready - starting native JS implementation');
    
    // Create a simple state object
    const appState = {
        counter: 0,
        colors: ['#3a86ff', '#ff006e', '#38b000', '#8338ec', '#ff9e00', '#ff5400'],
        currentColorIndex: 0
    };
    
    // 1. Set current year in footer
    updateYear();
    
    // 2. Start live time updates
    startLiveTime();
    
    // 3. Set up all event listeners using event delegation
    setupEventDelegation();
    
    // 4. Initial render
    console.log('App initialized successfully');
});

// Function to update current year
function updateYear() {
    // Find all elements with class 'year-display'
    const yearElements = document.querySelectorAll('.year-display');
    const currentYear = new Date().getFullYear();
    
    yearElements.forEach(element => {
        element.textContent = currentYear;
    });
    console.log('Year updated to:', currentYear);
}

// Function to update time
function updateTime() {
    // Find all elements with class 'time-display'
    const timeElements = document.querySelectorAll('.time-display');
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    
    timeElements.forEach(element => {
        element.textContent = timeString;
        // Add a visual pulse effect
        element.style.transform = 'scale(1.1)';
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 200);
    });
}

// Start live time updates every second
function startLiveTime() {
    updateTime(); // Update immediately
    setInterval(updateTime, 1000);
}

// Handle counter increment
function incrementCounter() {
    // Find all elements with class 'counter-display'
    const counterElements = document.querySelectorAll('.counter-display');
    
    // Get counter value from the first element (assuming only one)
    if (counterElements.length > 0) {
        const currentElement = counterElements[0];
        let currentValue = parseInt(currentElement.textContent) || 0;
        currentValue++;
        
        // Update all counter displays
        counterElements.forEach(element => {
            element.textContent = currentValue;
            
            // Color logic based on count
            if (currentValue >= 10) {
                element.style.color = '#ff006e';
            } else if (currentValue >= 5) {
                element.style.color = '#38b000';
            } else {
                element.style.color = '#3a86ff';
            }
            
            // Add animation
            element.style.transform = 'scale(1.2)';
            setTimeout(() => {
                element.style.transform = 'scale(1)';
            }, 150);
        });
        
        console.log('Counter incremented to:', currentValue);
    }
}

// Handle counter reset
function resetCounter() {
    // Find all elements with class 'counter-display'
    const counterElements = document.querySelectorAll('.counter-display');
    
    counterElements.forEach(element => {
        element.textContent = '0';
        element.style.color = '#3a86ff';
        
        // Add reset animation
        element.style.transform = 'scale(0.8)';
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 200);
    });
    
    console.log('Counter reset to 0');
}

// Handle color change
function changeColor() {
    // Find all elements with class 'color-display'
    const colorElements = document.querySelectorAll('.color-display');
    
    // Cycle through colors
    const colors = ['#3a86ff', '#ff006e', '#38b000', '#8338ec', '#ff9e00', '#ff5400'];
    const currentElement = colorElements[0];
    
    if (currentElement) {
        // Get current background color
        const currentColor = currentElement.style.backgroundColor || 'rgb(58, 134, 255)';
        
        // Convert RGB to hex if needed
        let colorIndex = colors.findIndex(color => 
            color === currentColor || 
            color === rgbToHex(currentColor)
        );
        
        // Get next color index
        colorIndex = (colorIndex + 1) % colors.length;
        
        // Update all color displays
        colorElements.forEach(element => {
            element.style.backgroundColor = colors[colorIndex];
            
            // Add animation
            element.style.transform = 'rotate(10deg)';
            setTimeout(() => {
                element.style.transform = 'rotate(0deg)';
            }, 200);
        });
        
        console.log('Color changed to:', colors[colorIndex]);
    }
}

// Helper function to convert RGB to hex
function rgbToHex(rgb) {
    // If it's already hex, return it
    if (rgb.startsWith('#')) return rgb;
    
    // Extract RGB values
    const match = rgb.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (!match) return '#3a86ff';
    
    const r = parseInt(match[1]);
    const g = parseInt(match[2]);
    const b = parseInt(match[3]);
    
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

// Event delegation setup - ONE event listener for ALL buttons
function setupEventDelegation() {
    // Add single event listener to document body
    document.body.addEventListener('click', function(event) {
        const clickedElement = event.target;
        
        // Check which button was clicked by its class
        if (clickedElement.classList.contains('counter-btn')) {
            incrementCounter();
            addClickEffect(clickedElement);
        }
        else if (clickedElement.classList.contains('reset-btn')) {
            resetCounter();
            addClickEffect(clickedElement);
        }
        else if (clickedElement.classList.contains('time-btn')) {
            // Manual time update
            updateTime();
            addClickEffect(clickedElement);
        }
        else if (clickedElement.classList.contains('color-btn')) {
            changeColor();
            addClickEffect(clickedElement);
        }
    });
    
    console.log('Event delegation set up successfully');
}

// Add visual feedback for button clicks
function addClickEffect(button) {
    button.style.transform = 'scale(0.95)';
    button.style.opacity = '0.8';
    
    setTimeout(() => {
        button.style.transform = '';
        button.style.opacity = '';
    }, 150);
}

// Add some visual effects when page loads
window.addEventListener('load', function() {
    console.log('Page fully loaded');
    
    // Add fade-in animation to all sections
    const sections = document.querySelectorAll('.demo-section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            section.style.transition = 'all 0.5s ease';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, 100 * index);
    });
    
    // Welcome message in console
    console.log('%c¿ Website Ready! ¿', 'color: #3a86ff; font-size: 16px; font-weight: bold;');
    console.log('%cAll JavaScript features are now active.', 'color: #38b000;');
});



// Carousel functionality with auto-looping
document.addEventListener('DOMContentLoaded', function() {
    console.log('TechSolutions website loaded');
    
    // Initialize carousel
    initCarousel();
    
    // Set current year
    updateYear();
    
    // Set up event listeners for other buttons
    setupEventListeners();
});

// Initialize the carousel
function initCarousel() {
    console.log('Initializing carousel...');
    
    const carousel = document.querySelector('.carousel');
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.carousel-nav.prev');
    const nextBtn = document.querySelector('.carousel-nav.next');
    const playBtn = document.querySelector('.play-btn');
    const pauseBtn = document.querySelector('.pause-btn');
    const speedBtns = document.querySelectorAll('.speed-btn');
    
    let currentSlide = 0;
    let totalSlides = slides.length;
    let autoPlayInterval;
    let slideSpeed = 3000; // Default speed: 3 seconds
    
    // Initialize first slide
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
    
    // Function to show a specific slide
    function showSlide(index) {
        // Remove active class from all slides and indicators
        slides.forEach(slide => {
            slide.classList.remove('active');
            slide.style.transform = 'translateX(100%)';
            slide.style.opacity = '0';
        });
        
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Handle wrap-around for continuous loop
        if (index >= totalSlides) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = totalSlides - 1;
        } else {
            currentSlide = index;
        }
        
        // Show current slide
        slides[currentSlide].classList.add('active');
        slides[currentSlide].style.transform = 'translateX(0)';
        slides[currentSlide].style.opacity = '1';
        indicators[currentSlide].classList.add('active');
        
        console.log(`Showing slide ${currentSlide + 1} of ${totalSlides}`);
    }
    
    // Next slide function
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    // Previous slide function
    function prevSlide() {
        showSlide(currentSlide - 1);
    }
    
    // Start auto-play
    function startAutoPlay() {
        stopAutoPlay(); // Clear any existing interval
        
        autoPlayInterval = setInterval(() => {
            nextSlide();
        }, slideSpeed);
        
        playBtn.classList.add('active');
        pauseBtn.classList.remove('active');
        
        console.log(`Auto-play started (${slideSpeed}ms interval)`);
    }
    
    // Stop auto-play
    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        }
        
        playBtn.classList.remove('active');
        pauseBtn.classList.add('active');
        
        console.log('Auto-play stopped');
    }
    
    // Set slide speed
    function setSlideSpeed(speed) {
        slideSpeed = speed;
        
        // Update active speed button
        speedBtns.forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
        
        // Restart auto-play with new speed if it's running
        if (autoPlayInterval) {
            startAutoPlay();
        }
        
        console.log(`Slide speed set to ${speed}ms`);
    }
    
    // Set up event listeners for carousel
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            nextSlide();
            stopAutoPlay(); // Stop auto-play on manual navigation
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            prevSlide();
            stopAutoPlay();
        });
    }
    
    // Indicator clicks
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            showSlide(index);
            stopAutoPlay();
        });
    });
    
    // Auto-play controls
    if (playBtn) {
        playBtn.addEventListener('click', startAutoPlay);
    }
    
    if (pauseBtn) {
        pauseBtn.addEventListener('click', stopAutoPlay);
    }
    
    // Speed controls
    speedBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const speed = parseInt(e.target.getAttribute('data-speed'));
            setSlideSpeed(speed);
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight') {
            nextSlide();
            stopAutoPlay();
        } else if (e.key === 'ArrowLeft') {
            prevSlide();
            stopAutoPlay();
        } else if (e.key === ' ') {
            // Space bar toggles auto-play
            if (autoPlayInterval) {
                stopAutoPlay();
            } else {
                startAutoPlay();
            }
            e.preventDefault();
        }
    });
    
    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    carousel.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    carousel.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next slide
                nextSlide();
            } else {
                // Swipe right - previous slide
                prevSlide();
            }
            stopAutoPlay();
        }
    }
    
    // Start auto-play on page load
    setTimeout(() => {
        startAutoPlay();
    }, 1000);
    
    console.log('Carousel initialized successfully');
}

// Update current year
function updateYear() {
    const yearElements = document.querySelectorAll('.year-display');
    const currentYear = new Date().getFullYear();
    
    yearElements.forEach(element => {
        element.textContent = currentYear;
    });
}

// Set up event listeners for CTA buttons
function setupEventListeners() {
    // Handle CTA button clicks in carousel
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('cta-btn')) {
            const slideTitle = e.target.closest('.carousel-slide').querySelector('h2').textContent;
            alert(`Thank you for your interest in our ${slideTitle} service! Our team will contact you shortly.`);
            console.log(`CTA clicked for: ${slideTitle}`);
        }
    });
    
    // Add animation to stat cards on scroll
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.opacity = '1';
            }
        });
    }, observerOptions);
    
    // Observe stat cards
    document.querySelectorAll('.stat-card').forEach(card => {
        card.style.transform = 'translateY(20px)';
        card.style.opacity = '0';
        card.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
        observer.observe(card);
    });
    
    // Add hover effect to service features
    document.querySelectorAll('.service-features li').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
    
    console.log('Event listeners set up');
}

// Add page load animation
window.addEventListener('load', function() {
    // Animate header
    const header = document.querySelector('header');
    header.style.opacity = '0';
    header.style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
        header.style.transition = 'all 0.8s ease';
        header.style.opacity = '1';
        header.style.transform = 'translateY(0)';
    }, 300);
    
    // Console welcome message
    console.log('%c¿ TechSolutions Inc. ¿', 'color: #3b82f6; font-size: 18px; font-weight: bold;');
    console.log('%cCarousel is running with auto-loop functionality', 'color: #10b981;');
});

*/

// Felix's Engineering Wiki - Main JavaScript

// Felix's Engineering Wiki - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('Felix\'s Engineering Wiki loaded');
    
    // Initialize all features
    initializeDarkMode();
    initializeFontControls();
    initializeSearch();
    initializeNavigation();
    initializeRandomArticle();
    initializeBackToTop();
    initializePage();
});

// ==================== DARK MODE ====================
function initializeDarkMode() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const themeStatus = document.getElementById('theme-status');
    const moonIcon = darkModeToggle.querySelector('.fa-moon');
    
    // Check for saved theme or prefer-color-scheme
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const savedTheme = localStorage.getItem('theme') || 
                      (prefersDarkScheme.matches ? 'dark' : 'light');
    
    // Apply saved theme
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeUI(savedTheme);
    
    // Toggle dark mode
    darkModeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeUI(newTheme);
        
        console.log(`Theme changed to ${newTheme} mode`);
    });
    
    function updateThemeUI(theme) {
        themeStatus.textContent = theme === 'dark' ? 'Dark' : 'Light';
        moonIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        darkModeToggle.querySelector('.mode-text').textContent = 
            theme === 'dark' ? 'Light Mode' : 'Dark Mode';
    }
}

// ==================== FONT CONTROLS ====================
function initializeFontControls() {
    const fontDecrease = document.getElementById('font-decrease');
    const fontReset = document.getElementById('font-reset');
    const fontIncrease = document.getElementById('font-increase');
    const fontSizeStatus = document.getElementById('font-size-status');
    
    // Base font size in pixels
    const baseFontSize = 16;
    const minFontSize = 12;
    const maxFontSize = 24;
    const step = 2;
    
    // Get saved font size or use default
    let currentFontSize = parseInt(localStorage.getItem('fontSize')) || baseFontSize;
    applyFontSize(currentFontSize);
    
    // Event listeners
    fontDecrease.addEventListener('click', () => {
        if (currentFontSize > minFontSize) {
            currentFontSize -= step;
            applyFontSize(currentFontSize);
        }
    });
    
    fontReset.addEventListener('click', () => {
        currentFontSize = baseFontSize;
        applyFontSize(currentFontSize);
    });
    
    fontIncrease.addEventListener('click', () => {
        if (currentFontSize < maxFontSize) {
            currentFontSize += step;
            applyFontSize(currentFontSize);
        }
    });
    
    function applyFontSize(size) {
        document.documentElement.style.fontSize = `${size}px`;
        fontSizeStatus.textContent = `${Math.round((size / baseFontSize) * 100)}%`;
        localStorage.setItem('fontSize', size.toString());
        console.log(`Font size set to ${size}px`);
    }
}

// ==================== SEARCH FUNCTIONALITY ====================
function initializeSearch() {
    const searchToggle = document.getElementById('search-toggle');
    const searchPanel = document.querySelector('.search-panel');
    const closeSearch = document.getElementById('close-search');
    const wikiSearch = document.getElementById('wiki-search');
    const searchBtn = document.getElementById('search-btn');
    const searchResults = document.getElementById('search-results');
    
    // Mock search data (in a real wiki, this would come from a database)
    const searchData = [
        { title: 'Biography', section: 'biography', content: 'Felix Müller career overview and professional journey' },
        { title: 'Education', section: 'education', content: 'Academic background and degrees obtained' },
        { title: 'Embedded Systems', section: 'embedded', content: 'Microcontrollers, firmware development, and embedded C/C++' },
        { title: 'Robotics', section: 'robotics', content: 'Autonomous systems, ROS, and robot kinematics' },
        { title: 'IoT Systems', section: 'iot', content: 'Internet of Things protocols and architectures' },
        { title: 'Machine Learning', section: 'ml', content: 'AI applications in engineering systems' },
        { title: 'Mars Rover Prototype', section: 'mars-rover', content: 'Space exploration robotics project' },
        { title: 'Smart Grid Controller', section: 'smart-grid', content: 'Energy management system for smart cities' }
    ];
    
    // Toggle search panel
    searchToggle.addEventListener('click', () => {
        searchPanel.classList.toggle('active');
        if (searchPanel.classList.contains('active')) {
            wikiSearch.focus();
        }
    });
    
    closeSearch.addEventListener('click', () => {
        searchPanel.classList.remove('active');
        searchResults.style.display = 'none';
        wikiSearch.value = '';
    });
    
    // Search functionality
    function performSearch(query) {
        if (!query.trim()) {
            searchResults.style.display = 'none';
            return;
        }
        
        const results = searchData.filter(item => 
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.content.toLowerCase().includes(query.toLowerCase())
        );
        
        displaySearchResults(results);
    }
    
    function displaySearchResults(results) {
        if (results.length === 0) {
            searchResults.innerHTML = `
                <div class="search-result-item">
                    <p>No results found for your search.</p>
                </div>
            `;
            searchResults.style.display = 'block';
            return;
        }
        
        searchResults.innerHTML = results.map(result => `
            <div class="search-result-item" data-section="${result.section}">
                <h4>${highlightMatches(result.title, wikiSearch.value)}</h4>
                <p>${highlightMatches(result.content.substring(0, 150), wikiSearch.value)}...</p>
                <button class="goto-section-btn">Go to section</button>
            </div>
        `).join('');
        
        searchResults.style.display = 'block';
        
        // Add event listeners to result items
        document.querySelectorAll('.goto-section-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const section = this.closest('.search-result-item').dataset.section;
                navigateToSection(section);
                searchPanel.classList.remove('active');
                searchResults.style.display = 'none';
                wikiSearch.value = '';
            });
        });
    }
    
    function highlightMatches(text, query) {
        if (!query) return text;
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }
    
    // Event listeners for search
    wikiSearch.addEventListener('input', () => performSearch(wikiSearch.value));
    searchBtn.addEventListener('click', () => performSearch(wikiSearch.value));
    wikiSearch.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') performSearch(wikiSearch.value);
    });
}

// ==================== NAVIGATION ====================
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentSection = document.getElementById('current-section');
    const articles = document.querySelectorAll('.wiki-article');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.tagName === 'BUTTON') return; // Skip button elements
            
            e.preventDefault();
            
            // Remove active class from all links and articles
            navLinks.forEach(l => l.classList.remove('active'));
            articles.forEach(a => a.classList.remove('active-section'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get target section
            const targetId = this.getAttribute('href').substring(1);
            const targetArticle = document.getElementById(targetId);
            
            if (targetArticle) {
                // Update current section in breadcrumbs
                currentSection.textContent = this.textContent.replace(/[^a-zA-Z ]/g, '').trim();
                
                // Show target article
                targetArticle.classList.add('active-section');
                
                // Scroll to top of content
                document.querySelector('.wiki-content').scrollTop = 0;
                
                console.log(`Navigated to section: ${targetId}`);
            }
        });
    });
    
    function navigateToSection(sectionId) {
        const targetLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        if (targetLink) {
            targetLink.click();
        }
    }
    
    window.navigateToSection = navigateToSection; // Make available globally
}

// ==================== RANDOM ARTICLE ====================
function initializeRandomArticle() {
    const randomArticleBtn = document.getElementById('random-article');
    const navLinks = Array.from(document.querySelectorAll('.nav-link:not(.random-btn)'));
    
    randomArticleBtn.addEventListener('click', function() {
        // Filter out non-section links and get random one
        const sectionLinks = navLinks.filter(link => link.getAttribute('href').startsWith('#'));
        
        if (sectionLinks.length > 0) {
            const randomLink = sectionLinks[Math.floor(Math.random() * sectionLinks.length)];
            randomLink.click();
            
            // Show notification
            showNotification(`Taking you to: ${randomLink.textContent}`);
        }
    });
}

// ==================== BACK TO TOP ====================
function initializeBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ==================== PAGE INITIALIZATION ====================
function initializePage() {
    // Set current date
    const currentDate = document.getElementById('current-date');
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    currentDate.textContent = now.toLocaleDateString('en-US', options);
    
    // Initialize print functionality
    document.getElementById('print-page').addEventListener('click', () => {
        window.print();
    });
    
    // Add animation to skill bars on page load
    setTimeout(() => {
        const skillLevels = document.querySelectorAll('.skill-level');
        skillLevels.forEach(level => {
            const width = level.style.width;
            level.style.width = '0';
            setTimeout(() => {
                level.style.width = width;
            }, 300);
        });
    }, 500);
    
    // Initialize tooltips
    initializeTooltips();
    
    console.log('Wiki initialized successfully');
}

// ==================== UTILITY FUNCTIONS ====================
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        padding: 15px 25px;
        border-radius: var(--radius);
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function initializeTooltips() {
    const tooltipElements = document.querySelectorAll('[title]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function(e) {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.getAttribute('title');
            tooltip.style.cssText = `
                position: fixed;
                background: var(--bg-tertiary);
                color: var(--text-color);
                padding: 8px 12px;
                border-radius: var(--radius);
                font-size: 0.9rem;
                z-index: 10001;
                border: 1px solid var(--border-color);
                box-shadow: var(--shadow);
                max-width: 200px;
                white-space: nowrap;
            `;
            
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
            tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
            
            this._tooltip = tooltip;
        });
        
        element.addEventListener('mouseleave', function() {
            if (this._tooltip) {
                this._tooltip.remove();
                delete this._tooltip;
            }
        });
    });
}

// ==================== ANIMATION STYLES ====================
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .search-result-item {
        padding: 15px;
        border-bottom: 1px solid var(--border-color);
        cursor: pointer;
        transition: var(--transition);
    }
    
    .search-result-item:hover {
        background: var(--bg-tertiary);
    }
    
    .search-result-item h4 {
        margin-bottom: 5px;
        color: var(--primary-color);
    }
    
    .search-result-item p {
        color: var(--text-secondary);
        font-size: 0.9rem;
        margin-bottom: 10px;
    }
    
    .goto-section-btn {
        background: var(--primary-color);
        color: white;
        border: none;
        padding: 5px 12px;
        border-radius: var(--radius);
        cursor: pointer;
        font-size: 0.9rem;
        transition: var(--transition);
    }
    
    .goto-section-btn:hover {
        background: var(--secondary-color);
    }
    
    mark {
        background-color: #fef3c7;
        color: #92400e;
        padding: 2px;
        border-radius: 2px;
    }
    
    [data-theme="dark"] mark {
        background-color: #92400e;
        color: #fef3c7;
    }
`;
document.head.appendChild(style);

// ==================== WIKI STATS ANIMATION ====================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    
    let current = start;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Animate stats on page load
window.addEventListener('load', () => {
    setTimeout(() => {
        const articleCount = document.getElementById('article-count');
        const imageCount = document.getElementById('image-count');
        const contributorCount = document.getElementById('contributor-count');
        
        animateCounter(articleCount, 128);
        animateCounter(imageCount, 347);
        animateCounter(contributorCount, 1);
    }, 1000);
});
