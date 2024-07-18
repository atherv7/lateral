'use strict';
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken'); 

module.exports.handler = async event => {
  const {
    username,
    password
  } = JSON.parse(event.body);

  const userTableQuery = {
    TableName: process.env.DYNAMO_USER_TABLE,
    KeyConditionExpression: '#username = :username',
    ExpressionAttributeNames: {
      '#username': 'username'
    },
    ExpressionAttributeValues: {
      ':username': username
    }
  };

  let userResult = {};

  try {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    userResult = await dynamodb.query(userTableQuery).promise();
  }
  catch(error) {
    console.log('there was an error finding user');
    console.log(error);
  }

  if(typeof userResult.Items !== 'undefined' && userResult.Items.length === 1) {
    const user = userResult.Items[0];
    const comparisonResult = bcrypt.compareSync(password, user.password);

    if(comparisonResult) {
      let token = jwt.sign({
        username: user.username,
      }, process.env.JWT_SECRET);
      return {
        statusCode: 200,
        body: JSON.stringify({token:token})
      };
    }
  }

  return {
    statusCode: 404,
    body: JSON.stringify({message: 'login failed'})
  };
};
