// src/rules/rule_006.js
module.exports = {
  id: 'rule_006',
  name: 'New-account protection',
  defaultEnabled: true,
  async check(context) {
    const { member } = context; // expect a GuildMember
    if (!member || !member.user) return { action: 'none' };
    const accountAgeMs = Date.now() - new Date(member.user.createdAt || member.user.createdTimestamp || Date.now()).getTime();
    const minAge = (context.config && context.config.minAccountAgeMs) || (1000 * 60 * 60 * 24 * 7); // 7 days
    if (accountAgeMs < minAge) {
      return { action: 'mute', reason: 'new_account_protection' };
    }
    return { action: 'none' };
  }
};
