// ═══════════════════════════════════════
// Auth — Simple client-side auth state
// ═══════════════════════════════════════

const AUTH_KEY = 'spend_auth';

export function isAuthenticated() {
  try {
    const data = localStorage.getItem(AUTH_KEY);
    return !!data;
  } catch {
    return false;
  }
}

export function setAuth(user) {
  try {
    localStorage.setItem(AUTH_KEY, JSON.stringify(user || {}));
  } catch {}
}

export function clearAuth() {
  try {
    localStorage.removeItem(AUTH_KEY);
  } catch {}
}

export function getAuthUser() {
  try {
    const data = localStorage.getItem(AUTH_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}
