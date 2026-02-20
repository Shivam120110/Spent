// ═══════════════════════════════════════
// Settings Page
// ═══════════════════════════════════════

import { integrations } from '../data.js';
import { icons } from '../icons.js';
import { setPageTitle } from '../layout.js';
import { getAuthUser, clearAuth } from '../auth.js';

export function renderSettings(container) {
    setPageTitle('Settings');

    container.innerHTML = `
    <div class="animate-in">
      <div class="page-header">
        <h1 class="page-title">Settings</h1>
        <p class="page-description">Manage integrations, notifications, and account preferences</p>
      </div>

      <!-- Integrations -->
      <div style="margin-bottom: var(--space-6);">
        <div class="section-header">
          <div>
            <div class="section-title">Integrations</div>
            <div class="section-description">Connect your tools to enable automatic spend tracking</div>
          </div>
        </div>
        <div class="card">
          <div class="card-body no-padding">
            ${integrations.map(int => `
              <div class="integration-card">
                <div class="integration-left">
                  <div class="integration-icon" style="background: ${int.color}20; color: ${int.color};">
                    ${int.name.split(' ').map(w => w[0]).join('').substring(0, 2)}
                  </div>
                  <div>
                    <div class="integration-name">${int.name}</div>
                    <div class="integration-desc">${int.desc}</div>
                  </div>
                </div>
                <button class="btn ${int.connected ? 'btn-ghost' : 'btn-secondary'}">
                  ${int.connected ? `${icons.check} Connected` : 'Connect'}
                </button>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Notifications -->
      <div style="margin-bottom: var(--space-6);">
        <div class="section-header">
          <div>
            <div class="section-title">Notification Preferences</div>
            <div class="section-description">Control when and how you receive alerts</div>
          </div>
        </div>
        <div class="card">
          <div class="card-body" style="display: flex; flex-direction: column; gap: var(--space-4);">
            ${[
            { label: 'Underutilized seat alerts', desc: 'Notify when seats have no login activity for 30+ days', checked: true },
            { label: 'Renewal reminders', desc: 'Alert 30 days before contract renewals', checked: true },
            { label: 'Spend anomaly detection', desc: 'Flag unusual spending patterns vs trailing average', checked: true },
            { label: 'Duplicate tool detection', desc: 'Identify overlapping tools across teams', checked: false },
            { label: 'Weekly spend digest', desc: 'Receive a weekly email summary of spend changes', checked: false },
        ].map(n => `
              <div style="display: flex; align-items: center; justify-content: space-between; padding: var(--space-2) 0;">
                <div>
                  <div style="font-size: var(--text-sm); font-weight: var(--weight-medium); color: var(--color-text-primary);">${n.label}</div>
                  <div style="font-size: var(--text-xs); color: var(--color-text-tertiary); margin-top: 2px;">${n.desc}</div>
                </div>
                <label class="toggle-switch">
                  <input type="checkbox" ${n.checked ? 'checked' : ''} />
                  <span class="toggle-slider"></span>
                </label>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Data Management -->
      <div style="margin-bottom: var(--space-6);">
        <div class="section-header">
          <div>
            <div class="section-title">Data & Export</div>
            <div class="section-description">Export your spend data or manage data sources</div>
          </div>
        </div>
        <div class="card">
          <div class="card-body" style="display: flex; gap: var(--space-3);">
            <button class="btn btn-secondary">${icons.download} Export All Data (CSV)</button>
            <button class="btn btn-secondary">${icons.archive} Audit Log</button>
            <button class="btn btn-ghost">${icons.externalLink} API Documentation</button>
          </div>
        </div>
      </div>

      <!-- Profile -->
      <div style="margin-bottom: var(--space-6);">
        <div class="section-header">
          <div>
            <div class="section-title">Profile</div>
            <div class="section-description">Your account information</div>
          </div>
        </div>
        <div class="card">
          <div class="card-body">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <div style="display: flex; align-items: center; gap: var(--space-4);">
                <div class="sidebar-avatar" style="width: 48px; height: 48px; font-size: var(--text-md);">${getAuthUser()?.name?.slice(0, 2).toUpperCase() || 'JD'}</div>
                <div>
                  <div style="font-size: var(--text-md); font-weight: var(--weight-semibold); color: var(--color-text-primary);">${getAuthUser()?.name || 'Jordan Davis'}</div>
                  <div style="font-size: var(--text-sm); color: var(--color-text-tertiary); margin-top: 2px;">${getAuthUser()?.email || 'jordan@company.com'}</div>
                  <div style="font-size: var(--text-xs); color: var(--color-text-muted); margin-top: 2px;">Finance Lead</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Account -->
      <div>
        <div class="section-header">
          <div>
            <div class="section-title">Account</div>
            <div class="section-description">Manage your team and permissions</div>
          </div>
        </div>
        <div class="card">
          <div class="card-body">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <div style="display: flex; align-items: center; gap: var(--space-4);">
                <div class="sidebar-avatar" style="width: 40px; height: 40px; font-size: var(--text-sm);">${getAuthUser()?.name?.slice(0, 2).toUpperCase() || 'JD'}</div>
                <div>
                  <div style="font-size: var(--text-sm); font-weight: var(--weight-semibold); color: var(--color-text-primary);">${getAuthUser()?.name || 'Jordan Davis'}</div>
                  <div style="font-size: var(--text-xs); color: var(--color-text-tertiary);">${getAuthUser()?.email || 'jordan@company.com'} · Finance Lead</div>
                </div>
              </div>
              <div style="display: flex; gap: var(--space-3);">
                <button class="btn btn-secondary">${icons.users} Manage Team</button>
                <button class="btn btn-secondary">${icons.shield} Permissions</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Logout -->
      <div style="margin-top: var(--space-6);">
        <div class="card">
          <div class="card-body">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <div>
                <div style="font-size: var(--text-sm); font-weight: var(--weight-semibold); color: var(--color-text-primary);">Sign out</div>
                <div style="font-size: var(--text-xs); color: var(--color-text-tertiary); margin-top: 2px;">Sign out of your account</div>
              </div>
              <button class="btn btn-danger" id="logout-btn">Log out</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Logout handler
  document.getElementById('logout-btn')?.addEventListener('click', () => {
    if (confirm('Are you sure you want to log out?')) {
      clearAuth();
      window.location.hash = '#/';
    }
  });
}
