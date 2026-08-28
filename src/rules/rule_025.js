// src/rules/rule_025.js
module.exports = {
  id: 'rule_025',
  name: 'Shortener-heavy link heuristic',
  defaultEnabled: true,
  async check(context) {
    const { message } = context;
    if (!message || !message.content) return { action: 'none' };
    const shorteners = /\b(?:bit\.ly|tinyurl\.com|goo\.gl|t\.co|ow\.ly|buff\.ly|is\.gd)\b/i;
    const count = (message.content.match(shorteners) || []).length;
    if (count >= 2) return { action: 'delete', reason: 'multiple_shorteners' };
    // also block when shortener + invite in same message
    const invite = /(discord(?:app)?\.com\/invite|discord\.gg)\/\w+/i;
    if (shorteners.test(message.content) && invite.test(message.content)) return { action: 'delete', reason: 'shortener_plus_invite' };
    return { action: 'none' };
  }
};
