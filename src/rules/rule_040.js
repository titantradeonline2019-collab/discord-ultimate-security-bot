// src/rules/rule_040.js
module.exports = {
  id: 'rule_040',
  name: 'Suspicious attachment types & archive-block',
  defaultEnabled: true,
  async check(context) {
    const { message } = context;
    if (!message || !message.attachments) return { action: 'none' };
    const bannedExt = ['.zip', '.7z', '.rar', '.exe', '.scr'];
    for (const a of message.attachments.values()) {
      const n = (a.name || '').toLowerCase();
      for (const ext of bannedExt) if (n.endsWith(ext)) return { action: 'delete', reason: 'banned_archive_or_executable', details: { name: n } };
    }
    return { action: 'none' };
  }
};
