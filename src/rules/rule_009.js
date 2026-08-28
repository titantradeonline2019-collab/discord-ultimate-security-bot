// src/rules/rule_009.js
module.exports = {
  id: 'rule_009',
  name: 'URL shortener detector',
  defaultEnabled: true,
  async check(context) {
    const { message } = context;
    if (!message || !message.content) return { action: 'none' };
    const shorteners = /bit\.ly|tinyurl\.com|goo\.gl|t\.co/i;
    if (shorteners.test(message.content)) return { action: 'delete', reason: 'url_shortener' };
    return { action: 'none' };
  }
};
