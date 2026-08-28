// src/rules/rule_028.js
module.exports = {
  id: 'rule_028',
  name: 'Cross-channel mention spam detector',
  defaultEnabled: true,
  async check(context) {
    // context.recentActivity should include messages across channels
    const { recentActivity, config } = context;
    if (!recentActivity) return { action: 'none' };
    const windowMs = (config && config.mentionRaidWindowMs) || 2 * 60 * 1000;
    const now = Date.now();
    const recent = recentActivity.filter(a => now - (a.createdAt || now) < windowMs && a.mentionsCount && a.mentionsCount >= 3);
    // many messages across channels each with mentions -> spam / raid
    if (recent.length >= 5) return { action: 'mute', reason: 'cross_channel_mention_spam', details: { count: recent.length } };
    return { action: 'none' };
  }
};
