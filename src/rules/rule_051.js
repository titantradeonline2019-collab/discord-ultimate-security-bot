// src/rules/rule_051.js
module.exports = {
  id: 'rule_051',
  name: 'Stealth invite via code detection (discord.gg/abc without protocol)',
  defaultEnabled: true,
  async check(context) {
    const { message } = context;
    if (!message || !message.content) return { action: 'none' };
    const stealth = /(^|\s)(discord\.gg\/[A-Za-z0-9_-]+)(\s|$)/i;
    if (stealth.test(message.content)) return { action: 'delete', reason: 'stealth_invite' };
    return { action: 'none' };
  }
};
