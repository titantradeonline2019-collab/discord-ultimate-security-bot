// src/rules/rule_032.js
module.exports = {
  id: 'rule_032',
  name: 'IP address link detector',
  defaultEnabled: true,
  async check(context) {
    const { message } = context;
    if (!message || !message.content) return { action: 'none' };
    const ipRe = /https?:\/\/(?:\d{1,3}\.){3}\d{1,3}(?:[:\/]|$)/;
    if (ipRe.test(message.content)) return { action: 'delete', reason: 'ip_address_link' };
    return { action: 'none' };
  }
};
