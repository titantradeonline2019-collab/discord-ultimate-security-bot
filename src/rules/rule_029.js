// src/rules/rule_029.js
module.exports = {
  id: 'rule_029',
  name: 'Emoji-only / excessive emoji detector (harder)',
  defaultEnabled: true,
  async check(context) {
    const { message } = context;
    if (!message || !message.content) return { action: 'none' };
    // Count non-emoji chars
    const nonEmoji = message.content.replace(/(<a?:\w+:\d+>|\p{Emoji_Presentation}|\p{Emoji}\uFE0F)/gu, '').replace(/\s+/g, '').length;
    const emojis = (message.content.match(/(<a?:\w+:\d+>|\p{Emoji_Presentation}|\p{Emoji}\uFE0F)/gu) || []).length;
    if (nonEmoji === 0 && emojis > 30) return { action: 'delete', reason: 'emoji_only_spam' };
    if (emojis > 80) return { action: 'delete', reason: 'excessive_emoji' };
    return { action: 'none' };
  }
};
