'use strict'; 
const getTokenFromHeader = require('./../utility').getTokenFromHeader; 
const AWS = require('aws-sdk'); 
const jsonwebtoken = require('jsonwebtoken'); 

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

    const senderUsername = jsonwebtoken.decode(token, process.env.JWT_SECRET).username; //used to jsonwebtoken.verify
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