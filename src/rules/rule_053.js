// src/rules/rule_053.js
module.exports = {
  id: 'rule_053',
  name: 'Account suspicious flags aggregator',
  defaultEnabled: true,
  async check(context) {
    const { member, recentActivity } = context;
    if (!member) return { action: 'none' };
    let flags = 0;
    if (!member.user?.avatar) flags += 1;
    if ((recentActivity || []).some(a => /(discord(?:app)?\.com\/invite|discord\.gg)/i.test(a.message || ''))) flags += 2;
    if ((recentActivity || []).some(a => /bit\.ly|tinyurl\.com|t\.co/i.test(a.message || ''))) flags += 1;
    if (flags >= 3) return { action: 'mute', reason: 'aggregated_suspicious_flags', details: { flags } };
    return { action: 'none' };
  }
};
