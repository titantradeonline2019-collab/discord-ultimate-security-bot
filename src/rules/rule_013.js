// src/rules/rule_013.js
module.exports = {
  id: 'rule_013',
  name: 'Suspicious punctuation / obfuscation',
  defaultEnabled: true,
  async check(context) {
    const { message } = context;
    if (!message || !message.content) return { action: 'none' };
    const weird = /\b(via|free|click)\b.*\./i;
    if (weird.test(message.content)) return { action: 'delete', reason: 'suspicious_obfuscation' };
    return { action: 'none' };
  }
};
