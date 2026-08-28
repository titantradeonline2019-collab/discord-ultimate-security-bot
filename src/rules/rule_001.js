// src/rules/rule_001.js
module.exports = {
  id: 'rule_001',
  name: 'Invite link blocker',
  defaultEnabled: true,
  async check(context) {
    const { message } = context;
    if (!message || !message.content) return { action: 'none' };
    const invitePattern = /(discord(?:app)?\.com\/invite|discord\.gg)\/[A-za-z0-9\-]+/i;
    if (invitePattern.test(message.content)) {
      return { action: 'delete', reason: 'invite_link_detected' };
    }
    return { action: 'none' };
  }
};
