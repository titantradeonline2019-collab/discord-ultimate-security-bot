// src/rules/rule_011.js
module.exports = {
  id: 'rule_011',
  name: 'Short-message spam (many short messages in short time)',
  defaultEnabled: true,
  async check(context) {
    const { message } = context;
    if (!message) return { action: 'none' };
    global.__SHORT_SPAM = global.__SHORT_SPAM || new Map();
    const key = `${message.guild?.id||'g'}:${message.author.id}`;
    const entry = global.__SHORT_SPAM.get(key) || { count: 0, ts: Date.now() };
    if (message.content.length < 10) {
      if (Date.now() - entry.ts < 10000) {
        entry.count += 1;
      } else {
        entry.count = 1; entry.ts = Date.now();
      }
    }
    global.__SHORT_SPAM.set(key, entry);
    if (entry.count >= 5) return { action: 'mute', reason: 'short_message_flood' };
    return { action: 'none' };
  }
};
