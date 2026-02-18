// ═══════════════════════════════════════
// Subscriptions Page
// ═══════════════════════════════════════

import { subscriptions, categories, formatCurrency, formatDate, getToolColor, getToolInitials, getUtilization, getUtilizationClass } from '../data.js';
import { icons } from '../icons.js';
import { setPageTitle } from '../layout.js';

let currentFilter = 'all';
let currentSearch = '';
let currentSort = { key: 'monthlyCost', dir: 'desc' };

export function renderSubscriptions(container) {
    setPageTitle('Subscriptions');

    container.innerHTML = `
    <div class="animate-in">
      <div class="page-header" style="display: flex; align-items: flex-start; justify-content: space-between;">
        <div>
          <h1 class="page-title">Subscriptions</h1>
          <p class="page-description">${subscriptions.length} tools across your organization</p>
        </div>
        <div style="display: flex; gap: var(--space-3);">
          <button class="btn btn-secondary" id="btn-export">${icons.download} Export CSV</button>
        </div>
      </div>

      <div class="card">
        <div class="table-toolbar">
          <div class="table-toolbar-left">
            <div class="search-input" style="width: 240px;">
              ${icons.search}
              <input type="text" placeholder="Search subscriptions..." id="sub-search" />
            </div>
            <select class="select-input" id="category-filter">
              <option value="all">All Categories</option>
              ${categories.map(c => `<option value="${c}">${c}</option>`).join('')}
            </select>
            <select class="select-input" id="status-filter">
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="underutilized">Underutilized</option>
            </select>
          </div>
          <div class="table-toolbar-right">
            <span style="font-size: var(--text-xs); color: var(--color-text-muted);" id="results-count">${subscriptions.length} results</span>
          </div>
        </div>
        <div style="overflow-x: auto;">
          <table class="data-table" id="subscriptions-table">
            <thead>
              <tr>
                <th class="sortable" data-sort="name" style="cursor: pointer;">Tool</th>
                <th class="sortable" data-sort="category" style="cursor: pointer;">Category</th>
                <th class="sortable" data-sort="monthlyCost" style="cursor: pointer; text-align: right;">Monthly Cost</th>
                <th>Seats</th>
                <th class="sortable" data-sort="renewalDate" style="cursor: pointer;">Renewal Date</th>
                <th>Status</th>
                <th>Owner</th>
              </tr>
            </thead>
            <tbody id="sub-table-body">
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;

    renderTable();
    bindEvents(container);
}

function getFilteredSubscriptions() {
    let result = [...subscriptions];

    if (currentSearch) {
        const q = currentSearch.toLowerCase();
        result = result.filter(s => s.name.toLowerCase().includes(q) || s.category.toLowerCase().includes(q) || s.owner.toLowerCase().includes(q));
    }

    if (currentFilter !== 'all') {
        result = result.filter(s => s.category === currentFilter);
    }

    const statusFilter = document.getElementById('status-filter')?.value || 'all';
    if (statusFilter !== 'all') {
        result = result.filter(s => s.status === statusFilter);
    }

    result.sort((a, b) => {
        let aVal = a[currentSort.key];
        let bVal = b[currentSort.key];
        if (typeof aVal === 'string') aVal = aVal.toLowerCase();
        if (typeof bVal === 'string') bVal = bVal.toLowerCase();
        if (aVal < bVal) return currentSort.dir === 'asc' ? -1 : 1;
        if (aVal > bVal) return currentSort.dir === 'asc' ? 1 : -1;
        return 0;
    });

    return result;
}

function renderTable() {
    const filtered = getFilteredSubscriptions();
    const tbody = document.getElementById('sub-table-body');
    const count = document.getElementById('results-count');
    if (!tbody) return;

    if (count) count.textContent = `${filtered.length} results`;

    if (filtered.length === 0) {
        tbody.innerHTML = `
      <tr>
        <td colspan="7">
          <div class="empty-state">
            <div class="empty-state-icon">${icons.search}</div>
            <div class="empty-state-title">No subscriptions found</div>
            <div class="empty-state-text">Try adjusting your search or filter criteria</div>
          </div>
        </td>
      </tr>
    `;
        return;
    }

    tbody.innerHTML = filtered.map(sub => {
        const utilPct = getUtilization(sub.seats);
        const utilClass = getUtilizationClass(utilPct);
        const statusClass = sub.status === 'active' ? 'active' : sub.status === 'underutilized' ? 'warning' : 'neutral';
        const statusLabel = sub.status === 'underutilized' ? 'Underutilized' : 'Active';

        return `
      <tr>
        <td>
          <div class="tool-cell">
            <div class="tool-icon" style="background: ${getToolColor(sub.name)}20; color: ${getToolColor(sub.name)};">
              ${getToolInitials(sub.name)}
            </div>
            <span class="tool-name">${sub.name}</span>
          </div>
        </td>
        <td>${sub.category}</td>
        <td style="text-align: right; font-weight: 600; color: var(--color-text-primary); font-variant-numeric: tabular-nums;">
          ${formatCurrency(sub.monthlyCost)}
        </td>
        <td>
          <div class="utilization-bar">
            <div class="utilization-track">
              <div class="utilization-fill ${utilClass}" style="width: ${utilPct}%"></div>
            </div>
            <span class="utilization-text">${sub.seats.used}/${sub.seats.total}</span>
          </div>
        </td>
        <td style="font-variant-numeric: tabular-nums;">${formatDate(sub.renewalDate)}</td>
        <td><span class="status-badge ${statusClass}">${statusLabel}</span></td>
        <td style="color: var(--color-text-tertiary);">${sub.owner}</td>
      </tr>
    `;
    }).join('');
}

function bindEvents(container) {
    const searchInput = container.querySelector('#sub-search');
    if (searchInput) {
        searchInput.addEventListener('input', e => {
            currentSearch = e.target.value;
            renderTable();
        });
    }

    const categoryFilter = container.querySelector('#category-filter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', e => {
            currentFilter = e.target.value;
            renderTable();
        });
    }

    const statusFilter = container.querySelector('#status-filter');
    if (statusFilter) {
        statusFilter.addEventListener('change', () => renderTable());
    }

    // Sortable headers
    container.querySelectorAll('.sortable').forEach(th => {
        th.addEventListener('click', () => {
            const key = th.dataset.sort;
            if (currentSort.key === key) {
                currentSort.dir = currentSort.dir === 'asc' ? 'desc' : 'asc';
            } else {
                currentSort = { key, dir: 'desc' };
            }
            renderTable();
        });
    });

    // Export CSV
    const exportBtn = container.querySelector('#btn-export');
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            const filtered = getFilteredSubscriptions();
            const csv = [
                ['Tool', 'Category', 'Monthly Cost', 'Seats Used', 'Seats Total', 'Renewal Date', 'Status', 'Owner'],
                ...filtered.map(s => [s.name, s.category, s.monthlyCost, s.seats.used, s.seats.total, s.renewalDate, s.status, s.owner]),
            ].map(row => row.join(',')).join('\n');

            const blob = new Blob([csv], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'spend-subscriptions.csv';
            a.click();
            URL.revokeObjectURL(url);
        });
    }
}
