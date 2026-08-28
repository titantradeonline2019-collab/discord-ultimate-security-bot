// src/rules/rule_036.js
module.exports = {
  id: 'rule_036',
  name: 'Webhook impersonation heuristic (placeholder)',
  defaultEnabled: true,
  async check(context) {
    // Detect if a message came from a webhook-like author and content includes suspicious invite/link
    // This requires message.webhookId to be present by your handler
    const { message } = context;
    if (!message) return { action: 'none' };
    if (message.webhookId && /(discord(?:app)?\.com\/invite|discord\.gg|https?:\/\/)/i.test(message.content)) {
      return { action: 'delete', reason: 'webhook_invite_post' };
    }
    return { action: 'none' };
  }
};
