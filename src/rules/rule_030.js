// src/rules/rule_030.js
module.exports = {
  id: 'rule_030',
  name: 'Excessive attachments detector',
  defaultEnabled: true,
  async check(context) {
    const { message } = context;
    if (!message || !message.attachments) return { action: 'none' };
    const cnt = message.attachments.size || 0;
    if (cnt >= 4) return { action: 'delete', reason: 'too_many_attachments' };
    return { action: 'none' };
  }
};
