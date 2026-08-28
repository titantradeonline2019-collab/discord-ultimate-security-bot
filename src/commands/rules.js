// src/commands/rules.js
const rulesManager = require('../utils/rulesManager');

module.exports = {
  data: { name: 'rules', description: 'List all protection rules and their status' },
  async execute(interaction) {
    try {
      const member = interaction.member;
      if (!member || !member.permissions.has('ADMINISTRATOR')) return interaction.reply({ content: 'Only administrators may view rules.', ephemeral: true });
      const list = rulesManager.listRules();
      const states = await rulesManager.getAllStates();
      const lines = list.map(r => `${r.id} - ${r.name} - ${states[r.id] ? 'ENABLED' : 'disabled'}`);
      // chunk if long
      const chunk = lines.join('\n').slice(0, 1900);
      await interaction.reply({ content: `Rules:\n${chunk}`, ephemeral: true });
    } catch (e) {
      console.error(e);
      try { await interaction.reply({ content: 'Failed to list rules', ephemeral: true }); } catch (x) {}
    }
  }
};
