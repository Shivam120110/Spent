// ═══════════════════════════════════════
// Spend — Main Entry Point
// ═══════════════════════════════════════

import './styles/variables.css';
import './styles/base.css';
import './styles/components.css';
import './styles/landing.css';

import { Router } from './router.js';
import { subscriptions } from './data.js';

window.__spendData = { subscriptions };

const app = document.getElementById('app');
const router = new Router(app);
router.start();
