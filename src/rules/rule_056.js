// src/rules/rule_056.js
module.exports = {
  id: 'rule_056',
  name: 'Invite code guesser detector (many invalid invite attempts)',
  defaultEnabled: true,
  async check(context) {
    const { recentInvites } = context; // recentInvites: array of { code, success }
    if (!recentInvites) return { action: 'none' };
    const failures = recentInvites.filter(i => !i.success).length;
    if (failures >= 20) return { action: 'mute', reason: 'invite_guessing_detected', details: { failures } };
    return { action: 'none' };
  }
};
