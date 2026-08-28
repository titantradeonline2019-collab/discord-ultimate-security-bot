// src/rules/rule_055.js
module.exports = {
  id: 'rule_055',
  name: 'Repeated account join + message pattern (account farm detection)',
  defaultEnabled: true,
  async check(context) {
    const { recentActivity } = context;
    if (!recentActivity) return { action: 'none' };
    // detect pattern where multiple accounts with similar usernames join and post similar messages
    const msgs = recentActivity.map(a => (a.message || '').replace(/\d+/g, ''));
    const uniqueMsgs = new Set(msgs);
    if (recentActivity.length >= 8 && uniqueMsgs.size <= 3) return { action: 'mute', reason: 'account_farm_pattern', details: { recent: recentActivity.length, uniqueMsgs: uniqueMsgs.size } };
    return { action: 'none' };
  }
};
