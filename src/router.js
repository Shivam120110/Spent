// ═══════════════════════════════════════
// Hash-based SPA Router
// ═══════════════════════════════════════

import { isAuthenticated } from './auth.js';
import { renderLayout, setupGlobalSearch } from './layout.js';
import { renderLanding } from './pages/landing.js';
import { renderLogin } from './pages/login.js';
import { renderSignup } from './pages/signup.js';
import { renderDashboard } from './pages/dashboard.js';
import { renderSubscriptions } from './pages/subscriptions.js';
import { renderAlerts } from './pages/alerts.js';
import { renderRenewals } from './pages/renewals.js';
import { renderSettings } from './pages/settings.js';
import { renderProfile } from './pages/profile.js';
import { renderToolDetail } from './pages/tool-detail.js';
import { renderUserDetail } from './pages/user-detail.js';
import { showOnboarding } from './components/onboarding.js';

const MARKETING_ROUTES = ['/', '/login', '/signup'];
const APP_ROUTES = ['/dashboard', '/subscriptions', '/alerts', '/renewals', '/settings', '/profile'];

const ROUTES = {
  '/': renderLanding,
  '/login': renderLogin,
  '/signup': renderSignup,
  '/dashboard': renderDashboard,
  '/subscriptions': renderSubscriptions,
  '/alerts': renderAlerts,
  '/renewals': renderRenewals,
  '/settings': renderSettings,
  '/profile': renderProfile,
};

export class Router {
  constructor(appEl) {
    this.app = appEl;
    this.currentRoute = null;
    this.hasShownOnboarding = false;
    window.addEventListener('hashchange', () => this.navigate());
  }

  getRoute() {
    const hash = window.location.hash || '#/';
    return hash.replace('#', '') || '/';
  }

  navigate(path) {
    if (path) {
      window.location.hash = path;
      return;
    }

    const route = this.getRoute();

    if (this.currentRoute === route) return;
    this.currentRoute = route;

    // Redirect unauthenticated users from app routes
    if (APP_ROUTES.includes(route) && !isAuthenticated()) {
      window.location.hash = '#/login';
      return;
    }

    // Redirect authenticated users from login/signup to dashboard
    if ((route === '/login' || route === '/signup') && isAuthenticated()) {
      window.location.hash = '#/dashboard';
      return;
    }

    // Handle dynamic routes (tool/:id, user/:id)
    if (route.startsWith('/tool/')) {
      const toolId = route.split('/tool/')[1];
      if (!isAuthenticated()) {
        window.location.hash = '#/login';
        return;
      }
      renderLayout(this.app);
      setupGlobalSearch();
      const mainContent = document.getElementById('main-content');
      if (mainContent) {
        mainContent.innerHTML = '';
        renderToolDetail(mainContent, toolId);
      }
      return;
    }

    if (route.startsWith('/user/')) {
      const userId = route.split('/user/')[1];
      if (!isAuthenticated()) {
        window.location.hash = '#/login';
        return;
      }
      renderLayout(this.app);
      setupGlobalSearch();
      const mainContent = document.getElementById('main-content');
      if (mainContent) {
        mainContent.innerHTML = '';
        renderUserDetail(mainContent, userId);
      }
      return;
    }

    const handler = ROUTES[route];

    if (MARKETING_ROUTES.includes(route)) {
      this.app.innerHTML = '';
      if (handler) handler(this.app);
      return;
    }

    // App routes: render layout + page
    renderLayout(this.app);
    setupGlobalSearch(); // Setup search after layout is rendered
    const mainContent = document.getElementById('main-content');
    if (mainContent && handler) {
      mainContent.innerHTML = '';
      handler(mainContent);
      this.updateActiveLink(route);
      if (route === '/dashboard' && !this.hasShownOnboarding) {
        this.hasShownOnboarding = true;
        setTimeout(() => showOnboarding(), 600);
      }
    }
  }

  updateActiveLink(route) {
    document.querySelectorAll('.sidebar-link').forEach((link) => {
      const href = link.getAttribute('href');
      if (href === `#${route}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  start() {
    const route = this.getRoute();
    if (!route || route === '/') {
      window.location.hash = '#/';
    }
    this.navigate();
  }
}
