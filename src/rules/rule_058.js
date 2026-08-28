// src/rules/rule_058.js
module.exports = {
  id: 'rule_058',
  name: 'Expired invite reuse detector',
  defaultEnabled: true,
  async check(context) {
    const { message } = context;
    if (!message || !message.content) return { action: 'none' };
    // placeholder: detect invites with suspicious query params or tokens
    if (/discord(?:app)?\.com\/invite\/[A-Za-z0-9_-]+\?/.test(message.content)) return { action: 'delete', reason: 'invite_with_query_params' };
    return { action: 'none' };
  }
};
