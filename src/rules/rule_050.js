// src/rules/rule_050.js
module.exports = {
  id: 'rule_050',
  name: 'Bot account message detector (high activity) ',
  defaultEnabled: true,
  async check(context) {
    const { recentActivity } = context;
    if (!recentActivity) return { action: 'none' };
    const counts = recentActivity.reduce((acc, a) => { acc[a.userId] = (acc[a.userId] || 0) + 1; return acc; }, {});
    for (const [uid, c] of Object.entries(counts)) {
      if (c > 50) return { action: 'mute', reason: 'high_activity_user', details: { userId: uid, count: c } };
    }
    return { action: 'none' };
  }
};
