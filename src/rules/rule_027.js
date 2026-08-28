// src/rules/rule_027.js
module.exports = {
  id: 'rule_027',
  name: 'Join-message correlation (new account immediately posting invite/link)',
  defaultEnabled: true,
  async check(context) {
    const { member, message } = context;
    if (!member || !message) return { action: 'none' };
    const accountAge = Date.now() - new Date(member.user?.createdAt || member.user?.createdTimestamp || Date.now()).getTime();
    const threshold = (context.config && context.config.joinPostLinkMs) || 1000 * 60 * 5; // 5 minutes
    const hasLink = /https?:\/\//i.test(message.content) || /(discord(?:app)?\.com\/invite|discord\.gg)\//i.test(message.content);
    if (accountAge < threshold && hasLink) return { action: 'delete', reason: 'new_account_posting_link' };
    return { action: 'none' };
  }
};
