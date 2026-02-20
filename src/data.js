// ═══════════════════════════════════════
// Spend — Simulated Dataset
// ═══════════════════════════════════════

const TOOL_COLORS = {
    Slack: '#E01E5A',
    Figma: '#A259FF',
    Notion: '#000000',
    HubSpot: '#FF7A59',
    GitHub: '#24292E',
    'Google Workspace': '#4285F4',
    Jira: '#0052CC',
    Zoom: '#2D8CFF',
    Salesforce: '#00A1E0',
    Datadog: '#632CA6',
    AWS: '#FF9900',
    Intercom: '#1F8DED',
    Linear: '#5E6AD2',
    Vercel: '#171717',
    Stripe: '#635BFF',
    Amplitude: '#1D3557',
    Loom: '#625DF5',
    Miro: '#FFD02F',
    '1Password': '#0094F5',
    DocuSign: '#FFCD00',
};

const TOOL_INITIALS = {};
Object.keys(TOOL_COLORS).forEach(name => {
    TOOL_INITIALS[name] = name.split(' ').map(w => w[0]).join('').substring(0, 2);
});

export const subscriptions = [
    { id: 1, name: 'Slack', category: 'Communication', monthlyCost: 1280, seats: { used: 142, total: 180 }, renewalDate: '2026-04-12', status: 'active', owner: 'IT Team' },
    { id: 2, name: 'Figma', category: 'Design', monthlyCost: 720, seats: { used: 18, total: 35 }, renewalDate: '2026-03-28', status: 'underutilized', owner: 'Design Team' },
    { id: 3, name: 'Notion', category: 'Productivity', monthlyCost: 480, seats: { used: 89, total: 120 }, renewalDate: '2026-05-15', status: 'active', owner: 'Operations' },
    { id: 4, name: 'HubSpot', category: 'Sales & CRM', monthlyCost: 3200, seats: { used: 45, total: 50 }, renewalDate: '2026-04-04', status: 'active', owner: 'Sales Team' },
    { id: 5, name: 'GitHub', category: 'Development', monthlyCost: 840, seats: { used: 62, total: 75 }, renewalDate: '2026-06-20', status: 'active', owner: 'Engineering' },
    { id: 6, name: 'Google Workspace', category: 'Productivity', monthlyCost: 2160, seats: { used: 178, total: 180 }, renewalDate: '2026-07-01', status: 'active', owner: 'IT Team' },
    { id: 7, name: 'Jira', category: 'Project Management', monthlyCost: 620, seats: { used: 38, total: 65 }, renewalDate: '2026-03-15', status: 'underutilized', owner: 'Engineering' },
    { id: 8, name: 'Zoom', category: 'Communication', monthlyCost: 540, seats: { used: 95, total: 100 }, renewalDate: '2026-08-10', status: 'active', owner: 'IT Team' },
    { id: 9, name: 'Salesforce', category: 'Sales & CRM', monthlyCost: 4800, seats: { used: 22, total: 40 }, renewalDate: '2026-05-22', status: 'underutilized', owner: 'Sales Team' },
    { id: 10, name: 'Datadog', category: 'DevOps', monthlyCost: 1850, seats: { used: 12, total: 15 }, renewalDate: '2026-09-01', status: 'active', owner: 'Engineering' },
    { id: 11, name: 'AWS', category: 'Infrastructure', monthlyCost: 8400, seats: { used: 8, total: 10 }, renewalDate: '2026-12-31', status: 'active', owner: 'Engineering' },
    { id: 12, name: 'Intercom', category: 'Support', monthlyCost: 960, seats: { used: 6, total: 15 }, renewalDate: '2026-04-18', status: 'underutilized', owner: 'Support Team' },
    { id: 13, name: 'Linear', category: 'Project Management', monthlyCost: 320, seats: { used: 42, total: 50 }, renewalDate: '2026-06-05', status: 'active', owner: 'Engineering' },
    { id: 14, name: 'Vercel', category: 'Infrastructure', monthlyCost: 420, seats: { used: 8, total: 10 }, renewalDate: '2026-07-15', status: 'active', owner: 'Engineering' },
    { id: 15, name: 'Stripe', category: 'Finance', monthlyCost: 280, seats: { used: 5, total: 5 }, renewalDate: '2026-03-01', status: 'active', owner: 'Finance' },
    { id: 16, name: 'Amplitude', category: 'Analytics', monthlyCost: 1100, seats: { used: 14, total: 30 }, renewalDate: '2026-05-10', status: 'underutilized', owner: 'Product Team' },
    { id: 17, name: 'Loom', category: 'Communication', monthlyCost: 240, seats: { used: 28, total: 80 }, renewalDate: '2026-04-25', status: 'underutilized', owner: 'Operations' },
    { id: 18, name: 'Miro', category: 'Design', monthlyCost: 380, seats: { used: 15, total: 25 }, renewalDate: '2026-08-20', status: 'active', owner: 'Design Team' },
    { id: 19, name: '1Password', category: 'Security', monthlyCost: 360, seats: { used: 170, total: 180 }, renewalDate: '2026-10-01', status: 'active', owner: 'IT Team' },
    { id: 20, name: 'DocuSign', category: 'Legal', monthlyCost: 280, seats: { used: 4, total: 10 }, renewalDate: '2026-03-20', status: 'underutilized', owner: 'Legal Team' },
];

