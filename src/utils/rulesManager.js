// src/utils/rulesManager.js
const fs = require('fs');
const path = require('path');
const RULES = require('../rules');
const statePath = path.resolve(__dirname, '../data/rules_state.json');
let state = { enabled: {} };
function loadState() {
  try {
    state = JSON.parse(fs.readFileSync(statePath, 'utf8'));
  } catch (e) {
    // initialize from defaults
    state = { enabled: {} };
    for (const r of RULES.all) state.enabled[r.id] = !!r.defaultEnabled;
    saveState();
  }
}
function saveState() { fs.writeFileSync(statePath, JSON.stringify(state, null, 2)); }
function enableAll() { for (const k of Object.keys(state.enabled)) state.enabled[k] = true; saveState(); }
function disableAll() { for (const k of Object.keys(state.enabled)) state.enabled[k] = false; saveState(); }
function setRule(id, enabled) { if (state.enabled[id] !== undefined) { state.enabled[id] = !!enabled; saveState(); return true; } return false; }
async function applyAll(context) {
  const actions = [];
  for (const r of RULES.all) {
    if (!state.enabled[r.id]) continue;
    try {
      const res = await r.check(context);
      if (res && res.action && res.action !== 'none') actions.push({ rule: r.id, name: r.name, result: res });
    } catch (e) {
      // log
      console.error('Rule error', r.id, e && e.stack ? e.stack : e);
    }
  }
  return actions;
}
loadState();
module.exports = { loadState, saveState, enableAll, disableAll, setRule, applyAll, state };
