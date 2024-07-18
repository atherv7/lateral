'use strict';
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

module.exports.handler = async event => {
  try {
    const {data,
           fileName,
           passer,
           reciever } = JSON.parse(event.body);
           
    const insertionFile = {
      Bucket: process.env.S3_FILE_BUCKET,
      Key: fileName,
      Body: data,
    };

    const passDynamoInsert = {
      TableName: process.env.DYNAMO_PASS_TABLE, 
      Item: {
        passer: passer, 
        reciever: reciever, 
        fileName: fileName 
      }
    }; 

    // insert file into s3 bucket
    await s3.putObject(insertionFile).promise();
    
    // insert pass relationship into DynamoDB table
    const dynamo = new AWS.DynamoDB.DocumentClient(); 
    await dynamo.put(passDynamoInsert).promise(); 

    return {
      statusCode: 200,
      body: JSON.stringify({"message":"File Uploaded Successfully"})
    };
  }
  catch(error) {
    console.log("Error uploading file");
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({"message":"Error Uploading File"})
    }
  }
};
