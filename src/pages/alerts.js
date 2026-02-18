// ═══════════════════════════════════════
// Alerts & Insights Page
// ═══════════════════════════════════════

import { alerts } from '../data.js';
import { icons } from '../icons.js';
import { setPageTitle } from '../layout.js';

let activeType = 'all';

export function renderAlerts(container) {
    setPageTitle('Alerts');

    const totalSavings = alerts.reduce((sum, a) => sum + a.savingsValue, 0);
    const types = ['all', 'underutilized', 'duplicate', 'renewal', 'anomaly'];
    const typeLabels = { all: 'All', underutilized: 'Underutilized', duplicate: 'Duplicates', renewal: 'Renewals', anomaly: 'Anomalies' };

    container.innerHTML = `
    <div class="animate-in">
      <div class="page-header" style="display: flex; align-items: flex-start; justify-content: space-between;">
        <div>
          <h1 class="page-title">Alerts & Insights</h1>
          <p class="page-description">${alerts.length} items identified across your stack</p>
        </div>
        <div class="metric-block" style="min-width: 200px; text-align: right;">
          <div class="metric-label">Total Potential Savings</div>
          <div class="metric-value" style="font-size: var(--text-xl); color: var(--color-accent);">$${totalSavings.toLocaleString()}<span style="font-size: var(--text-sm); color: var(--color-text-tertiary); font-weight: 400;">/yr</span></div>
        </div>
      </div>

      <div style="margin-bottom: var(--space-4);">
        <div class="filter-tabs" id="alert-type-tabs">
          ${types.map(t => `
            <button class="filter-tab ${t === activeType ? 'active' : ''}" data-type="${t}">
              ${typeLabels[t]}
              <span style="margin-left: 4px; opacity: 0.5;">${t === 'all' ? alerts.length : alerts.filter(a => a.type === t).length}</span>
            </button>
          `).join('')}
        </div>
      </div>

      <div class="card">
        <div class="card-body no-padding" id="alerts-list">
        </div>
      </div>
    </div>
  `;

    renderAlertsList();
    bindAlertEvents(container);
}

function renderAlertsList() {
    const filtered = activeType === 'all' ? alerts : alerts.filter(a => a.type === activeType);
    const list = document.getElementById('alerts-list');
    if (!list) return;

    if (filtered.length === 0) {
        list.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">${icons.check}</div>
        <div class="empty-state-title">No alerts in this category</div>
        <div class="empty-state-text">All clear. Check back later for new insights.</div>
      </div>
    `;
        return;
    }

    list.innerHTML = filtered.map(alert => `
    <div class="alert-card">
      <div class="alert-icon ${alert.severity}">
        ${alert.severity === 'danger' ? icons.alertTriangle : alert.severity === 'info' ? icons.info : icons.bell}
      </div>
      <div class="alert-content">
        <div class="alert-title">${alert.title}</div>
        <div class="alert-description">${alert.description}</div>
        <div class="alert-meta">
          ${alert.savings ? `<span class="alert-savings">Potential savings: ${alert.savings}</span>` : ''}
          <span style="font-size: var(--text-xs); color: var(--color-text-muted);">·</span>
          <span style="font-size: var(--text-xs); color: var(--color-text-muted);">${alert.type === 'underutilized' ? 'Usage analysis' : alert.type === 'duplicate' ? 'Tool overlap' : alert.type === 'renewal' ? 'Contract review' : 'Spend analysis'}</span>
        </div>
      </div>
      <div class="alert-actions">
        <button class="btn btn-secondary">${alert.action}</button>
        <button class="btn btn-ghost" title="Dismiss">${icons.x}</button>
      </div>
    </div>
  `).join('');
}

function bindAlertEvents(container) {
    container.querySelector('#alert-type-tabs')?.addEventListener('click', e => {
        const tab = e.target.closest('.filter-tab');
        if (!tab) return;
        activeType = tab.dataset.type;
        container.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        renderAlertsList();
    });
}
