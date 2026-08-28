# Generated protections

This branch adds 100 rule modules (src/rules/rule_001.js ... rule_100.js), a rules index, a simple rules manager and a /start command skeleton.

Usage (quick):
- Install your bot dependencies (discord.js etc.)
- Import and register src/commands/start.js with your command handler
- Ensure the bot has permission to Manage Messages / Mute Members if you want deletion/mute actions
- Test on a staging server. The generated rules are mostly lightweight and safe; some are placeholders for future improvements.

Notes:
- No mass-posting or spammy commands were added. All protections avoid destructive auto-ban by default. You can modify specific rule actions.
- For production, consider using a persistent DB (SQLite/Redis) and more robust audit logging.
