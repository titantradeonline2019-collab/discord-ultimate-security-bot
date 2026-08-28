// src/rules/rule_010.js
module.exports = {
  id: 'rule_010',
  name: 'Mention-everyone detector',
  defaultEnabled: true,
  async check(context) {
    const { message } = context;
    if (!message || !message.content) return { action: 'none' };
    if (message.mentions && (message.mentions.everyone || message.content.includes('@everyone') || message.content.includes('@here'))) {
      return { action: 'delete', reason: 'everyone_mention' };
    }
    return { action: 'none' };
  }
};
