// src/rules/rule_015.js
module.exports = {
  id: 'rule_015',
  name: 'Account mention spam (PM to many users)',
  defaultEnabled: true,
  async check(context) {
    // This rule is a placeholder; real PM-scanning needs gateway events and intents.
    return { action: 'none' };
  }
};
