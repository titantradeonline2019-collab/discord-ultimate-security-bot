// src/rules/rule_031.js
module.exports = {
  id: 'rule_031',
  name: 'Invite + shortener combined risk',
  defaultEnabled: true,
  async check(context) {
    const { message } = context;
    if (!message || !message.content) return { action: 'none' };
    const invite = /(discord(?:app)?\.com\/invite|discord\.gg)\/\w+/i;
    const short = /\b(?:bit\.ly|tinyurl\.com|t\.co|ow\.ly)\b/i;
    if (invite.test(message.content) && short.test(message.content)) return { action: 'delete', reason: 'invite_through_shortener' };
    return { action: 'none' };
  }
};
