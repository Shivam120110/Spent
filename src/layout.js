// ═══════════════════════════════════════
// Layout — Sidebar + Main Shell
// ═══════════════════════════════════════

import { icons } from './icons.js';
import { alerts } from './data.js';

const NAV_ITEMS = [
    { label: 'Overview', icon: 'dashboard', path: '/' },
    { label: 'Subscriptions', icon: 'layers', path: '/subscriptions' },
    { label: 'Alerts', icon: 'bell', path: '/alerts', badge: alerts.length },
    { label: 'Renewals', icon: 'calendar', path: '/renewals' },
];

const NAV_BOTTOM = [
    { label: 'Settings', icon: 'settings', path: '/settings' },
];

export function renderLayout(app) {
    app.innerHTML = `
    <aside class="sidebar">
      <div class="sidebar-header">
        <div class="sidebar-logo">S</div>
        <span class="sidebar-brand">Spend</span>
      </div>
      <nav class="sidebar-nav">
        <div class="sidebar-section-label">Menu</div>
        ${NAV_ITEMS.map(item => `
          <a href="#${item.path}" class="sidebar-link" data-path="${item.path}">
            ${icons[item.icon]}
            <span>${item.label}</span>
            ${item.badge ? `<span class="badge">${item.badge}</span>` : ''}
          </a>
        `).join('')}
        <div class="sidebar-section-label" style="margin-top: var(--space-4)">System</div>
        ${NAV_BOTTOM.map(item => `
          <a href="#${item.path}" class="sidebar-link" data-path="${item.path}">
            ${icons[item.icon]}
            <span>${item.label}</span>
          </a>
        `).join('')}
      </nav>
      <div class="sidebar-footer">
        <div class="sidebar-user">
          <div class="sidebar-avatar">JD</div>
          <div class="sidebar-user-info">
            <div class="sidebar-user-name">Jordan Davis</div>
            <div class="sidebar-user-role">Finance Lead</div>
          </div>
        </div>
      </div>
    </aside>
    <div class="main-wrapper">
      <header class="topbar">
        <div class="topbar-left">
          <span class="topbar-title" id="page-title">Overview</span>
        </div>
        <div class="topbar-right">
          <div class="search-input" style="width: 220px;">
            ${icons.search}
            <input type="text" placeholder="Search tools..." id="global-search" />
            <span class="kbd">⌘K</span>
          </div>
          <div class="sync-indicator">
            <span class="sync-dot"></span>
            <span>Last synced 2 hours ago</span>
          </div>
        </div>
      </header>
      <main class="main-content" id="main-content">
      </main>
    </div>
  `;
}

export function setPageTitle(title) {
    const el = document.getElementById('page-title');
    if (el) el.textContent = title;
}
