// scripts/test_rules.js
// Lightweight harness to test a few rules locally without a test framework.
const RULES = require('../src/rules');
const rulesManager = require('../src/utils/rulesManager');

async function run() {
  console.log('Rules count:', RULES.all.length);
  // sample contexts
  const samples = [
    { name: 'invite shortener', context: { message: { content: 'Check this out: https://bit.ly/abc discord.gg/xyz', author: { id: 'u1' } }, guildId: 'g1' } },
    { name: 'punycode link', context: { message: { content: 'https://xn--example-9k0a.com/something', author: { id: 'u2' } }, guildId: 'g1' } },
    { name: 'zero width', context: { message: { content: 'hi\u200Bthere', author: { id: 'u3' } }, guildId: 'g1' } },
  ];
  for (const s of samples) {
    const actions = await rulesManager.applyAll(s.context);
    console.log('Sample:', s.name, '-> actions:', actions);
  }
}

run().catch(e => console.error(e));
