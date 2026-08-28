// src/rules/rule_039.js
module.exports = {
  id: 'rule_039',
  name: 'External links not in allowlist',
  defaultEnabled: true,
  async check(context) {
    const { message, config } = context;
    if (!message || !message.content) return { action: 'none' };
    const allowed = (config && config.allowedDomains) || ['youtube.com', 'github.com', 'discord.com'];
    const urlRe = /https?:\/\/([^\s/:]+)(?:[\/\s]|$)/gi;
    let m;
    while ((m = urlRe.exec(message.content)) !== null) {
      const host = m[1].toLowerCase();
      if (!allowed.some(d => host.includes(d))) return { action: 'delete', reason: 'external_link_not_allowed', details: { host } };
    }
    return { action: 'none' };
  }
};
