// src/utils/modNotifier.js
const https = require('https');

function notifyWebhook(webhookUrl, payload) {
  if (!webhookUrl) return;
  try {
    const url = new URL(webhookUrl);
    const data = JSON.stringify(payload);
    const options = {
      hostname: url.hostname,
      path: url.pathname + (url.search || ''),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    };
    const req = https.request(options, (res) => {
      // consume response
      res.on('data', () => {});
    });
    req.on('error', (e) => { console.error('modNotifier error', e); });
    req.write(data);
    req.end();
  } catch (e) { console.error('notifyWebhook failed', e); }
}

module.exports = { notifyWebhook };
