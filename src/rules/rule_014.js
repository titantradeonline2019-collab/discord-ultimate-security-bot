// src/rules/rule_014.js
module.exports = {
  id: 'rule_014',
  name: 'Invite-scam phrase detector',
  defaultEnabled: true,
  async check(context) {
    const { message } = context;
    if (!message || !message.content) return { action: 'none' };
    const phrases = [/free nitro/i, /boost for/i, /get nitro/i];
    if (phrases.some(r => r.test(message.content))) return { action: 'delete', reason: 'scam_phrase' };
    return { action: 'none' };
  }
};
