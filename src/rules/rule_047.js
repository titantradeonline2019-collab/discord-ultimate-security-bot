// src/rules/rule_047.js
module.exports = {
  id: 'rule_047',
  name: 'Spammy punctuation / repeated symbol detector',
  defaultEnabled: true,
  async check(context) {
    const { message } = context;
    if (!message || !message.content) return { action: 'none' };
    const repeated = /(\W)\1{8,}/;
    if (repeated.test(message.content)) return { action: 'delete', reason: 'repeated_symbols' };
    return { action: 'none' };
  }
};
