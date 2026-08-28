// src/rules/rule_033.js
module.exports = {
  id: 'rule_033',
  name: 'New account posting invites/links (strict)',
  defaultEnabled: true,
  async check(context) {
    const { member, message } = context;
    if (!member || !message) return { action: 'none' };
    const accountAgeMs = Date.now() - new Date(member.user?.createdAt || member.user?.createdTimestamp || Date.now()).getTime();
    const threshold = (context.config && context.config.veryNewAccountMs) || (1000 * 60 * 60 * 24 * 2); // 2 days
    const hasLink = /https?:\/\//i.test(message.content) || /(discord(?:app)?\.com\/invite|discord\.gg)\//i.test(message.content);
    if (accountAgeMs < threshold && hasLink) return { action: 'delete', reason: 'very_new_account_link' };
    return { action: 'none' };
  }
};
