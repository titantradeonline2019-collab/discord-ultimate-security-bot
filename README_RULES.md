# Hardened changes (Phase 0 + Phase 1)

This branch (generated/harden-1) applies the first hardening phase to the generated rules set.

What changed:
- Added SQLite-backed persistence for rule enabled state and audit logs (src/data/rules.db)
- Added audit logging helper (src/utils/auditLogger.js)
- Added a simple SQLite-backed rate limiter for counters (src/utils/rateLimiter.js)
- Added admin commands: /rules (list), /rule (enable|disable), /rules_rollback (emergency disable all)
- rulesManager now runs in SAFE_MODE which converts destructive 'ban' actions to 'mute' and records audit logs.

Integration notes:
- Install sqlite3 dependency: `npm install sqlite3`
- Register the new commands with your command handler (src/commands/*.js)
- Integrate rulesManager.applyAll(context) inside your messageCreate and guildMemberAdd handlers. See README_RULES.md for earlier integration example.
- Test on staging. Use /rules to inspect enabled rules.

Next steps (Phase 1 additional items can be expanded):
- Convert more placeholders to concrete heuristics (I implemented infrastructure; next I can convert rules 21-40)
- Swap SQLite counters for Redis if you provide Redis credentials.
