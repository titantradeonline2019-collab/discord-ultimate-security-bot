// src/utils/rateLimiter.js
// Simple SQLite-backed counter for small deployments. Use Redis for high-scale.
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const DB_PATH = path.resolve(__dirname, '../data/rules.db');
const db = new sqlite3.Database(DB_PATH);

function incr(key, windowMs) {
  // Very simple approach: store timestamped count per key; expire by timestamp
  const now = Date.now();
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.get('SELECT count, ts FROM counters WHERE key = ?', [key], (err, row) => {
        if (err) return reject(err);
        if (!row) {
          db.run('INSERT INTO counters(key, count, ts) VALUES (?, ?, ?)', [key, 1, now], function (e) {
            if (e) return reject(e);
            resolve(1);
          });
        } else {
          // if window expired, reset
          if (now - row.ts > windowMs) {
            db.run('UPDATE counters SET count = ?, ts = ? WHERE key = ?', [1, now, key], function (e) {
              if (e) return reject(e);
              resolve(1);
            });
          } else {
            const nxt = row.count + 1;
            db.run('UPDATE counters SET count = ? WHERE key = ?', [nxt, key], function (e) {
              if (e) return reject(e);
              resolve(nxt);
            });
          }
        }
      });
    });
  });
}

function getCount(key) {
  return new Promise((resolve, reject) => {
    db.get('SELECT count, ts FROM counters WHERE key = ?', [key], (err, row) => {
      if (err) return reject(err);
      resolve(row ? { count: row.count, ts: row.ts } : { count: 0, ts: null });
    });
  });
}

module.exports = { incr, getCount };
