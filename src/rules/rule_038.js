// src/rules/rule_038.js
module.exports = {
  id: 'rule_038',
  name: 'Channel spam detector (high messages per channel)',
  defaultEnabled: true,
  async check(context) {
    const { channelId, rateLimiter, config } = context;
    if (!channelId || !rateLimiter) return { action: 'none' };
    const key = `chmsg:${channelId}`;
    const windowMs = (config && config.channelWindowMs) || 30 * 1000; // 30s
    const threshold = (config && config.channelThreshold) || 80; // 80 messages per 30s
    try {
      const count = await rateLimiter.incr(key, windowMs);
      if (count >= threshold) return { action: 'mute', reason: 'channel_spam', details: { count } };
    } catch (e) {}
    return { action: 'none' };
  }
};
