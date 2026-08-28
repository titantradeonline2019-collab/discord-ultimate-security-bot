// src/rules/rule_007.js
module.exports = {
  id: 'rule_007',
  name: 'Attachment type blocker',
  defaultEnabled: true,
  async check(context) {
    const { message } = context;
    if (!message || !message.attachments) return { action: 'none' };
    const bannedExt = ['.exe', '.bat', '.cmd'];
    for (const a of message.attachments.values()) {
      const name = a.name || '';
      for (const ext of bannedExt) if (name.toLowerCase().endsWith(ext)) return { action: 'delete', reason: 'banned_attachment' };
    }
    return { action: 'none' };
  }
};
