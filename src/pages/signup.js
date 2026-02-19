// ═══════════════════════════════════════
// Signup Page
// ═══════════════════════════════════════

import { setAuth } from '../auth.js';

export function renderSignup(container) {
  container.innerHTML = `
    <div class="auth-page">
      <div class="auth-card">
        <a href="#/" class="auth-logo">
          <span class="auth-logo-icon">S</span>
          <span>Spend</span>
        </a>
        <h1 class="auth-title">Create your account</h1>
        <p class="auth-subtitle">Start your 14-day free trial. No credit card required.</p>
        <form class="auth-form" id="signup-form">
          <div class="auth-field">
            <label for="signup-name">Full name</label>
            <input type="text" id="signup-name" name="name" placeholder="Jordan Davis" required autocomplete="name" />
          </div>
          <div class="auth-field">
            <label for="signup-email">Work email</label>
            <input type="email" id="signup-email" name="email" placeholder="you@company.com" required autocomplete="email" />
          </div>
          <div class="auth-field">
            <label for="signup-password">Password</label>
            <input type="password" id="signup-password" name="password" placeholder="••••••••" required minlength="8" autocomplete="new-password" />
          </div>
          <button type="submit" class="auth-submit">Create account</button>
        </form>
        <p class="auth-footer">
          Already have an account? <a href="#/login">Log in</a>
        </p>
      </div>
    </div>
  `;

  document.getElementById('signup-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim();
    setAuth({ email, name });
    window.location.hash = '#/dashboard';
  });
}
