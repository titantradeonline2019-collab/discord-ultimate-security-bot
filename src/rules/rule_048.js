// src/rules/rule_048.js
module.exports = {
  id: 'rule_048',
  name: 'Webhook content length & invite guard',
  defaultEnabled: true,
  async check(context) {
    const { message } = context;
    if (!message) return { action: 'none' };
    if (message.webhookId) {
      if ((message.content || '').length > 500) return { action: 'delete', reason: 'webhook_too_long' };
      if (/(discord(?:app)?\.com\/invite|discord\.gg)/i.test(message.content)) return { action: 'delete', reason: 'webhook_invite' };
    }
    return { action: 'none' };
  }
};
