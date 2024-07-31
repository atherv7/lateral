'use strict'; 
const getUsernameFromToken = require('../utility').getUsernameFromToken;
const AWS = require('aws-sdk'); 

module.exports.handler = async event => {
    const username = getUsernameFromToken(event, process.env.JWT_SECRET); 
    
    if(!username) {
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

    const friendReqQuery = {
        TableName: process.env.DYNAMO_FRIEND_REQ_TABLE, 
        KeyConditionExpression: "#username = :username", 
        ExpressionAttributeNames: {
            "#username": "friendUsername"
        }, 
        ExpressionAttributeValues: {
            ":username": username
        }
    }; 

    let friendRequests = {}; 

    try {
        const dynamodb = new AWS.DynamoDB.DocumentClient(); 
        const response = await dynamodb.query(friendReqQuery).promise(); 
        friendRequests = response.Items; 
    }
    catch(error) {
        console.log('there was an error finding friend requests'); 
        console.log(error); 
        return {
            statusCode: 500, 
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Headers': 'Authorization'
            }, 
            body: JSON.stringify({
                message: 'error finding friend requests', 
                success: false
            })
        };
    }

    return {
        statusCode: 200, 
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Headers': 'Authorization'
        }, 
        body: JSON.stringify({
            message: 'search for friend request successful', 
            friendRequests: friendRequests 
        })
    };
}; 