// ═══════════════════════════════════════
// Landing Page
// ═══════════════════════════════════════

import { icons } from '../icons.js';

export function renderLanding(container) {
  container.innerHTML = `
    <div class="landing">
      <nav class="landing-nav">
        <div class="landing-logo">
          <span class="landing-logo-icon">S</span>
          <span class="landing-logo-text">Spend</span>
        </div>
        <div class="landing-nav-links">
          <a href="#/login" class="landing-nav-link">Log in</a>
          <a href="#/signup" class="landing-btn landing-btn-primary" style="white-space: nowrap;">Get started</a>
        </div>
      </nav>

      <header class="landing-hero">
        <div class="landing-hero-badge">100% SaaS spend visibility</div>
        <h1 class="landing-hero-title">
          Take control of your
          <span class="landing-hero-gradient">SaaS spend</span>
        </h1>
        <p class="landing-hero-subtitle">
          Detect underutilized seats, duplicate tools, and automate procurement.
          Get a complete financial snapshot across all subscriptions in one place.
        </p>
        <div class="landing-hero-ctas">
          <a href="#/signup" class="landing-btn landing-btn-primary landing-btn-lg">
            Start free trial
          </a>
          <a href="#/login" class="landing-btn landing-btn-secondary landing-btn-lg">
            Log in
          </a>
        </div>
        <div class="landing-hero-visual">
          <div class="landing-mockup">
            <div class="landing-mockup-header">
              <span class="landing-mockup-dot"></span>
              <span class="landing-mockup-dot"></span>
              <span class="landing-mockup-dot"></span>
            </div>
            <div class="landing-mockup-content">
              <div class="landing-mockup-metrics">
                <div class="landing-mockup-metric"><span class="metric-value">$350K</span> Annual</div>
                <div class="landing-mockup-metric"><span class="metric-value">20</span> Tools</div>
                <div class="landing-mockup-metric"><span class="metric-value">$52K</span> Savings</div>
              </div>
              <div class="landing-mockup-chart"></div>
            </div>
          </div>
        </div>
      </header>

      <section class="landing-features">
        <h2 class="landing-section-title">Everything you need to optimize spend</h2>
        <p class="landing-section-subtitle">Built for finance and ops teams who want full visibility</p>
        <div class="landing-features-grid">
          <div class="landing-feature-card">
            <div class="landing-feature-icon">${icons.dollarSign}</div>
            <h3>Spend visibility</h3>
            <p>See every subscription, renewal date, and cost in one dashboard.</p>
          </div>
          <div class="landing-feature-card">
            <div class="landing-feature-icon">${icons.users}</div>
            <h3>Seat utilization</h3>
            <p>Spot underutilized seats and unused licenses across all tools.</p>
          </div>
          <div class="landing-feature-card">
            <div class="landing-feature-icon">${icons.zap}</div>
            <h3>Savings alerts</h3>
            <p>Get actionable recommendations to reduce waste and duplicates.</p>
          </div>
          <div class="landing-feature-card">
            <div class="landing-feature-icon">${icons.calendar}</div>
            <h3>Renewal tracking</h3>
            <p>Never miss a renewal. Plan ahead and negotiate from strength.</p>
          </div>
        </div>
      </section>

      <section class="landing-social-proof">
        <p class="landing-social-proof-text">Trusted by finance teams at</p>
        <div class="landing-logos">
          <span class="landing-logo-pill">Stripe</span>
          <span class="landing-logo-pill">Vercel</span>
          <span class="landing-logo-pill">Linear</span>
          <span class="landing-logo-pill">Notion</span>
          <span class="landing-logo-pill">Figma</span>
        </div>
      </section>

      <section class="landing-testimonial">
        <blockquote class="landing-quote">
          <p>"We cut our SaaS spend by 18% in the first quarter. Spend gave us visibility we never had before."</p>
          <footer>
            <strong>Jordan Davis</strong>
            <span>Finance Lead, Acme Inc</span>
          </footer>
        </blockquote>
      </section>

      <section class="landing-stats">
        <div class="landing-stat"><span class="landing-stat-value">$350K+</span> <span class="landing-stat-label">Tracked annually</span></div>
        <div class="landing-stat"><span class="landing-stat-value">20+</span> <span class="landing-stat-label">Tools supported</span></div>
        <div class="landing-stat"><span class="landing-stat-value">30%</span> <span class="landing-stat-label">Avg. savings</span></div>
      </section>

      <section class="landing-cta">
        <h2 class="landing-cta-title">Ready to take control?</h2>
        <p class="landing-cta-subtitle">Free 14-day trial. No credit card required.</p>
        <a href="#/signup" class="landing-btn landing-btn-primary landing-btn-lg" style="white-space: nowrap;">Get started free</a>
      </section>

      <footer class="landing-footer">
        <span class="landing-logo-text">Spend</span>
        <span class="landing-footer-copy">© 2026 Spend. All rights reserved.</span>
      </footer>
    </div>
  `;
}
