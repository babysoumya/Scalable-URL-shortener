const AWS = require('aws-sdk');
const { getShard } = require('./utils/consistentHash');

const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const shortCode = event.pathParameters.id;
  const shard = getShard(shortCode);
  const key = `${shard}#${shortCode}`;

  const data = await ddb.get({
    TableName: 'URLTable',
    Key: { PK: key }
  }).promise();

  if (!data.Item) {
    return { statusCode: 404, body: 'URL not found' };
  }

  return {
    statusCode: 301,
    headers: {
      Location: data.Item.longUrl
    },
    body: ''
  };
};
