// ═══════════════════════════════════════
// Hash-based SPA Router
// ═══════════════════════════════════════

export class Router {
    constructor() {
        this.routes = {};
        this.currentRoute = null;
        window.addEventListener('hashchange', () => this.navigate());
    }

    register(path, handler) {
        this.routes[path] = handler;
        return this;
    }

    navigate(path) {
        if (path) {
            window.location.hash = path;
            return;
        }

        const hash = window.location.hash || '#/';
        const route = hash.replace('#', '') || '/';

        if (this.currentRoute === route) return;
        this.currentRoute = route;

        const handler = this.routes[route];
        if (handler) {
            const content = document.getElementById('main-content');
            if (content) {
                content.innerHTML = '';
                content.scrollTop = 0;
                handler(content);
            }
            this.updateActiveLink(route);
        }
    }

    updateActiveLink(route) {
        document.querySelectorAll('.sidebar-link').forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${route}`) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    start() {
        if (!window.location.hash) {
            window.location.hash = '#/';
        }
        this.navigate();
    }
}
