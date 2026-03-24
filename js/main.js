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
    
    // Mock search data
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
