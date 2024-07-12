'use strict';
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

    await s3.putObject(insertionFile).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({"message":"File Uploaded Successfully"});
    };
  }
  catch(error) {
    console.log("Error uploading file");
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({"message":"Error Uploading File"});
    }
  }
};
