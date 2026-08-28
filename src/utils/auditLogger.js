// src/utils/auditLogger.js
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const { notifyWebhook } = require('./modNotifier');
const DB_PATH = path.resolve(__dirname, '../data/rules.db');
const db = new sqlite3.Database(DB_PATH);

function logAction(ruleId, action, actorId, guildId, messageId, reason) {
  const ts = Date.now();
  db.run('INSERT INTO audit_logs(rule_id, action, actor_id, guild_id, message_id, reason, ts) VALUES (?, ?, ?, ?, ?, ?, ?)', [ruleId, action, actorId, guildId, messageId, reason, ts], (err) => {
    if (err) return console.error('Failed to write audit log', err);
    // optionally notify mod channel via webhook
    const webhook = process.env.MOD_LOG_WEBHOOK_URL || null;
    if (webhook) {
      try {
        notifyWebhook(webhook, { content: `Auto-action: ${action} (rule: ${ruleId}) guild:${guildId} actor:${actorId} message:${messageId} reason:${reason}` });
      } catch (e) { console.error('mod notify failed', e); }
    }
  });
}

function fetchRecent(limit = 50) {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM audit_logs ORDER BY ts DESC LIMIT ?', [limit], (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

module.exports = { logAction, fetchRecent };
