'use strict';
const AWS = require('aws-sdk');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken'); 

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
    await dynamo.put(newUser).promise();

    const token = jwt.sign({
      username: username,
    }, process.env.JWT_SECRET);

    return {
      statusCode: 201,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Headers': 'Authorization'
      },
      body: JSON.stringify({
        message: "logged", 
        token: token
      })
    }; 
  }
  catch(error) {
    console.log('there was an error inserting user');
    console.log(error);
  }
};
