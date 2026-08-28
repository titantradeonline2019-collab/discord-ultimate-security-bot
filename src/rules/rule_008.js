// src/rules/rule_008.js
module.exports = {
  id: 'rule_008',
  name: 'Excessive-embeds detector',
  defaultEnabled: true,
  async check(context) {
    const { message } = context;
    if (!message) return { action: 'none' };
    if (message.embeds && message.embeds.length >= 5) return { action: 'delete', reason: 'excessive_embeds' };
    return { action: 'none' };
  }
};
