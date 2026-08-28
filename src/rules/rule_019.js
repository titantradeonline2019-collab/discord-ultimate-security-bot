// src/rules/rule_019.js
module.exports = {
  id: 'rule_019',
  name: 'Join-rate protection (placeholder)',
  defaultEnabled: true,
  async check(context) {
    // Implementing join flood protection requires tracking guildMemberAdd events.
    return { action: 'none' };
  }
};
