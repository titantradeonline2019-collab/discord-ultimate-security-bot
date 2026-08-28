// src/rules/rule_012.js
module.exports = {
  id: 'rule_012',
  name: 'Excessive emoji spam',
  defaultEnabled: true,
  async check(context) {
    const { message } = context;
    if (!message || !message.content) return { action: 'none' };
    const emojiMatches = message.content.match(/(<a?:\w+:\d+>|\p{Emoji})/gu) || [];
    if (emojiMatches.length > 20) return { action: 'delete', reason: 'emoji_spam' };
    return { action: 'none' };
  }
};
