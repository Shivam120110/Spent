// ═══════════════════════════════════════
// Login Page
// ═══════════════════════════════════════

import { setAuth } from '../auth.js';

export function renderLogin(container) {
  container.innerHTML = `
    <div class="auth-page">
      <div class="auth-card">
        <a href="#/" class="auth-logo">
          <span class="auth-logo-icon">S</span>
          <span>Spend</span>
        </a>
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
  `;

  document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.email.value.trim();
    const name = email.split('@')[0] || 'User';
    setAuth({ email, name });
    window.location.hash = '#/dashboard';
  });
}
