// ═══════════════════════════════════════
// Dashboard Page
// ═══════════════════════════════════════

import { metrics, monthlySpend, alerts, subscriptions, formatCurrency, getToolColor, getToolInitials } from '../data.js';
import { icons } from '../icons.js';
import { setPageTitle } from '../layout.js';

export function renderDashboard(container) {
    setPageTitle('Overview');

    container.innerHTML = `
    <div class="animate-in">
      <div class="page-header">
        <h1 class="page-title">Spend Overview</h1>
        <p class="page-description">Financial snapshot across all SaaS subscriptions</p>
      </div>

      <!-- Metrics Row -->
      <div class="metrics-row stagger-in">
        <div class="metric-block">
          <div class="metric-label">Annual SaaS Spend</div>
          <div class="metric-value">${formatCurrency(metrics.annualSpend)}</div>
          <div class="metric-delta positive">
            ${icons.trendingUp} ${metrics.annualSpendDelta} vs last quarter
          </div>
        </div>
        <div class="metric-block">
          <div class="metric-label">Active Tools</div>
          <div class="metric-value">${metrics.activeTools}</div>
          <div class="metric-delta neutral">
            ${metrics.activeToolsDelta} from last month
          </div>
        </div>
        <div class="metric-block">
          <div class="metric-label">Potential Savings</div>
          <div class="metric-value">${formatCurrency(metrics.potentialSavings)}</div>
          <div class="metric-delta positive">
            ${icons.zap} ${metrics.potentialSavingsDelta}
          </div>
        </div>
        <div class="metric-block">
          <div class="metric-label">Upcoming Renewals</div>
          <div class="metric-value">${metrics.upcomingRenewals}</div>
          <div class="metric-delta neutral">
            ${icons.calendar} ${metrics.upcomingRenewalsDelta}
          </div>
        </div>
      </div>

      <!-- Spend Chart + Top Alerts -->
      <div class="grid-2" style="margin-bottom: var(--space-6);">
        <div class="card">
          <div class="card-header">
            <div>
              <div class="card-title">Monthly Spend</div>
              <div class="card-subtitle">Last 12 months trend</div>
            </div>
            <div class="filter-tabs">
              <button class="filter-tab active">12M</button>
              <button class="filter-tab">6M</button>
              <button class="filter-tab">3M</button>
            </div>
          </div>
          <div class="chart-container">
            <canvas id="spend-chart"></canvas>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <div>
              <div class="card-title">Priority Alerts</div>
              <div class="card-subtitle">${alerts.length} items need attention</div>
            </div>
            <a href="#/alerts" class="btn btn-ghost">View all ${icons.chevronRight}</a>
          </div>
          <div class="card-body no-padding">
            ${alerts.slice(0, 4).map(alert => `
              <div class="alert-card">
                <div class="alert-icon ${alert.severity}">
                  ${alert.severity === 'danger' ? icons.alertTriangle : alert.severity === 'info' ? icons.info : icons.bell}
                </div>
                <div class="alert-content">
                  <div class="alert-title">${alert.title}</div>
                  <div class="alert-description">${alert.description}</div>
                  <div class="alert-meta">
                    ${alert.savings ? `<span class="alert-savings">Potential savings: ${alert.savings}</span>` : ''}
                  </div>
                </div>
                <div class="alert-actions">
                  <button class="btn btn-secondary">${alert.action}</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Spend by Category -->
      <div class="card">
        <div class="card-header">
          <div>
            <div class="card-title">Top Spend by Tool</div>
            <div class="card-subtitle">Ranked by monthly cost</div>
          </div>
          <button class="btn btn-ghost">${icons.download} Export</button>
        </div>
        <div class="card-body no-padding">
          <table class="data-table">
            <thead>
              <tr>
                <th>Tool</th>
                <th>Category</th>
                <th style="text-align: right;">Monthly</th>
                <th style="text-align: right;">Annual</th>
                <th>Utilization</th>
              </tr>
            </thead>
            <tbody id="top-spend-table">
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;

    renderSpendChart();
    renderTopSpendTable();
}

function renderSpendChart() {
    const ctx = document.getElementById('spend-chart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: monthlySpend.map(d => d.month),
            datasets: [{
                label: 'Monthly Spend',
                data: monthlySpend.map(d => d.value),
                borderColor: '#2DD4A8',
                backgroundColor: 'rgba(45, 212, 168, 0.05)',
                fill: true,
                tension: 0.35,
                pointRadius: 0,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: '#2DD4A8',
                pointHoverBorderColor: '#0F1117',
                pointHoverBorderWidth: 2,
                borderWidth: 2,
            }],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'index',
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#1A1D27',
                    titleColor: '#B0B3BE',
                    bodyColor: '#FAFAFA',
                    borderColor: '#2A2D3A',
                    borderWidth: 1,
                    padding: 12,
                    displayColors: false,
                    titleFont: { family: 'Inter', size: 11 },
                    bodyFont: { family: 'Inter', size: 13, weight: '600' },
                    callbacks: {
                        label: ctx => formatCurrency(ctx.parsed.y),
                    },
                },
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: {
                        color: '#4A4D5A',
                        font: { family: 'Inter', size: 11 },
                    },
                    border: { display: false },
                },
                y: {
                    grid: {
                        color: 'rgba(30, 33, 48, 0.8)',
                        drawBorder: false,
                    },
                    ticks: {
                        color: '#4A4D5A',
                        font: { family: 'Inter', size: 11 },
                        callback: v => `$${(v / 1000).toFixed(0)}k`,
                        maxTicksLimit: 5,
                    },
                    border: { display: false },
                },
            },
        },
    });
}

function renderTopSpendTable() {
    const tbody = document.getElementById('top-spend-table');
    if (!tbody) return;

    const sorted = [...subscriptions].sort((a, b) => b.monthlyCost - a.monthlyCost).slice(0, 8);

    tbody.innerHTML = sorted.map(sub => {
        const utilPct = Math.round((sub.seats.used / sub.seats.total) * 100);
        const utilClass = utilPct >= 70 ? 'high' : utilPct >= 40 ? 'medium' : 'low';
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
        <td style="text-align: right; font-weight: 500; color: var(--color-text-primary);">${formatCurrency(sub.monthlyCost)}</td>
        <td style="text-align: right; color: var(--color-text-tertiary);">${formatCurrency(sub.monthlyCost * 12)}</td>
        <td>
          <div class="utilization-bar">
            <div class="utilization-track">
              <div class="utilization-fill ${utilClass}" style="width: ${utilPct}%"></div>
            </div>
            <span class="utilization-text">${sub.seats.used}/${sub.seats.total}</span>
          </div>
        </td>
      </tr>
    `;
    }).join('');
}

