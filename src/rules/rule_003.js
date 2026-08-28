// src/rules/rule_003.js
module.exports = {
  id: 'rule_003',
  name: 'Duplicate-message flood detector',
  defaultEnabled: true,
  async check(context) {
    const { message } = context;
    if (!message) return { action: 'none' };
    global.__DUPE_MAP = global.__DUPE_MAP || new Map();
    const key = `${message.guild?.id || 'g'}:${message.author.id}`;
    const last = global.__DUPE_MAP.get(key);
    if (last && last.content === message.content && (Date.now() - last.ts) < 15000) {
      // repeated within 15s
      return { action: 'delete', reason: 'duplicate_message' };
    }
    global.__DUPE_MAP.set(key, { content: message.content, ts: Date.now() });
    return { action: 'none' };
  }
};
