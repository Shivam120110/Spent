// ═══════════════════════════════════════
// User Detail Page
// ═══════════════════════════════════════

import { getUserById, getToolsByUser, formatCurrency, getToolColor, getToolInitials } from '../data.js';
import { icons } from '../icons.js';
import { setPageTitle } from '../layout.js';

export function renderUserDetail(container, userId) {
    const user = getUserById(parseInt(userId));
    if (!user) {
        container.innerHTML = `
            <div class="animate-in">
                <div class="empty-state">
                    <div class="empty-state-icon">${icons.alertTriangle}</div>
                    <div class="empty-state-title">User not found</div>
                    <div class="empty-state-text">The user you're looking for doesn't exist.</div>
                </div>
            </div>
        `;
        return;
    }

    const tools = getToolsByUser(user.id);
    const totalMonthlyCost = tools.reduce((sum, tool) => sum + tool.monthlyCost, 0);
    const initials = user.name.split(' ').map(n => n[0]).join('').substring(0, 2);

    setPageTitle(user.name);

    container.innerHTML = `
        <div class="animate-in">
            <div class="page-header" style="display: flex; align-items: flex-start; justify-content: space-between;">
                <div style="display: flex; align-items: center; gap: var(--space-4);">
                    <div class="sidebar-avatar" style="width: 64px; height: 64px; font-size: var(--text-xl);">
                        ${initials}
                    </div>
                    <div>
                        <h1 class="page-title">${user.name}</h1>
                        <p class="page-description">${user.email}</p>
                        <div style="display: flex; gap: var(--space-3); margin-top: var(--space-2);">
                            <span style="font-size: var(--text-xs); color: var(--color-text-tertiary);">${user.department}</span>
                            <span style="font-size: var(--text-xs); color: var(--color-text-muted);">·</span>
                            <span style="font-size: var(--text-xs); color: var(--color-text-tertiary);">${user.role}</span>
                        </div>
                    </div>
                </div>
                <a href="#/subscriptions" class="btn btn-secondary">${icons.chevronRight} Back to Subscriptions</a>
            </div>

            <!-- Metrics -->
            <div class="metrics-row stagger-in" style="margin-bottom: var(--space-6);">
                <div class="metric-block">
                    <div class="metric-label">Tools Assigned</div>
                    <div class="metric-value">${tools.length}</div>
                    <div class="metric-delta neutral">Active subscriptions</div>
                </div>
                <div class="metric-block">
                    <div class="metric-label">Monthly Cost</div>
                    <div class="metric-value">${formatCurrency(totalMonthlyCost)}</div>
                    <div class="metric-delta neutral">${formatCurrency(totalMonthlyCost * 12)}/year</div>
                </div>
                <div class="metric-block">
                    <div class="metric-label">Department</div>
                    <div class="metric-value" style="font-size: var(--text-lg);">${user.department}</div>
                    <div class="metric-delta neutral">${user.role}</div>
                </div>
                <div class="metric-block">
                    <div class="metric-label">Last Active</div>
                    <div class="metric-value" style="font-size: var(--text-lg);">Today</div>
                    <div class="metric-delta neutral">Active user</div>
                </div>
            </div>

            <!-- Tools Table -->
            <div class="card">
                <div class="card-header">
                    <div>
                        <div class="card-title">Assigned Tools (${tools.length})</div>
                        <div class="card-subtitle">Tools ${user.name} has access to</div>
                    </div>
                </div>
                <div class="card-body no-padding">
                    ${tools.length > 0 ? `
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>Tool</th>
                                    <th>Category</th>
                                    <th style="text-align: right;">Monthly Cost</th>
                                    <th style="text-align: right;">Annual Cost</th>
                                    <th>Status</th>
                                    <th>Owner</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${tools.map(tool => {
                                    const statusClass = tool.status === 'active' ? 'active' : 'warning';
                                    return `
                                        <tr>
                                            <td>
                                                <div class="tool-cell">
                                                    <div class="tool-icon" style="background: ${getToolColor(tool.name)}20; color: ${getToolColor(tool.name)};">
                                                        ${getToolInitials(tool.name)}
                                                    </div>
                                                    <a href="#/tool/${tool.id}" class="tool-name" style="color: var(--color-accent); text-decoration: none;">
                                                        ${tool.name}
                                                    </a>
                                                </div>
                                            </td>
                                            <td>${tool.category}</td>
                                            <td style="text-align: right; font-weight: 500; color: var(--color-text-primary); font-variant-numeric: tabular-nums;">
                                                ${formatCurrency(tool.monthlyCost)}
                                            </td>
                                            <td style="text-align: right; color: var(--color-text-tertiary); font-variant-numeric: tabular-nums;">
                                                ${formatCurrency(tool.monthlyCost * 12)}
                                            </td>
                                            <td>
                                                <span class="status-badge ${statusClass}">${tool.status === 'active' ? 'Active' : 'Underutilized'}</span>
                                            </td>
                                            <td style="color: var(--color-text-tertiary);">${tool.owner}</td>
                                        </tr>
                                    `;
                                }).join('')}
                            </tbody>
                        </table>
                    ` : `
                        <div class="empty-state" style="padding: var(--space-8);">
                            <div class="empty-state-icon">${icons.layers}</div>
                            <div class="empty-state-title">No tools assigned</div>
                            <div class="empty-state-text">This user doesn't have access to any tools.</div>
                        </div>
                    `}
                </div>
            </div>
        </div>
    `;
}