export const alerts = [
    {
        id: 1,
        type: 'underutilized',
        severity: 'warning',
        tool: 'Figma',
        title: '17 underutilized seats — Figma',
        description: 'No activity in 45 days for 17 of 35 licensed seats.',
        savings: '$5,040/yr',
        savingsValue: 5040,
        action: 'Review Users',
    },
    {
        id: 2,
        type: 'underutilized',
        severity: 'warning',
        tool: 'Salesforce',
        title: '18 underutilized seats — Salesforce',
        description: 'No login activity in 30 days for 18 of 40 licensed seats.',
        savings: '$25,920/yr',
        savingsValue: 25920,
        action: 'Review Users',
    },
    {
        id: 3,
        type: 'duplicate',
        severity: 'info',
        tool: 'Jira + Linear',
        title: 'Duplicate tools detected — Project Management',
        description: 'Both Jira ($620/mo) and Linear ($320/mo) serve overlapping functions. 24 users have accounts on both.',
        savings: '$3,840/yr',
        savingsValue: 3840,
        action: 'Compare Tools',
    },
    {
        id: 4,
        type: 'renewal',
        severity: 'warning',
        tool: 'Stripe',
        title: 'Renewal in 10 days — Stripe',
        description: 'Annual renewal on Mar 1, 2026. Current spend: $3,360/yr.',
        savings: null,
        savingsValue: 0,
        action: 'Review Contract',
    },
    {
        id: 5,
        type: 'underutilized',
        severity: 'danger',
        tool: 'Loom',
        title: '52 unused seats — Loom',
        description: '0 logins in 60 days for 52 of 80 seats. Consider downgrading plan.',
        savings: '$1,872/yr',
        savingsValue: 1872,
        action: 'Review Users',
    },
    {
        id: 6,
        type: 'underutilized',
        severity: 'warning',
        tool: 'Intercom',
        title: '9 underutilized seats — Intercom',
        description: 'No activity in 42 days for 9 of 15 licensed seats.',
        savings: '$6,912/yr',
        savingsValue: 6912,
        action: 'Review Users',
    },
    {
        id: 7,
        type: 'anomaly',
        severity: 'danger',
        tool: 'AWS',
        title: 'Spend anomaly — AWS',
        description: 'Monthly spend increased 23% vs. trailing average ($8,400 vs $6,830).',
        savings: null,
        savingsValue: 0,
        action: 'Investigate',
    },
    {
        id: 8,
        type: 'underutilized',
        severity: 'warning',
        tool: 'Amplitude',
        title: '16 underutilized seats — Amplitude',
        description: 'No login activity in 35 days for 16 of 30 licensed seats.',
        savings: '$7,040/yr',
        savingsValue: 7040,
        action: 'Review Users',
    },
    {
        id: 9,
        type: 'underutilized',
        severity: 'warning',
        tool: 'DocuSign',
        title: '6 underutilized seats — DocuSign',
        description: 'No usage in 50 days for 6 of 10 licensed seats.',
        savings: '$2,016/yr',
        savingsValue: 2016,
        action: 'Review Users',
    },
    {
        id: 10,
        type: 'renewal',
        severity: 'warning',
        tool: 'Jira',
        title: 'Renewal in 25 days — Jira',
        description: 'Annual renewal on Mar 15, 2026. Consider consolidating with Linear.',
        savings: '$7,440/yr',
        savingsValue: 7440,
        action: 'Review Contract',
    },
];

