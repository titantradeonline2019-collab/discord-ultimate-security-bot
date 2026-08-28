// src/rules/rule_022.js
module.exports = {
  id: 'rule_022',
  name: 'Distributed-raid detector (multiple new accounts messaging)',
  defaultEnabled: true,
  async check(context) {
    // Requires context.recentActivity: array of { userId, createdAt, message }
    const { recentActivity, config } = context;
    if (!recentActivity || recentActivity.length < 6) return { action: 'none' };
    const windowMs = (config && config.raidWindowMs) || 2 * 60 * 1000; // 2 minutes
    const now = Date.now();
    const recent = recentActivity.filter(a => now - (a.createdAt || now) < windowMs);
    // count distinct new accounts (age < threshold)
    const accAgeMs = (config && config.newAccountMs) || (1000 * 60 * 60 * 24 * 3); // 3 days
    const newAccounts = recent.filter(a => a.accountAgeMs && a.accountAgeMs < accAgeMs);
    // if many new accounts are sending messages in the window -> raid
    if (newAccounts.length >= 6) return { action: 'mute', reason: 'distributed_raid', details: { newAccounts: newAccounts.length } };
    return { action: 'none' };
  }
};
