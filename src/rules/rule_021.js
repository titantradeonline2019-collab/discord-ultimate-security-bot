// src/rules/rule_021.js
module.exports = {
  id: 'rule_021',
  name: 'Join-rate / join-flood detector',
  defaultEnabled: true,
  async check(context) {
    // context should provide guildId and optionally a joinCountWindowMs and joinThreshold
    const { member, guildId, rateLimiter } = context;
    if (!guildId || !rateLimiter) return { action: 'none' };
    // Use a guild-scoped counter for joins: key = joins:{guildId}
    const key = `joins:${guildId}`;
    const windowMs = (context.config && context.config.joinWindowMs) || 60 * 1000; // 1 minute
    const threshold = (context.config && context.config.joinThreshold) || 8; // 8 joins per minute
    try {
      const count = await rateLimiter.incr(key, windowMs);
      if (count >= threshold) {
        return { action: 'mute', reason: 'join_flood_detected', details: { count } };
      }
    } catch (e) {
      // conservative: do nothing
      return { action: 'none' };
    }
    return { action: 'none' };
  }
};
