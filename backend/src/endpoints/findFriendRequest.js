'use strict'; 
const getTokenFromHeader = require('./../utility').getTokenFromHeader;
const jwt = require('jsonwebtoken'); 
const AWS = require('aws-sdk'); 

module.exports.handler = async event => {
    const token = getTokenFromHeader(event); 
    if(!token) {
        return {
            statusCode: 500, 
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Headers': 'Authorization'
            }, 
            body: JSON.stringify({
                message: "error: unable to find token", 
                success: false
            })
        }
    }
    const username = jwt.decode(token, process.env.JWT_SECRET).username; 

    const friendReqQuery = {
        TableName: process.env.DYNAMO_FRIEND_REQ_TABLE, 
        KeyConditionExpression: '#username = :username', 
        ExpressionAttributeNames: {
            '#username': 'friendUsername'
        }, 
        ExpressionAttributeValues: {
            ':username': username
        }
    }; 

    let friendRequests = {}; 

    try {
        const dynamodb = new AWS.DynamoDB.DocumentClient(); 
        friendReqQuery = await dynamodb.query(userTableQuery).promise(); 
    }
    catch(error) {
        console.log('there was an error finding friend requests'); 
        console.log(error); 
    }

    
}; 