// src/rules/rule_054.js
module.exports = {
  id: 'rule_054',
  name: 'Channel slow-mode enforce detector (high churn by single user)',
  defaultEnabled: true,
  async check(context) {
    const { message, recentActivity, config } = context;
    if (!message || !recentActivity) return { action: 'none' };
    const userMsgs = recentActivity.filter(a => a.userId === message.author.id && a.channelId === message.channelId);
    const window = (config && config.slowModeWindowMs) || 30 * 1000;
    if (userMsgs.length >= 5) return { action: 'mute', reason: 'channel_slow_mode_violation', details: { count: userMsgs.length } };
    return { action: 'none' };
  }
};
