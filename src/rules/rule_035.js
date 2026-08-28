// src/rules/rule_035.js
module.exports = {
  id: 'rule_035',
  name: 'Message edit spam detector (rapid edits)',
  defaultEnabled: true,
  async check(context) {
    // context.recentEdits: array of { messageId, editsCount, userId, lastEditTs }
    const { recentEdits } = context;
    if (!recentEdits) return { action: 'none' };
    const suspect = recentEdits.find(e => e.editsCount >= 6 && (Date.now() - (e.lastEditTs || 0)) < 60 * 1000);
    if (suspect) return { action: 'mute', reason: 'rapid_message_edits', details: suspect };
    return { action: 'none' };
  }
};
