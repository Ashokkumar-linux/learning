document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.getElementById('main-content');
    const navLinks = document.querySelectorAll('.nav-link');

    const routes = {
        '/': 'pages/home.html',
        '/services': 'pages/services.html',
        '/projects': 'pages/projects.html',
        '/about': 'pages/about.html',
        '/contact': 'pages/contact.html',
        '/index.html': 'pages/home.html',
    };

    const loadPage = async (path) => {
        // Normalize the path to handle cases like '/index.html'
        const normalizedPath = path === '/index.html' ? '/' : path;
        const pageFile = routes[normalizedPath] || routes['/'];

        try {
            const response = await fetch(pageFile);
            if (!response.ok) {
                throw new Error(`Page not found: ${pageFile}`);
            }
            const content = await response.text();
            mainContent.innerHTML = content;

            // Find and execute any scripts in the loaded content
            const scripts = mainContent.querySelectorAll('script');
            scripts.forEach(script => {
                const newScript = document.createElement('script');
                if (script.src) {
                    // Adjust relative path for scripts like ../scripts/filter.js
                    const src = script.getAttribute('src');
                    newScript.src = src.startsWith('../') ? src.substring(3) : src;
                } else {
                    newScript.textContent = script.textContent;
                }
                // Append the script to the body to execute it, then remove it.
                document.body.appendChild(newScript).parentNode.removeChild(newScript);
            });

            updateActiveLink(normalizedPath);
            // Dispatch a custom event to signal that the page is loaded
            mainContent.dispatchEvent(new CustomEvent('page-loaded', { bubbles: true }));

        } catch (error) {
            mainContent.innerHTML = '<p>Error loading page. Please try again.</p>';
            console.error('Error fetching page:', error);
        }
    };

    const updateActiveLink = (path) => {
        const pageName = path === '/' ? 'home' : path.substring(1);
        navLinks.forEach(link => {
            if (link.dataset.page === pageName) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    };

    const navigate = (path) => {
        if (window.location.pathname === path) {
            return;
        }
        history.pushState({}, '', path);
        loadPage(path);
    };

    document.body.addEventListener('click', e => {
        const navLink = e.target.closest('.nav-link');
        if (navLink) {
            e.preventDefault();
            const path = navLink.getAttribute('href');
            navigate(path);
        }
    });

    window.addEventListener('popstate', () => {
        loadPage(window.location.pathname);
    });

    // Initial page load
    loadPage(window.location.pathname);
});
