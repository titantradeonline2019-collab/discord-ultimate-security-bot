// src/rules/rule_002.js
module.exports = {
  id: 'rule_002',
  name: 'Mass-mention protection',
  defaultEnabled: true,
  async check(context) {
    const { message } = context;
    if (!message) return { action: 'none' };
    const mentionCount = (message.mentions && (message.mentions.users.size + message.mentions.roles.size)) || 0;
    if (mentionCount >= 6) {
      return { action: 'delete', reason: 'mass_mention' };
    }
    return { action: 'none' };
  }
};
