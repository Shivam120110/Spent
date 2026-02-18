// ═══════════════════════════════════════
// Renewals Timeline Page
// ═══════════════════════════════════════

import { subscriptions, formatCurrency, formatDate, getToolColor, getToolInitials } from '../data.js';
import { icons } from '../icons.js';
import { setPageTitle } from '../layout.js';

let activePeriod = 90;

export function renderRenewals(container) {
    setPageTitle('Renewals');

    container.innerHTML = `
    <div class="animate-in">
      <div class="page-header" style="display: flex; align-items: flex-start; justify-content: space-between;">
        <div>
          <h1 class="page-title">Renewal Timeline</h1>
          <p class="page-description">Upcoming contract renewals and deadlines</p>
        </div>
        <div class="filter-tabs" id="period-tabs">
          <button class="filter-tab ${activePeriod === 30 ? 'active' : ''}" data-period="30">30 days</button>
          <button class="filter-tab ${activePeriod === 60 ? 'active' : ''}" data-period="60">60 days</button>
          <button class="filter-tab ${activePeriod === 90 ? 'active' : ''}" data-period="90">90 days</button>
          <button class="filter-tab" data-period="365">All</button>
        </div>
      </div>

      <div id="renewal-summary" style="margin-bottom: var(--space-6);"></div>
      <div class="card">
        <div class="card-body" id="renewal-timeline">
        </div>
      </div>
    </div>
  `;

    renderTimeline();
    bindRenewalEvents(container);
}

function getRenewals(days) {
    const now = new Date();
    const cutoff = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);

    return [...subscriptions]
        .filter(s => {
            const d = new Date(s.renewalDate);
            return d >= now && d <= cutoff;
        })
        .sort((a, b) => new Date(a.renewalDate) - new Date(b.renewalDate));
}

function groupByMonth(renewals) {
    const groups = {};
    renewals.forEach(r => {
        const d = new Date(r.renewalDate);
        const key = d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        if (!groups[key]) groups[key] = [];
        groups[key].push(r);
    });
    return groups;
}

function renderTimeline() {
    const renewals = getRenewals(activePeriod);
    const totalUpcoming = renewals.reduce((sum, r) => sum + r.monthlyCost * 12, 0);
    const groups = groupByMonth(renewals);

    // Summary
    const summary = document.getElementById('renewal-summary');
    if (summary) {
        summary.innerHTML = `
      <div class="metrics-row" style="grid-template-columns: repeat(3, 1fr);">
        <div class="metric-block">
          <div class="metric-label">Renewals in Period</div>
          <div class="metric-value">${renewals.length}</div>
          <div class="metric-delta neutral">${activePeriod === 365 ? 'All upcoming' : `Next ${activePeriod} days`}</div>
        </div>
        <div class="metric-block">
          <div class="metric-label">Total Annual Value</div>
          <div class="metric-value">${formatCurrency(totalUpcoming)}</div>
          <div class="metric-delta neutral">At risk of auto-renewal</div>
        </div>
        <div class="metric-block">
          <div class="metric-label">Next Renewal</div>
          <div class="metric-value">${renewals.length > 0 ? formatDate(renewals[0].renewalDate) : '—'}</div>
          <div class="metric-delta neutral">${renewals.length > 0 ? renewals[0].name : 'None scheduled'}</div>
        </div>
      </div>
    `;
    }

    // Timeline
    const timeline = document.getElementById('renewal-timeline');
    if (!timeline) return;

    if (renewals.length === 0) {
        timeline.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">${icons.calendar}</div>
        <div class="empty-state-title">No renewals in this period</div>
        <div class="empty-state-text">Expand the time range to see upcoming renewals.</div>
      </div>
    `;
        return;
    }

    timeline.innerHTML = `
    <div class="timeline">
      ${Object.entries(groups).map(([month, items]) => `
        <div class="timeline-group">
          <div class="timeline-date-label">${month}</div>
          ${items.map(item => `
            <div class="timeline-item">
              <div class="timeline-item-left">
                <div class="timeline-item-icon" style="background: ${getToolColor(item.name)}20; color: ${getToolColor(item.name)};">
                  ${getToolInitials(item.name)}
                </div>
                <div>
                  <div class="timeline-item-name">${item.name}</div>
                  <div class="timeline-item-owner">${item.owner} · ${item.category}</div>
                </div>
              </div>
              <div class="timeline-item-right">
                <div class="timeline-item-cost">
                  ${formatCurrency(item.monthlyCost * 12)}
                  <small>${formatDate(item.renewalDate)}</small>
                </div>
                <span class="status-badge ${item.status === 'underutilized' ? 'warning' : 'info'}">
                  ${item.status === 'underutilized' ? 'Review' : 'On track'}
                </span>
                <button class="btn btn-secondary">Review</button>
              </div>
            </div>
          `).join('')}
        </div>
      `).join('')}
    </div>
  `;
}

function bindRenewalEvents(container) {
    container.querySelector('#period-tabs')?.addEventListener('click', e => {
        const tab = e.target.closest('.filter-tab');
        if (!tab) return;
        activePeriod = parseInt(tab.dataset.period);
        container.querySelectorAll('#period-tabs .filter-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        renderTimeline();
    });
}
