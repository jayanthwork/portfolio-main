// Mobile Menu Toggle
function toggleMobileMenu() {
    document.getElementById('mobile-menu').classList.toggle('hidden');
}

// Add Modal
function showAddModal(type) {
    const titles = {
        skill: 'Add New Skill',
        cert: 'Add New Certification',
        blog: 'Add New Article'
    };
    document.getElementById('modal-title').textContent = titles[type] || 'Add New Item';
    document.getElementById('add-modal').classList.remove('hidden');
}

function closeAddModal() {
    document.getElementById('add-modal').classList.add('hidden');
}

// Initialize intersection observer for fade-in animations
function initializeFadeInAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Animate first section elements on load
    window.addEventListener('load', () => {
        document.querySelectorAll('section:first-of-type .fade-in').forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), i * 100);
        });
    });
}

// Skills Filter
function initializeSkillsFilter() {
    const skillFilters = document.querySelectorAll('#skill-filters .category-tab');
    const skillItems = document.querySelectorAll('#skills-grid .skill-item');

    skillFilters.forEach(tab => {
        tab.addEventListener('click', () => {
            skillFilters.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const filter = tab.dataset.filter;

            skillItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(10px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Certifications Filter
function initializeCertsFilter() {
    const certFilters = document.querySelectorAll('#cert-filters .category-tab');
    const certItems = document.querySelectorAll('#certs-grid .cert-card');

    certFilters.forEach(tab => {
        tab.addEventListener('click', () => {
            certFilters.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const filter = tab.dataset.filter;

            certItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Blog Search
function initializeBlogSearch() {
    const blogSearch = document.getElementById('blog-search');
    if (!blogSearch) return;

    const blogArticles = document.querySelectorAll('#blog-grid .blog-card');
    const noResults = document.getElementById('no-blog-results');

    blogSearch.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();
        let visibleCount = 0;

        blogArticles.forEach(article => {
            const searchData = article.dataset.search.toLowerCase();
            const title = article.querySelector('h3').textContent.toLowerCase();
            const content = article.querySelector('p').textContent.toLowerCase();
            const category = article.querySelector('.rounded-full').textContent.toLowerCase();

            const isMatch = searchData.includes(searchTerm) || 
                           title.includes(searchTerm) || 
                           content.includes(searchTerm) ||
                           category.includes(searchTerm);

            if (isMatch) {
                article.classList.remove('hidden-item');
                visibleCount++;
            } else {
                article.classList.add('hidden-item');
            }
        });

        if (visibleCount === 0 && searchTerm !== '') {
            noResults.classList.add('visible');
        } else {
            noResults.classList.remove('visible');
        }
    });
}

// Smooth scroll with proper anchor handling
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
}

// Initialize all features when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeFadeInAnimations();
    initializeSkillsFilter();
    initializeCertsFilter();
    initializeBlogSearch();
    initializeSmoothScroll();
});
