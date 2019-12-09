const redis = require('redis')
const {promisify} = require('util');
const client = redis.createClient(process.env.REDIS_URL);
const getAsync = promisify(client.get).bind(client);
const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
const docClient = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});

module.exports.getSchedule = async event => {
  let schedule = await getAsync(`schedule:${event.arguments.year}`);
  schedule = JSON.parse(schedule);
  return schedule.tournaments;
};

module.exports.updateUser = async event => {
  const groupParams = {
    TableName: process.env.DYNAMO_TABLE,
    IndexName: "type-data-index",
    KeyConditionExpression:"#type = :typeValue and begins_with(#data, :dataValue)",
    ExpressionAttributeNames: {
        "#type":"type",
        "#data":"data"
    },
    ExpressionAttributeValues: {
        ":typeValue": `User-${event.identity.sub}`,
        ":dataValue": 'Group-'
    }
  };
  let groups = await docClient.query(groupParams).promise();
  let writeQuery = groups.Items.map(g=>({PutRequest: {Item: {...g, firstName: event.arguments.input.firstName, lastName: event.arguments.input.lastName }  }}));

  const batchParams = {
    RequestItems: {
      [process.env.DYNAMO_TABLE]: writeQuery
    }
  };
  try {
    let group = await docClient.batchWrite(batchParams).promise();
  }
  catch (err) {
    console.log("Error", err);
  }

  const params = {
    TableName:process.env.DYNAMO_TABLE,
    Key:{
        "id": `User-${event.identity.sub}`,
        "type": `User-${event.identity.sub}`
    },
    UpdateExpression: "set firstName = :f, lastName=:l",
    ExpressionAttributeValues:{
        ":f": event.arguments.input.firstName,
        ":l": event.arguments.input.lastName
    },
    ReturnValues:"ALL_NEW"
  };
  let user = await docClient.update(params).promise();
  return user.Attributes;
};
