// src/rules/index.js
const path = require('path');
const rules = [];
for (let i = 1; i <= 100; i++) {
  const id = String(i).padStart(3, '0');
  // eslint-disable-next-line import/no-dynamic-require, global-require
  const r = require(path.join(__dirname, `rule_${id}.js`));
  rules.push(r);
}
module.exports = {
  all: rules,
  getById(id) { return rules.find(r => r.id === id); }
};
