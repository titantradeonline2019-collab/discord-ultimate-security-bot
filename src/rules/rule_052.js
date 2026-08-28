// src/rules/rule_052.js
module.exports = {
  id: 'rule_052',
  name: 'Repeated link reposts across channels',
  defaultEnabled: true,
  async check(context) {
    const { recentActivity, message } = context;
    if (!recentActivity || !message) return { action: 'none' };
    const urls = (message.content.match(/https?:\/\/[^\s]+/g) || []).map(u => u.toLowerCase());
    if (urls.length === 0) return { action: 'none' };
    const occurrences = recentActivity.filter(a => urls.some(u => (a.message || '').toLowerCase().includes(u)));
    if (occurrences.length >= 4) return { action: 'mute', reason: 'reposted_links', details: { occurrences: occurrences.length } };
    return { action: 'none' };
  }
};
