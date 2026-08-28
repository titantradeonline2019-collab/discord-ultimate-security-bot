// src/commands/rule.js
const rulesManager = require('../utils/rulesManager');

module.exports = {
  data: { name: 'rule', description: 'Enable or disable a specific rule', options: [
    { name: 'id', type: 3, description: 'Rule id', required: true },
    { name: 'action', type: 3, description: 'enable|disable', required: true }
  ] },
  async execute(interaction) {
    try {
      const member = interaction.member;
      if (!member || !member.permissions.has('ADMINISTRATOR')) return interaction.reply({ content: 'Only administrators may modify rule states.', ephemeral: true });
      const id = interaction.options.getString('id');
      const action = interaction.options.getString('action');
      if (!id || !action) return interaction.reply({ content: 'Missing parameters', ephemeral: true });
      if (!['enable','disable'].includes(action)) return interaction.reply({ content: 'Action must be enable or disable', ephemeral: true });
      const success = await rulesManager.setRuleState(id, action === 'enable');
      if (success) return interaction.reply({ content: `Rule ${id} -> ${action}`, ephemeral: true });
      return interaction.reply({ content: `Rule ${id} not found`, ephemeral: true });
    } catch (e) {
      console.error(e);
      try { await interaction.reply({ content: 'Failed to update rule', ephemeral: true }); } catch (x) {}
    }
  }
};
