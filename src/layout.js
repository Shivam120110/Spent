// ═══════════════════════════════════════
// Layout — Sidebar + Main Shell
// ═══════════════════════════════════════

import { icons } from './icons.js';
import { alerts, searchTools, searchUsers } from './data.js';
import { getAuthUser, clearAuth } from './auth.js';

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
        <div class="sidebar-user-wrap">
          <button type="button" class="sidebar-user" id="sidebar-profile-btn" aria-expanded="false" aria-haspopup="true">
            <div class="sidebar-avatar">${getAuthUser()?.name?.slice(0, 2).toUpperCase() || 'JD'}</div>
            <div class="sidebar-user-info">
              <div class="sidebar-user-name">${getAuthUser()?.name || getAuthUser()?.email || 'Jordan Davis'}</div>
              <div class="sidebar-user-role">Finance Lead</div>
            </div>
          </button>
          <div class="sidebar-user-dropdown" id="sidebar-profile-dropdown" hidden>
            <a href="#/profile" class="sidebar-dropdown-item">View profile</a>
            <a href="#/settings" class="sidebar-dropdown-item">Settings</a>
            <button type="button" class="sidebar-dropdown-item sidebar-dropdown-logout" id="sidebar-logout-btn">Log out</button>
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
          <div class="search-wrap" id="search-wrap">
            <div class="search-scope-tabs">
              <button type="button" class="search-scope-tab active" data-scope="all" title="Search all">All</button>
              <button type="button" class="search-scope-tab" data-scope="tools" title="Search tools only">Tools</button>
              <button type="button" class="search-scope-tab" data-scope="people" title="Search people only">People</button>
            </div>
            <div class="search-input" style="width: 260px;">
              ${icons.search}
              <input type="text" placeholder="Search tools or people..." id="global-search" autocomplete="off" />
              <span class="kbd">⌘K</span>
            </div>
            <div class="search-suggestions" id="search-suggestions" hidden></div>
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

// Search scope: 'all' | 'tools' | 'people'
let searchScope = 'all';

// Setup global search with suggestions dropdown and scope toggle
export function setupGlobalSearch() {
    const searchInput = document.getElementById('global-search');
    const suggestionsEl = document.getElementById('search-suggestions');
    const searchWrap = document.getElementById('search-wrap');
    if (!searchInput || !suggestionsEl) return;

    let searchTimeout = null;
    let selectedIndex = -1;

    // Scope tabs
    document.querySelectorAll('.search-scope-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.search-scope-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            searchScope = tab.dataset.scope;
            const query = searchInput.value.trim();
            if (query) showSearchSuggestions(query);
        });
    });

    function hideSuggestions() {
        suggestionsEl.hidden = true;
        suggestionsEl.innerHTML = '';
        selectedIndex = -1;
    }

    function showSearchSuggestions(query) {
        const q = query.toLowerCase();
        if (!q) {
            hideSuggestions();
            return;
        }

        let toolResults = [];
        let userResults = [];

        if (searchScope === 'all' || searchScope === 'tools') {
            toolResults = searchTools(query);
        }
        if (searchScope === 'all' || searchScope === 'people') {
            userResults = searchUsers(query);
        }

        if (toolResults.length === 0 && userResults.length === 0) {
            suggestionsEl.innerHTML = '<div class="search-suggestion-empty">No results</div>';
            suggestionsEl.hidden = false;
            return;
        }

        const parts = [];
        if (userResults.length > 0) {
            parts.push('<div class="search-suggestion-section">People</div>');
            userResults.slice(0, 8).forEach(u => {
                parts.push(`<a href="#/user/${u.id}" class="search-suggestion-item" data-type="user" data-id="${u.id}">
                  <span class="search-suggestion-avatar">${u.name.slice(0, 2).toUpperCase()}</span>
                  <span class="search-suggestion-text">${u.name}</span>
                  <span class="search-suggestion-meta">${u.email}</span>
                </a>`);
            });
        }
        if (toolResults.length > 0) {
            parts.push('<div class="search-suggestion-section">Tools</div>');
            toolResults.slice(0, 8).forEach(t => {
                parts.push(`<a href="#/tool/${t.id}" class="search-suggestion-item" data-type="tool" data-id="${t.id}">
                  <span class="search-suggestion-icon">${t.name.slice(0, 2).toUpperCase()}</span>
                  <span class="search-suggestion-text">${t.name}</span>
                  <span class="search-suggestion-meta">${t.category}</span>
                </a>`);
            });
        }

        suggestionsEl.innerHTML = parts.join('');
        suggestionsEl.hidden = false;
        selectedIndex = -1;
    }

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim();
        if (searchTimeout) clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => showSearchSuggestions(query), 200);
    });

    searchInput.addEventListener('focus', () => {
        const query = searchInput.value.trim();
        if (query) showSearchSuggestions(query);
    });

    searchInput.addEventListener('keydown', (e) => {
        const items = Array.from(suggestionsEl.querySelectorAll('.search-suggestion-item'));
        if (e.key === 'Escape') {
            hideSuggestions();
            searchInput.blur();
            return;
        }
        if (e.key === 'Enter') {
            if (items.length && selectedIndex >= 0 && items[selectedIndex]) {
                items[selectedIndex].click();
                hideSuggestions();
            }
            e.preventDefault();
            return;
        }
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            selectedIndex = selectedIndex < items.length - 1 ? selectedIndex + 1 : -1;
            items.forEach((el, i) => el.classList.toggle('selected', i === selectedIndex));
            return;
        }
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            selectedIndex = selectedIndex <= 0 ? -1 : selectedIndex - 1;
            if (selectedIndex >= 0) items[selectedIndex].classList.add('selected');
            items.forEach((el, i) => el.classList.toggle('selected', i === selectedIndex));
        }
    });

    document.addEventListener('click', (e) => {
        if (searchWrap && !searchWrap.contains(e.target)) hideSuggestions();
    });

    // Profile dropdown
    const profileBtn = document.getElementById('sidebar-profile-btn');
    const profileDropdown = document.getElementById('sidebar-profile-dropdown');
    const logoutBtn = document.getElementById('sidebar-logout-btn');

    if (profileBtn && profileDropdown) {
        profileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = !profileDropdown.hidden;
            profileDropdown.hidden = isOpen;
            profileBtn.setAttribute('aria-expanded', !isOpen);
        });
        document.addEventListener('click', () => {
            profileDropdown.hidden = true;
            profileBtn.setAttribute('aria-expanded', 'false');
        });
    }
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (confirm('Log out?')) {
                clearAuth();
                window.location.hash = '#/';
            }
        });
    }
}

function performGlobalSearch(query) {
    if (!query) return;
    const currentRoute = (window.location.hash || '#/dashboard').replace('#', '');
    if (currentRoute === '/dashboard') filterDashboardTable(query);
    else if (currentRoute === '/subscriptions') {
        const subSearchInput = document.getElementById('sub-search');
        if (subSearchInput) {
            subSearchInput.value = query;
            subSearchInput.dispatchEvent(new Event('input'));
        }
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
