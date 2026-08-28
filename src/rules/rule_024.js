// src/rules/rule_024.js
module.exports = {
  id: 'rule_024',
  name: 'Zero-width / invisible character obfuscation detector',
  defaultEnabled: true,
  async check(context) {
    const { message } = context;
    if (!message || !message.content) return { action: 'none' };
    // zero-width space U+200B and other invisibles
    const invisibleRe = /[\u200B-\u200D\uFEFF\u2060]/;
    if (invisibleRe.test(message.content)) return { action: 'delete', reason: 'invisible_chars_detected' };
    return { action: 'none' };
  }
};
