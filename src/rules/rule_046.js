// src/rules/rule_046.js
module.exports = {
  id: 'rule_046',
  name: 'Account age + behavior scoring (heuristic)',
  defaultEnabled: true,
  async check(context) {
    const { member, recentActivity, config } = context;
    if (!member) return { action: 'none' };
    const ageMs = Date.now() - new Date(member.user?.createdAt || member.user?.createdTimestamp || Date.now()).getTime();
    let score = 0;
    if (ageMs < 1000 * 60 * 60 * 24) score += 3; // <1 day
    else if (ageMs < 1000 * 60 * 60 * 24 * 7) score += 2; // <7 days
    if ((recentActivity || []).some(a => /(discord(?:app)?\.com\/invite|discord\.gg)/i.test(a.message || ''))) score += 3;
    if (score >= 4) return { action: 'mute', reason: 'behavior_score_suspicious', details: { score } };
    return { action: 'none' };
  }
};