export const monthlySpend = [
    { month: 'Mar', value: 24800 },
    { month: 'Apr', value: 25200 },
    { month: 'May', value: 26100 },
    { month: 'Jun', value: 25800 },
    { month: 'Jul', value: 27300 },
    { month: 'Aug', value: 26900 },
    { month: 'Sep', value: 27800 },
    { month: 'Oct', value: 28200 },
    { month: 'Nov', value: 27600 },
    { month: 'Dec', value: 28900 },
    { month: 'Jan', value: 29100 },
    { month: 'Feb', value: 29210 },
];

export const metrics = {
    annualSpend: 350520,
    annualSpendDelta: '+3.2%',
    activeTools: 20,
    activeToolsDelta: '+2',
    potentialSavings: 52640,
    potentialSavingsDelta: 'Identified',
    upcomingRenewals: 4,
    upcomingRenewalsDelta: 'Next 30 days',
};

export function getToolColor(name) {
    return TOOL_COLORS[name] || '#5C5F6A';
}

export function getToolInitials(name) {
    return TOOL_INITIALS[name] || name.substring(0, 2).toUpperCase();
}

export function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
}

export function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function getUtilization(seats) {
    return Math.round((seats.used / seats.total) * 100);
}

export function getUtilizationClass(pct) {
    if (pct >= 70) return 'high';
    if (pct >= 40) return 'medium';
    return 'low';
}

export const categories = [...new Set(subscriptions.map(s => s.category))].sort();

export const integrations = [
    { name: 'Google Workspace', desc: 'Sync user accounts and login activity', connected: true, color: '#4285F4' },
    { name: 'Okta', desc: 'SSO and identity management data', connected: true, color: '#007DC1' },
    { name: 'Slack', desc: 'Team activity and usage signals', connected: false, color: '#E01E5A' },
    { name: 'Quickbooks', desc: 'Invoice and payment reconciliation', connected: false, color: '#2CA01C' },
    { name: 'Stripe', desc: 'Subscription billing and charges', connected: true, color: '#635BFF' },
    { name: 'AWS', desc: 'Cloud infrastructure spend tracking', connected: false, color: '#FF9900' },
];

