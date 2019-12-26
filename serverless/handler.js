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

module.exports.getTournament = async event => {
  let tournament = await getAsync(`tournaments:${event.arguments.id}`);
  tournament = JSON.parse(tournament);
  return tournament;
};

module.exports.getTournamentLeaderboard = async event => {
  let leaderboardRes = await getAsync(`tournaments:${event.source.id}:leaderboard`);
  let leaderboard = JSON.parse(leaderboardRes);
  return leaderboard.leaderboard;
};


module.exports.inviteToGroup = async event => {
  const params = {
    TableName: process.env.DYNAMO_TABLE,
    Key: {
      id: event.arguments.input.groupId,
      type: event.arguments.input.groupId
    }
  }
  let group = await docClient.get(params).promise();
  if (!group.Item.invites.includes(event.arguments.input.email)) {
    group.Item.invites.push(event.arguments.input.email);
    const updateParams = {
      TableName:process.env.DYNAMO_TABLE,
      Key:{
          "id": event.arguments.input.groupId,
          "type": event.arguments.input.groupId
      },
      UpdateExpression: "set invites = :i",
      ExpressionAttributeValues:{
          ":i": group.Item.invites
      },
      ReturnValues:"UPDATED_NEW"
    }

    let res = await docClient.update(updateParams).promise();
    return {response: 'true'}
  }
  console.log(group)
  return {response: 'false'}
}


module.exports.getTournamentGroups = async event => {
  let groupsRes = await getAsync(`tournaments:${event.arguments.tournamentId}:groups`);
  let groups = groupsRes ? JSON.parse(groupsRes): [];
  const params = {
    TableName: process.env.DYNAMO_TABLE,
    Key: {
      id: `User-${event.identity.sub}`,
      type: `${event.arguments.groupId}#${event.arguments.tournamentId}`
    }
  }
  let picks = [];
  try {
    let userTournament = await docClient.get(params).promise();
    picks = userTournament.Item.picks;
  } catch (err) {
    console.log(err);
  }

  const playerMapper = (players) => {
    return players.map(p => ({
      id: p.id,
      firstName: p.first_name,
      lastName: p.last_name,
      country: p.country,
      status: p.status || null,
      money: p.money || null,
      position: p.position || null,
      score: p.score || null,
      strokes: p.strokes || null,
      tied: p.tied || null
    }))
  }
  groups = groups.map((g,i)=>({id:i+1, players: playerMapper(g)}))
  for (let g of groups) {
    for (let p of g.players) {
      if (picks.includes(p.id)) {
        p.isSelected = true;
      }
    }
  }
  return groups;
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
