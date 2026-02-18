// ═══════════════════════════════════════
// Onboarding Checklist
// ═══════════════════════════════════════

import { icons } from '../icons.js';

const STORAGE_KEY = 'spend_onboarding_dismissed';

const steps = [
    { id: 'connect', label: 'Connect your tools', desc: 'Link Google Workspace, Okta, or Slack to sync data', completed: true },
    { id: 'review', label: 'Review subscriptions', desc: 'Verify your detected SaaS inventory', completed: true },
    { id: 'alerts', label: 'Configure alerts', desc: 'Set thresholds for underutilized seats and renewals', completed: false },
    { id: 'savings', label: 'Review savings opportunities', desc: 'Explore identified optimizations across your stack', completed: false },
];

export function showOnboarding() {
    if (localStorage.getItem(STORAGE_KEY)) return;

    const completedCount = steps.filter(s => s.completed).length;

    const overlay = document.createElement('div');
    overlay.className = 'onboarding-overlay';
    overlay.innerHTML = `
    <div class="onboarding-modal">
      <div class="onboarding-header">
        <div class="onboarding-title">Welcome to Spend</div>
        <div class="onboarding-subtitle">Complete setup to unlock full spend visibility</div>
        <div class="onboarding-progress">
          ${steps.map((s, i) => `
            <div class="onboarding-progress-bar ${i < completedCount ? 'filled' : ''}"></div>
          `).join('')}
        </div>
      </div>
      <div class="onboarding-steps">
        ${steps.map(step => `
          <div class="onboarding-step ${step.completed ? 'completed' : ''}" data-step="${step.id}">
            <div class="onboarding-step-check">
              ${step.completed ? icons.check : ''}
            </div>
            <div>
              <div class="onboarding-step-text">${step.label}</div>
              <div class="onboarding-step-desc">${step.desc}</div>
            </div>
          </div>
        `).join('')}
      </div>
      <div class="onboarding-footer">
        <button class="onboarding-skip" id="onboarding-skip">Skip for now</button>
        <button class="btn btn-primary" id="onboarding-continue">Continue Setup</button>
      </div>
    </div>
  `;

    document.body.appendChild(overlay);

    overlay.querySelector('#onboarding-skip')?.addEventListener('click', () => {
        localStorage.setItem(STORAGE_KEY, 'true');
        overlay.style.animation = 'fadeIn 0.2s ease reverse';
        setTimeout(() => overlay.remove(), 200);
    });

    overlay.querySelector('#onboarding-continue')?.addEventListener('click', () => {
        localStorage.setItem(STORAGE_KEY, 'true');
        overlay.style.animation = 'fadeIn 0.2s ease reverse';
        setTimeout(() => {
            overlay.remove();
            window.location.hash = '#/settings';
        }, 200);
    });

    overlay.addEventListener('click', e => {
        if (e.target === overlay) {
            localStorage.setItem(STORAGE_KEY, 'true');
            overlay.style.animation = 'fadeIn 0.2s ease reverse';
            setTimeout(() => overlay.remove(), 200);
        }
    });
}
