// src/rules/rule_041.js
module.exports = {
  id: 'rule_041',
  name: 'Per-user mention rate limiter',
  defaultEnabled: true,
  async check(context) {
    const { message, rateLimiter, config } = context;
    if (!message || !rateLimiter) return { action: 'none' };
    const mentions = (message.mentions && (message.mentions.users.size + message.mentions.roles.size)) || 0;
    if (mentions === 0) return { action: 'none' };
    const key = `um:${message.author.id}:mentions`;
    const windowMs = (config && config.userMentionWindowMs) || 60 * 1000;
    const threshold = (config && config.userMentionThreshold) || 10;
    try {
      const count = await rateLimiter.incr(key, windowMs);
      if (count > threshold) return { action: 'mute', reason: 'user_mention_rate_limit', details: { count } };
    } catch (e) {}
    return { action: 'none' };
  }
};
