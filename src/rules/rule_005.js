// src/rules/rule_005.js
module.exports = {
  id: 'rule_005',
  name: 'Suspicious domain blocklist (simple)',
  defaultEnabled: true,
  async check(context) {
    const { message, config } = context;
    if (!message || !message.content) return { action: 'none' };
    const blocklist = (config && config.blockedDomains) || ['malicious.example', 'phish.example'];
    for (const d of blocklist) {
      if (message.content.toLowerCase().includes(d)) return { action: 'delete', reason: 'blocked_domain' };
    }
    return { action: 'none' };
  }
};
