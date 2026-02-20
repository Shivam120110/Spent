// ═══════════════════════════════════════
// Signup Page
// ═══════════════════════════════════════

import { setAuth } from '../auth.js';
import { icons } from '../icons.js';

function getVisualIcon() {
  return icons.layers;
}

export function renderSignup(container) {
  container.innerHTML = `
    <div class="auth-page">
      <div class="auth-container">
        <div class="auth-left">
          <a href="#/" class="auth-logo">
            <span class="auth-logo-icon">S</span>
            <span>Spend</span>
          </a>
          <div class="auth-content">
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
        <div class="auth-right">
          <div class="auth-visual">
            <div class="auth-visual-content">
              <div class="auth-visual-icon">${getVisualIcon()}</div>
              <h2 class="auth-visual-title">Join thousands of companies</h2>
              <p class="auth-visual-text">Start optimizing your SaaS spend today and save up to 30% annually.</p>
              <div class="auth-visual-features">
                <div class="auth-visual-feature">
                  <span class="auth-visual-check">✓</span>
                  <span>14-day free trial</span>
                </div>
                <div class="auth-visual-feature">
                  <span class="auth-visual-check">✓</span>
                  <span>No credit card required</span>
                </div>
                <div class="auth-visual-feature">
                  <span class="auth-visual-check">✓</span>
                  <span>Setup in minutes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
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
