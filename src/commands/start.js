// src/commands/start.js
// This is a lightweight /start command implementation. Integrate with your command handler.
const rulesManager = require('../utils/rulesManager');
module.exports = {
  data: { name: 'start', description: 'Enable the bot protections' },
  async execute(interaction, client) {
    // Ensure only administrators can run
    try {
      const member = interaction.member;
      if (!member || !member.permissions.has('ADMINISTRATOR')) {
        return interaction.reply({ content: 'Only administrators can enable protections.', ephemeral: true });
      }
      // enable all non-destructive protections by default
      rulesManager.enableAll();
      await interaction.reply({ content: 'Protections enabled. Rules loaded: ' + Object.keys(rulesManager.state.enabled).length, ephemeral: false });
    } catch (err) {
      console.error(err);
      try { interaction.reply({ content: 'Failed to enable protections: ' + String(err.message), ephemeral: true }); } catch (e) { /* ignore */ }
    }
  }
};
