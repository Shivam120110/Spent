// ═══════════════════════════════════════
// Layout — Sidebar + Main Shell
// ═══════════════════════════════════════

import { icons } from './icons.js';
import { alerts } from './data.js';
import { getAuthUser } from './auth.js';

const NAV_ITEMS = [
    { label: 'Overview', icon: 'dashboard', path: '/dashboard' },
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
          <div class="sidebar-avatar">${getAuthUser()?.name?.slice(0, 2).toUpperCase() || 'JD'}</div>
          <div class="sidebar-user-info">
            <div class="sidebar-user-name">${getAuthUser()?.name || 'Jordan Davis'}</div>
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

// Setup global search functionality
export function setupGlobalSearch() {
    const searchInput = document.getElementById('global-search');
    if (!searchInput) return;

    // Store original search value for clearing
    let searchTimeout = null;

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim().toLowerCase();
        
        // Clear previous timeout
        if (searchTimeout) clearTimeout(searchTimeout);
        
        // Debounce search
        searchTimeout = setTimeout(() => {
            performGlobalSearch(query);
        }, 300);
    });

    // Handle Enter key
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const query = e.target.value.trim().toLowerCase();
            performGlobalSearch(query);
        }
    });
}

function performGlobalSearch(query) {
    if (!query) {
        // Clear search - refresh current page
        const hash = window.location.hash || '#/dashboard';
        window.location.hash = hash;
        return;
    }

    // Get current route
    const currentRoute = (window.location.hash || '#/dashboard').replace('#', '');
    
    // If on dashboard, filter the table
    if (currentRoute === '/dashboard') {
        filterDashboardTable(query);
    } else if (currentRoute === '/subscriptions') {
        // Trigger subscriptions page search
        const subSearchInput = document.getElementById('sub-search');
        if (subSearchInput) {
            subSearchInput.value = query;
            subSearchInput.dispatchEvent(new Event('input'));
        }
    } else {
        // Navigate to subscriptions page with search
        window.location.hash = '#/subscriptions';
        setTimeout(() => {
            const subSearchInput = document.getElementById('sub-search');
            if (subSearchInput) {
                subSearchInput.value = query;
                subSearchInput.dispatchEvent(new Event('input'));
            }
        }, 100);
    }
}

function filterDashboardTable(query) {
    const tbody = document.getElementById('top-spend-table');
    if (!tbody) return;

    const rows = Array.from(tbody.querySelectorAll('tr')).filter(row => !row.classList.contains('no-results-message'));
    let visibleCount = 0;

    // Remove existing no-results message
    const existingNoResults = tbody.querySelector('.no-results-message');
    if (existingNoResults) existingNoResults.remove();

    rows.forEach(row => {
        const toolName = row.querySelector('.tool-name')?.textContent?.toLowerCase() || '';
        const category = row.querySelector('td:nth-child(2)')?.textContent?.toLowerCase() || '';
        
        if (toolName.includes(query) || category.includes(query)) {
            row.style.display = '';
            visibleCount++;
        } else {
            row.style.display = 'none';
        }
    });

    // Show message if no results
    if (visibleCount === 0 && rows.length > 0) {
        const noResultsRow = document.createElement('tr');
        noResultsRow.className = 'no-results-message';
        noResultsRow.innerHTML = `
            <td colspan="5" style="text-align: center; padding: var(--space-8);">
                <div class="empty-state">
                    <div class="empty-state-icon">${icons.search}</div>
                    <div class="empty-state-title">No tools found</div>
                    <div class="empty-state-text">No tools match "${query}"</div>
                </div>
            </td>
        `;
        tbody.appendChild(noResultsRow);
    }
}
