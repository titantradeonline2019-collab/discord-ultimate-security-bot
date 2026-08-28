// src/rules/rule_023.js
const punycode = require('punycode/');
module.exports = {
  id: 'rule_023',
  name: 'Homoglyph / punycode link detector',
  defaultEnabled: true,
  async check(context) {
    const { message } = context;
    if (!message || !message.content) return { action: 'none' };
    // find domains and check if they contain punycode or non-ascii
    const urlRe = /https?:\/\/([^\s/:]+)(?:[\/\s]|$)/gi;
    let m;
    while ((m = urlRe.exec(message.content)) !== null) {
      const host = m[1];
      // punycode encoded domains start with xn--
      if (host.toLowerCase().includes('xn--') || /[^\x00-\x7F]/.test(host)) {
        return { action: 'delete', reason: 'punycode_or_homoglyph_in_link', details: { host } };
      }
      // try to decode and compare lengths (simple heuristic)
      try {
        const decoded = punycode.toUnicode(host);
        if (decoded !== host && /[^\x00-\x7F]/.test(decoded)) {
          return { action: 'delete', reason: 'decoded_homoglyph', details: { host, decoded } };
        }
      } catch (e) {
        // ignore decode errors
      }
    }
    return { action: 'none' };
  }
};
