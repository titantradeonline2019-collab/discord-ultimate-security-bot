# Phase1 continued: rules 21-40 converted and mod-log notifier

This commit adds concrete heuristics for rules 21 through 40, a mod-log notifier (webhook-based), and a simple test harness script (scripts/test_rules.js) to exercise a few checks locally.

How to run the harness:
- From repository root: `node scripts/test_rules.js`
- Ensure sqlite3 is installed (`npm install sqlite3`). The harness uses the same rulesManager and will create src/data/rules.db if needed.

Mod-log webhook:
- To enable posting of audit summaries to a webhook, set environment variable `MOD_LOG_WEBHOOK_URL` to a Discord webhook URL. The audit logger will post a short message for each automated action.
