// ═══════════════════════════════════════
// Profile Page — View and edit your profile
// ═══════════════════════════════════════

import { getAuthUser, setAuth } from '../auth.js';
import { icons } from '../icons.js';
import { setPageTitle } from '../layout.js';

export function renderProfile(container) {
  const user = getAuthUser();
  const name = user?.name || '';
  const email = user?.email || '';
  const initials = (name || email).slice(0, 2).toUpperCase() || 'JD';

  setPageTitle('Profile');

  container.innerHTML = `
    <div class="animate-in">
      <div class="page-header" style="display: flex; align-items: flex-start; justify-content: space-between;">
        <div>
          <h1 class="page-title">Profile</h1>
          <p class="page-description">View and update your account information</p>
        </div>
        <a href="#/settings" class="btn btn-secondary">${icons.settings} Settings</a>
      </div>

      <div class="card" style="max-width: 560px;">
        <div class="card-body">
          <div class="profile-avatar-section" style="display: flex; align-items: center; gap: var(--space-6); margin-bottom: var(--space-8);">
            <div class="sidebar-avatar" style="width: 80px; height: 80px; font-size: var(--text-2xl);">
              ${initials}
            </div>
            <div>
              <div style="font-size: var(--text-lg); font-weight: var(--weight-semibold); color: var(--color-text-primary);">${name || 'No name set'}</div>
              <div style="font-size: var(--text-sm); color: var(--color-text-tertiary); margin-top: 2px;">${email || 'No email set'}</div>
              <div style="font-size: var(--text-xs); color: var(--color-text-muted); margin-top: 4px;">Finance Lead</div>
            </div>
          </div>

          <form id="profile-form" style="display: flex; flex-direction: column; gap: var(--space-5);">
            <div class="auth-field">
              <label for="profile-name">Full name</label>
              <input type="text" id="profile-name" name="name" value="${escapeHtml(name)}" placeholder="Your name" autocomplete="name" />
            </div>
            <div class="auth-field">
              <label for="profile-email">Email</label>
              <input type="email" id="profile-email" name="email" value="${escapeHtml(email)}" placeholder="you@company.com" autocomplete="email" />
            </div>
            <div style="display: flex; gap: var(--space-3); margin-top: var(--space-2);">
              <button type="submit" class="btn btn-primary">Save changes</button>
              <a href="#/dashboard" class="btn btn-ghost">Cancel</a>
            </div>
          </form>
        </div>
      </div>

      <div class="card" style="max-width: 560px; margin-top: var(--space-6);">
        <div class="card-body">
          <div style="font-size: var(--text-sm); font-weight: var(--weight-semibold); color: var(--color-text-primary); margin-bottom: var(--space-2);">Account</div>
          <div style="font-size: var(--text-xs); color: var(--color-text-tertiary); margin-bottom: var(--space-4);">Your profile is stored locally. Changes are saved to this device.</div>
          <a href="#/settings" class="btn btn-ghost" style="padding-left: 0;">${icons.shield} Privacy & security</a>
        </div>
      </div>
    </div>
  `;

  const form = document.getElementById('profile-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const newName = form.name.value.trim();
      const newEmail = form.email.value.trim();
      if (!newEmail) {
        alert('Email is required.');
        return;
      }
      setAuth({ name: newName || newEmail.split('@')[0], email: newEmail });
      setPageTitle('Profile');
      // Re-render to show updated name/email and refresh sidebar on next layout
      renderProfile(container);
      // Force layout refresh so sidebar shows new name
      if (window.__spendRefreshLayout) window.__spendRefreshLayout();
    });
  }
}

function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
