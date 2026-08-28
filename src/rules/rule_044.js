// src/rules/rule_044.js
module.exports = {
  id: 'rule_044',
  name: 'Domain reputation hook (deny unknown high-risk hosts)',
  defaultEnabled: true,
  async check(context) {
    // This is a configurable hook: by default uses a small denylist; can be extended to use external APIs.
    const { message, config } = context;
    if (!message || !message.content) return { action: 'none' };
    const deny = (config && config.reputationDenylist) || ['malware.example', 'phish.example'];
    const urlRe = /https?:\/\/([^\s/:]+)(?:[\/\s]|$)/gi;
    let m;
    while ((m = urlRe.exec(message.content)) !== null) {
      const host = m[1].toLowerCase();
      if (deny.some(d => host.includes(d))) return { action: 'delete', reason: 'reputation_denylist', details: { host } };
    }
    return { action: 'none' };
  }
};
