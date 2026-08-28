// src/utils/rulesManager.js
const path = require('path');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const RULES = require('../rules');
const Audit = require('./auditLogger');
const RateLimiter = require('./rateLimiter');

const DB_PATH = path.resolve(__dirname, '../data/rules.db');
fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
const db = new sqlite3.Database(DB_PATH);

// Safe mode prevents destructive auto-bans by default
const SAFE_MODE = true;

// Initialize DB tables
db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS rules_state (id TEXT PRIMARY KEY, enabled INTEGER)");
  db.run("CREATE TABLE IF NOT EXISTS audit_logs (id INTEGER PRIMARY KEY AUTOINCREMENT, rule_id TEXT, action TEXT, actor_id TEXT, guild_id TEXT, message_id TEXT, reason TEXT, ts INTEGER)");
  db.run("CREATE TABLE IF NOT EXISTS counters (key TEXT PRIMARY KEY, count INTEGER, ts INTEGER)");
});

function loadStateDefaults() {
  const stmt = db.prepare("INSERT OR IGNORE INTO rules_state(id, enabled) VALUES (?, ?)");
  for (const r of RULES.all) {
    // By default, respect module default, but keep SAFE_MODE mitigation at execution time
    stmt.run(r.id, r.defaultEnabled ? 1 : 0);
  }
  stmt.finalize();
}

function getAllStates() {
  return new Promise((resolve, reject) => {
    db.all('SELECT id, enabled FROM rules_state', (err, rows) => {
      if (err) return reject(err);
      const out = {};
      for (const r of rows) out[r.id] = !!r.enabled;
      resolve(out);
    });
  });
}

function setRuleState(id, enabled) {
  return new Promise((resolve, reject) => {
    db.run('INSERT OR REPLACE INTO rules_state(id, enabled) VALUES (?, ?)', [id, enabled ? 1 : 0], function (err) {
      if (err) return reject(err);
      resolve(true);
    });
  });
}

async function applyAll(context) {
  // ensure DB has defaults
  loadStateDefaults();
  const states = await getAllStates();
  const actions = [];
  for (const r of RULES.all) {
    if (!states[r.id]) continue;
    try {
      const res = await r.check(context);
      if (res && res.action && res.action !== 'none') {
        // SAFE_MODE mitigation: convert ban -> mute or log only
        let finalAction = res.action;
        if (SAFE_MODE && res.action === 'ban') {
          // convert ban to mute and log strongly
          finalAction = 'mute';
          res._converted_from = 'ban';
        }
        actions.push({ rule: r.id, name: r.name, result: Object.assign({}, res, { action: finalAction }) });
        // record audit
        try {
          Audit.logAction(r.id, finalAction, context.actorId || context.message?.author?.id || null, context.guildId || context.message?.guild?.id || null, context.message?.id || null, res.reason || null);
        } catch (e) { console.error('audit log failed', e); }
      }
    } catch (e) {
      console.error('Rule error', r.id, e && e.stack ? e.stack : e);
    }
  }
  return actions;
}

function listRules() { return RULES.all.map(r => ({ id: r.id, name: r.name, defaultEnabled: r.defaultEnabled })); }

module.exports = { applyAll, listRules, setRuleState, getAllStates, db, setRuleStateAsync: setRuleState, SAFE_MODE };
