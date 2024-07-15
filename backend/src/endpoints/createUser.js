'use strict';
const AWS = require('aws-sdk');
const bcrypt = require('bcrypt'); 

module.exports.handler = async event => {
  const reqBody = JSON.parse(event.body); 
  const username = reqBody.username; 
  const password = reqBody.password; 

  const newUser = {
    TableName: process.env.DYNAMO_USER_TABLE,
    Item: {
      username: username,
      password: bcrypt.hashSync(password, 10),
    },
  };

  try {
    const dynamo = new AWS.DynamoDB.DocumentClient();
    const putResponse = await dynamo.put(newUser).promise();

    return {
      statusCode: 201,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Headers': 'Authorization'
      }
    }
  }
  catch(error) {
    console.log('there was an error inserting user');
    console.log(error);
  }
};
