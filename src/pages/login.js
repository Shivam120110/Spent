// ═══════════════════════════════════════
// Login Page
// ═══════════════════════════════════════

import { setAuth } from '../auth.js';
import { icons } from '../icons.js';

function getVisualIcon() {
  return icons.dashboard;
}

export function renderLogin(container) {
  container.innerHTML = `
    <div class="auth-page">
      <div class="auth-container">
        <div class="auth-left">
          <a href="#/" class="auth-logo">
            <span class="auth-logo-icon">S</span>
            <span>Spend</span>
          </a>
          <div class="auth-content">
            <h1 class="auth-title">Welcome back</h1>
            <p class="auth-subtitle">Log in to your account to continue</p>
            <form class="auth-form" id="login-form">
              <div class="auth-field">
                <label for="login-email">Email</label>
                <input type="email" id="login-email" name="email" placeholder="you@company.com" required autocomplete="email" />
              </div>
              <div class="auth-field">
                <label for="login-password">Password</label>
                <input type="password" id="login-password" name="password" placeholder="••••••••" required autocomplete="current-password" />
              </div>
              <button type="submit" class="auth-submit">Log in</button>
            </form>
            <p class="auth-footer">
              Don't have an account? <a href="#/signup">Sign up</a>
            </p>
          </div>
        </div>
        <div class="auth-right">
          <div class="auth-visual">
            <div class="auth-visual-content">
              <div class="auth-visual-icon">${getVisualIcon()}</div>
              <h2 class="auth-visual-title">Take control of your SaaS spend</h2>
              <p class="auth-visual-text">Track subscriptions, optimize costs, and save thousands annually.</p>
              <div class="auth-visual-features">
                <div class="auth-visual-feature">
                  <span class="auth-visual-check">✓</span>
                  <span>100% spend visibility</span>
                </div>
                <div class="auth-visual-feature">
                  <span class="auth-visual-check">✓</span>
                  <span>Automated cost optimization</span>
                </div>
                <div class="auth-visual-feature">
                  <span class="auth-visual-check">✓</span>
                  <span>Real-time alerts & insights</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.email.value.trim();
    const name = email.split('@')[0] || 'User';
    setAuth({ email, name });
    window.location.hash = '#/dashboard';
  });
}
