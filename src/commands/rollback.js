// src/commands/rollback.js
const rulesManager = require('../utils/rulesManager');

module.exports = {
  data: { name: 'rules_rollback', description: 'Disable all automatic protections (emergency rollback)' },
  async execute(interaction) {
    try {
      const member = interaction.member;
      if (!member || !member.permissions.has('ADMINISTRATOR')) return interaction.reply({ content: 'Only administrators may perform rollback.', ephemeral: true });
      // set all states to false
      const states = await rulesManager.getAllStates();
      const ids = Object.keys(states);
      for (const id of ids) await rulesManager.setRuleState(id, false);
      await interaction.reply({ content: 'All protections disabled (rollback applied).', ephemeral: false });
    } catch (e) {
      console.error(e);
      try { await interaction.reply({ content: 'Failed to rollback rules', ephemeral: true }); } catch (x) {}
    }
  }
};
