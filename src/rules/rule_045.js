// src/rules/rule_045.js
module.exports = {
  id: 'rule_045',
  name: 'OCR-suspect attachment flag (placeholder)',
  defaultEnabled: true,
  async check(context) {
    // Placeholder: If attachments present and image type, flag for review; integration with OCR/virus-scan recommended.
    const { message } = context;
    if (!message || !message.attachments) return { action: 'none' };
    const imgs = [...message.attachments.values()].filter(a => /(png|jpe?g|webp|gif)$/i.test(a.name || ''));
    if (imgs.length > 0) return { action: 'warn', reason: 'image_attachment_present_for_ocr', details: { count: imgs.length } };
    return { action: 'none' };
  }
};
