// src/rules/rule_042.js
module.exports = {
  id: 'rule_042',
  name: 'Per-user invite posting limiter',
  defaultEnabled: true,
  async check(context) {
    const { message, rateLimiter, config } = context;
    if (!message || !rateLimiter) return { action: 'none' };
    const invite = /(discord(?:app)?\.com\/invite|discord\.gg)\/[A-za-z0-9\-]+/i;
    if (!invite.test(message.content)) return { action: 'none' };
    const key = `uinv:${message.author.id}`;
    const windowMs = (config && config.userInviteWindowMs) || 60 * 60 * 1000; // 1h
    const threshold = (config && config.userInviteThreshold) || 3;
    try {
      const count = await rateLimiter.incr(key, windowMs);
      if (count > threshold) return { action: 'mute', reason: 'user_invite_limit', details: { count } };
    } catch (e) {}
    return { action: 'none' };
  }
};
