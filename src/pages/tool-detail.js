// ═══════════════════════════════════════
// Tool Detail Page
// ═══════════════════════════════════════

import { getToolById, getUsersByTool, formatCurrency, formatDate, getToolColor, getToolInitials, getUtilization, getUtilizationClass } from '../data.js';
import { icons } from '../icons.js';
import { setPageTitle } from '../layout.js';

export function renderToolDetail(container, toolId) {
    const tool = getToolById(parseInt(toolId));
    if (!tool) {
        container.innerHTML = `
            <div class="animate-in">
                <div class="empty-state">
                    <div class="empty-state-icon">${icons.alertTriangle}</div>
                    <div class="empty-state-title">Tool not found</div>
                    <div class="empty-state-text">The tool you're looking for doesn't exist.</div>
                </div>
            </div>
        `;
        return;
    }

    const users = getUsersByTool(tool.id);
    const utilPct = getUtilization(tool.seats);
    const utilClass = getUtilizationClass(utilPct);
    const statusClass = tool.status === 'active' ? 'active' : 'warning';

    setPageTitle(tool.name);

    container.innerHTML = `
        <div class="animate-in">
            <div class="page-header" style="display: flex; align-items: flex-start; justify-content: space-between;">
                <div style="display: flex; align-items: center; gap: var(--space-4);">
                    <div class="tool-icon" style="width: 56px; height: 56px; font-size: var(--text-xl); background: ${getToolColor(tool.name)}20; color: ${getToolColor(tool.name)};">
                        ${getToolInitials(tool.name)}
                    </div>
                    <div>
                        <h1 class="page-title">${tool.name}</h1>
                        <p class="page-description">${tool.category} · Owned by ${tool.owner}</p>
                    </div>
                </div>
                <a href="#/subscriptions" class="btn btn-secondary">${icons.chevronRight} Back to Subscriptions</a>
            </div>

            <!-- Metrics -->
            <div class="metrics-row stagger-in" style="margin-bottom: var(--space-6);">
                <div class="metric-block">
                    <div class="metric-label">Monthly Cost</div>
                    <div class="metric-value">${formatCurrency(tool.monthlyCost)}</div>
                    <div class="metric-delta neutral">${formatCurrency(tool.monthlyCost * 12)}/year</div>
                </div>
                <div class="metric-block">
                    <div class="metric-label">Seat Utilization</div>
                    <div class="metric-value">${utilPct}%</div>
                    <div class="metric-delta ${utilClass === 'high' ? 'positive' : utilClass === 'low' ? 'negative' : 'neutral'}">
                        ${tool.seats.used}/${tool.seats.total} seats used
                    </div>
                </div>
                <div class="metric-block">
                    <div class="metric-label">Active Users</div>
                    <div class="metric-value">${users.length}</div>
                    <div class="metric-delta neutral">${tool.seats.total - users.length} unused seats</div>
                </div>
                <div class="metric-block">
                    <div class="metric-label">Renewal Date</div>
                    <div class="metric-value" style="font-size: var(--text-lg);">${formatDate(tool.renewalDate).split(',')[0]}</div>
                    <div class="metric-delta neutral">${formatDate(tool.renewalDate).split(',')[1]}</div>
                </div>
            </div>

            <!-- Status Badge -->
            <div style="margin-bottom: var(--space-6);">
                <span class="status-badge ${statusClass}" style="font-size: var(--text-sm); padding: var(--space-2) var(--space-4);">
                    ${tool.status === 'active' ? 'Active' : 'Underutilized'}
                </span>
            </div>

            <!-- Users Table -->
            <div class="card">
                <div class="card-header">
                    <div>
                        <div class="card-title">Active Users (${users.length})</div>
                        <div class="card-subtitle">Users currently using ${tool.name}</div>
                    </div>
                </div>
                <div class="card-body no-padding">
                    ${users.length > 0 ? `
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>User</th>
                                    <th>Email</th>
                                    <th>Department</th>
                                    <th>Role</th>
                                    <th>Last Active</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${users.map(user => `
                                    <tr>
                                        <td>
                                            <div class="tool-cell">
                                                <div class="sidebar-avatar" style="width: 32px; height: 32px; font-size: var(--text-xs);">
                                                    ${user.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                                                </div>
                                                <span class="tool-name">${user.name}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <a href="#/user/${user.id}" style="color: var(--color-accent); text-decoration: none;">
                                                ${user.email}
                                            </a>
                                        </td>
                                        <td>${user.department}</td>
                                        <td>${user.role}</td>
                                        <td style="color: var(--color-text-tertiary); font-variant-numeric: tabular-nums;">
                                            ${Math.floor(Math.random() * 7) + 1} days ago
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    ` : `
                        <div class="empty-state" style="padding: var(--space-8);">
                            <div class="empty-state-icon">${icons.users}</div>
                            <div class="empty-state-title">No active users</div>
                            <div class="empty-state-text">No users are currently assigned to this tool.</div>
                        </div>
                    `}
                </div>
            </div>
        </div>
    `;
}
