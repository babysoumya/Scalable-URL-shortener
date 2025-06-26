// utils/consistentHash.js
const crypto = require('crypto');

const NODES = ['shard1', 'shard2', 'shard3']; // Simulated distributed storage nodes

function hashKey(key) {
  return crypto.createHash('sha1').update(key).digest('hex');
}

function getShard(key) {
  const hash = parseInt(hashKey(key).slice(0, 8), 16); // take first 8 hex chars
  return NODES[hash % NODES.length];
}

module.exports = { getShard };
