// src/rules/rule_034.js
module.exports = {
  id: 'rule_034',
  name: 'Default avatar + suspicious activity detector',
  defaultEnabled: true,
  async check(context) {
    const { member, recentActivity } = context;
    if (!member) return { action: 'none' };
    const hasDefaultAvatar = (!member.user?.avatar);
    if (!hasDefaultAvatar) return { action: 'none' };
    // if default avatar user has multiple messages with links recently
    const window = 5 * 60 * 1000;
    const now = Date.now();
    const msgs = (recentActivity || []).filter(a => a.userId === member.id && now - (a.createdAt || now) < window && /(https?:\/\/|discord(?:app)?\.com\/invite|discord\.gg)\//i.test(a.message || ''));
    if (msgs.length >= 2) return { action: 'mute', reason: 'default_avatar_link_spam', details: { count: msgs.length } };
    return { action: 'none' };
  }
};
