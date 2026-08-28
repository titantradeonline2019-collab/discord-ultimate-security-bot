// src/rules/rule_026.js
module.exports = {
  id: 'rule_026',
  name: 'Suspicious username / nickname heuristic',
  defaultEnabled: true,
  async check(context) {
    const { member } = context;
    if (!member) return { action: 'none' };
    const name = (member.nickname || member.user?.username || '').toLowerCase();
    // too many non-alphanumeric characters or repeated patterns
    const nonAlnum = (name.match(/[^a-z0-9 ]/g) || []).length;
    if (nonAlnum >= Math.max(3, Math.floor(name.length * 0.3))) return { action: 'mute', reason: 'suspicious_username' };
    // many repeating characters
    if (/(.)\1{5,}/.test(name)) return { action: 'mute', reason: 'repeated_chars_in_name' };
    return { action: 'none' };
  }
};
