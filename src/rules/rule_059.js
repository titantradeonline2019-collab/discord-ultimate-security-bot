// src/rules/rule_059.js
module.exports = {
  id: 'rule_059',
  name: 'Flood score aggregator (combines multiple rule hits in short time)',
  defaultEnabled: true,
  async check(context) {
    // context.recentRuleHits: array of { ruleId, ts }
    const { recentRuleHits } = context;
    if (!recentRuleHits) return { action: 'none' };
    const window = 60 * 1000;
    const now = Date.now();
    const hits = recentRuleHits.filter(h => now - (h.ts || 0) < window);
    if (hits.length >= 4) return { action: 'mute', reason: 'multiple_rule_hits', details: { hits: hits.length } };
    return { action: 'none' };
  }
};
