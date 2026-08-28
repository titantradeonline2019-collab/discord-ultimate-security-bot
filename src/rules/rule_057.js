// src/rules/rule_057.js
module.exports = {
  id: 'rule_057',
  name: 'Account with proxy/VPN hint (placeholder)',
  defaultEnabled: true,
  async check(context) {
    // requires external IP reputation; placeholder flags when profile includes suspicious metadata
    const { member } = context;
    if (!member) return { action: 'none' };
    // placeholder: if username contains 'vpn' or 'proxy'
    const name = (member.user?.username || '').toLowerCase();
    if (/vpn|proxy|tor/.test(name)) return { action: 'mute', reason: 'proxy_indication_in_username' };
    return { action: 'none' };
  }
};
