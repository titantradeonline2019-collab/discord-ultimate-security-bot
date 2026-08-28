// src/rules/rule_037.js
module.exports = {
  id: 'rule_037',
  name: 'Mass-role-create detector (requires roleCreate tracking)',
  defaultEnabled: true,
  async check(context) {
    // context.recentRoleCreates: array of timestamps
    const { recentRoleCreates } = context;
    if (!recentRoleCreates) return { action: 'none' };
    const windowMs = 60 * 1000;
    const now = Date.now();
    const recent = recentRoleCreates.filter(ts => now - ts < windowMs);
    if (recent.length >= 6) return { action: 'mute', reason: 'mass_role_create', details: { count: recent.length } };
    return { action: 'none' };
  }
};
