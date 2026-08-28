// src/rules/rule_017.js
module.exports = {
  id: 'rule_017',
  name: 'Excessive links in one message',
  defaultEnabled: true,
  async check(context) {
    const { message } = context;
    if (!message || !message.content) return { action: 'none' };
    const links = (message.content.match(/https?:\/\/[^\s]+/g) || []).length;
    if (links >= 4) return { action: 'delete', reason: 'too_many_links' };
    return { action: 'none' };
  }
};
