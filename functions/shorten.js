const AWS = require('aws-sdk');
const crypto = require('crypto');
const { getShard } = require('./utils/consistentHash');
const { encodeBase62 } = require('./utils/base62');

const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const body = JSON.parse(event.body);
  const longUrl = body.url;

  // Generate numeric hash, then convert to base62
  const numericHash = parseInt(crypto.createHash('sha1').update(longUrl).digest('hex').slice(0, 8), 16);
  const shortCode = encodeBase62(numericHash);

  const shard = getShard(shortCode);
  const shortId = `${shard}#${shortCode}`;

  await ddb.put({
    TableName: 'URLTable',
    Item: {
      PK: shortId,
      longUrl: longUrl
    }
  }).promise();

  return {
    statusCode: 200,
    body: JSON.stringify({ shortUrl: `https://short.ly/${shortCode}` })
  };
};