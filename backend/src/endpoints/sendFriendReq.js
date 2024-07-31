'use strict'; 
const getUsernameFromToken = require('./../utility').getUsernameFromToken; 
const AWS = require('aws-sdk'); 

module.exports.handler = async event => {
    const senderUsername = getUsernameFromToken(event, process.env.JWT_SECRET); 

    if(!senderUsername) {
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

    const friendUsername = JSON.parse(event.body).friendUsername; 

    const newRequest = {
        TableName: process.env.DYNAMO_FRIEND_REQ_TABLE, 
        Item: {
            friendUsername: friendUsername, 
            senderUsername: senderUsername 
        }, 
    }; 

    try {
        const dynamo = new AWS.DynamoDB.DocumentClient(); 
        await dynamo.put(newRequest).promise(); 
        
        return {
            statusCode: 200, 
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Headers': 'Authorization'
            }, 
            body: JSON.stringify({
                message: "friend request sent", 
                success: true
            })
        }; 
    }
    catch(error) {
        console.log('there was an error logging the friend request'); 
        console.log(error); 
        return {
            statusCode: 500, 
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Headers': 'Authorization'
            }, 
            body: JSON.stringify({
                message: "error logging friend request", 
                success: false
            })
        }
    };
}