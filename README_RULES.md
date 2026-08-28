# Phase1 continued: rules 41-60

This commit adds rules 41-60 with heuristic implementations focused on per-user limits, invite safeguards, OCR/attachment flags, behavior scoring, channel slow-mode detection, and other anti-raid protections.

Testing:
- Update scripts/test_rules.js or extend to simulate more contexts. The harness already exists at scripts/test_rules.js.
- Run: `node scripts/test_rules.js`

Notes:
- Many rules are placeholders where external integrations (URL resolution, OCR, IP reputation) are necessary for full effectiveness. Those are flagged as warnings or muted actions to avoid accidental destructive behavior.
- SAFE_MODE remains on: auto-ban actions are converted to mute and all actions are logged.
