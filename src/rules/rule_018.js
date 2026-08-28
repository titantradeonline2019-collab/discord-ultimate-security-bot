// src/rules/rule_018.js
module.exports = {
  id: 'rule_018',
  name: 'Blacklist words',
  defaultEnabled: true,
  async check(context) {
    const { message, config } = context;
    if (!message || !message.content) return { action: 'none' };
    const list = (config && config.blacklist) || ['badword1','badword2'];
    const lc = message.content.toLowerCase();
    for (const w of list) if (lc.includes(w)) return { action: 'delete', reason: 'blacklisted_word' };
    return { action: 'none' };
  }
};
