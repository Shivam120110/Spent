// ═══════════════════════════════════════
// Spend — Main Entry Point
// ═══════════════════════════════════════

import './styles/variables.css';
import './styles/base.css';
import './styles/components.css';

import { Router } from './router.js';
import { renderLayout } from './layout.js';
import { renderDashboard } from './pages/dashboard.js';
import { renderSubscriptions } from './pages/subscriptions.js';
import { renderAlerts } from './pages/alerts.js';
import { renderRenewals } from './pages/renewals.js';
import { renderSettings } from './pages/settings.js';
import { showOnboarding } from './components/onboarding.js';
import { subscriptions } from './data.js';

// Expose data globally for dashboard's table render
window.__spendData = { subscriptions };

const app = document.getElementById('app');
renderLayout(app);

const router = new Router();

router
    .register('/', renderDashboard)
    .register('/subscriptions', renderSubscriptions)
    .register('/alerts', renderAlerts)
    .register('/renewals', renderRenewals)
    .register('/settings', renderSettings);

router.start();

// Show onboarding on first visit
setTimeout(() => showOnboarding(), 600);
