// src/rules/rule_016.js
module.exports = {
  id: 'rule_016',
  name: 'Username / nickname suspicious characters',
  defaultEnabled: true,
  async check(context) {
    const { member } = context;
    if (!member) return { action: 'none' };
    const name = (member.nickname || member.user.username || '').toLowerCase();
    if (/[^\x00-\x7F]/.test(name) && name.length > 8) return { action: 'mute', reason: 'suspicious_nickname' };
    return { action: 'none' };
  }
};
