// src/rules/rule_049.js
module.exports = {
  id: 'rule_049',
  name: 'Account duplication heuristic (same username pattern multiple times)',
  defaultEnabled: true,
  async check(context) {
    const { recentActivity } = context;
    if (!recentActivity) return { action: 'none' };
    const names = recentActivity.map(a => (a.username || '').toLowerCase());
    const freq = names.reduce((acc, n) => { acc[n] = (acc[n] || 0) + 1; return acc; }, {});
    const dup = Object.values(freq).some(c => c >= 4);
    if (dup) return { action: 'mute', reason: 'username_duplication', details: { freq } };
    return { action: 'none' };
  }
};
