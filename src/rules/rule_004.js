// src/rules/rule_004.js
module.exports = {
  id: 'rule_004',
  name: 'Excessive-caps detector',
  defaultEnabled: true,
  async check(context) {
    const { message } = context;
    if (!message || !message.content) return { action: 'none' };
    const text = message.content.replace(/[^A-Za-z]/g, '');
    if (text.length >= 8) {
      const caps = (text.match(/[A-Z]/g) || []).length;
      if (caps / text.length > 0.75) {
        return { action: 'delete', reason: 'excessive_caps' };
      }
    }
    return { action: 'none' };
  }
};
