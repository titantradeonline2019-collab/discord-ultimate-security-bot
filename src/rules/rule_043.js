// src/rules/rule_043.js
module.exports = {
  id: 'rule_043',
  name: 'Redirect-resolve suspicion (placeholder, safe)',
  defaultEnabled: true,
  async check(context) {
    // Resolving redirects requires network calls - keep as a safe placeholder that marks messages for review
    const { message } = context;
    if (!message || !message.content) return { action: 'none' };
    const redirectors = /bit\.ly|tinyurl\.com|t\.co|ow\.ly/gi;
    if (redirectors.test(message.content)) return { action: 'warn', reason: 'redirector_detected' };
    return { action: 'none' };
  }
};