// User data with tool assignments
export const users = [
    { id: 1, name: 'Alex Chen', email: 'alex.chen@company.com', department: 'Engineering', role: 'Senior Engineer', tools: [1, 5, 6, 7, 13, 14, 19] },
    { id: 2, name: 'Sarah Johnson', email: 'sarah.johnson@company.com', department: 'Design', role: 'Design Lead', tools: [2, 3, 18] },
    { id: 3, name: 'Michael Rodriguez', email: 'michael.rodriguez@company.com', department: 'Sales', role: 'Sales Manager', tools: [1, 4, 9, 6] },
    { id: 4, name: 'Emily Davis', email: 'emily.davis@company.com', department: 'Product', role: 'Product Manager', tools: [1, 3, 7, 13, 16] },
    { id: 5, name: 'David Kim', email: 'david.kim@company.com', department: 'Engineering', role: 'DevOps Engineer', tools: [1, 5, 6, 10, 11, 14, 19] },
    { id: 6, name: 'Jessica Martinez', email: 'jessica.martinez@company.com', department: 'Support', role: 'Support Lead', tools: [1, 6, 12] },
    { id: 7, name: 'Ryan Thompson', email: 'ryan.thompson@company.com', department: 'Finance', role: 'Finance Analyst', tools: [1, 6, 15, 19] },
    { id: 8, name: 'Lisa Wang', email: 'lisa.wang@company.com', department: 'Operations', role: 'Operations Manager', tools: [1, 3, 6, 17, 19] },
    { id: 9, name: 'James Wilson', email: 'james.wilson@company.com', department: 'Engineering', role: 'Engineering Manager', tools: [1, 5, 6, 7, 10, 13, 19] },
    { id: 10, name: 'Amanda Brown', email: 'amanda.brown@company.com', department: 'Design', role: 'UI Designer', tools: [1, 2, 3, 18] },
    { id: 11, name: 'Robert Taylor', email: 'robert.taylor@company.com', department: 'Sales', role: 'Account Executive', tools: [1, 4, 6, 8, 9] },
    { id: 12, name: 'Maria Garcia', email: 'maria.garcia@company.com', department: 'Legal', role: 'Legal Counsel', tools: [1, 6, 20, 19] },
    { id: 13, name: 'Kevin Lee', email: 'kevin.lee@company.com', department: 'Engineering', role: 'Backend Engineer', tools: [1, 5, 6, 10, 11, 13, 19] },
    { id: 14, name: 'Nicole Anderson', email: 'nicole.anderson@company.com', department: 'Product', role: 'Product Designer', tools: [1, 2, 3, 7, 13, 16] },
    { id: 15, name: 'Christopher Moore', email: 'christopher.moore@company.com', department: 'IT', role: 'IT Administrator', tools: [1, 6, 8, 19] },
    { id: 16, name: 'Shivam Kumar', email: 'shivam.kumar.som.2428@company.com', department: 'Finance', role: 'Finance Lead', tools: [1, 4, 6, 9, 15, 19] },
    { id: 17, name: 'Jennifer White', email: 'jennifer.white@company.com', department: 'Support', role: 'Customer Success', tools: [1, 6, 12, 17] },
    { id: 18, name: 'Daniel Harris', email: 'daniel.harris@company.com', department: 'Engineering', role: 'Frontend Engineer', tools: [1, 2, 5, 6, 13, 14, 19] },
    { id: 19, name: 'Rachel Green', email: 'rachel.green@company.com', department: 'Marketing', role: 'Marketing Manager', tools: [1, 3, 6, 16] },
    { id: 20, name: 'Thomas Clark', email: 'thomas.clark@company.com', department: 'Engineering', role: 'QA Engineer', tools: [1, 5, 6, 7, 13, 19] },
];

// Helper functions
export function getUsersByTool(toolId) {
    return users.filter(user => user.tools.includes(toolId));
}

export function getToolsByUser(userId) {
    const user = users.find(u => u.id === userId);
    if (!user) return [];
    return subscriptions.filter(sub => user.tools.includes(sub.id));
}

export function getUserById(userId) {
    return users.find(u => u.id === userId);
}

export function getToolById(toolId) {
    return subscriptions.find(s => s.id === toolId);
}

export function searchUsers(query) {
    const q = query.toLowerCase();
    return users.filter(user => 
        user.name.toLowerCase().includes(q) || 
        user.email.toLowerCase().includes(q) ||
        user.department.toLowerCase().includes(q) ||
        user.role.toLowerCase().includes(q)
    );
}

export function searchTools(query) {
    const q = query.toLowerCase();
    return subscriptions.filter(tool => 
        tool.name.toLowerCase().includes(q) || 
        tool.category.toLowerCase().includes(q) ||
        tool.owner.toLowerCase().includes(q)
    );
}
