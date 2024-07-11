'use strict';
import jsonwebtoken from 'jsonwebtoken';

module.exports.handler = async event => {
  const tokenStatement = event.authorizationToken;
  const tokenStatementArr = tokenStatement.split(' ');
  const token = tokenStatementArr[1];

  if(tokenStatementArr.length !== 2 ||
     authorizerArr[0] !== 'Bearer' ||
     token.length === 0) {
       return generatePolicy('undefined', 'deny', event.methodArn);
     }

  let decodedToken = jsonwebtoken.verify(token, process.env.JWT_SECRET);

  if(typeof decodedToken.username !== 'undefined' &&
     decodedToken.username.length > 0) {
       return generatePolicy('undefined', 'allow', event.methodArn);
     }

  return generatePolicy('undefined', 'deny', event.methodArn); 
};

const generatePolicy = (principalId, effect, resource) => {
  let authResponse = {};

  authResponse.principalId = principalId;

  if(effect && resource) {
    let policyDocument = {};
    policyDocument.Version = '2012-10-17';
    policyDocument.Statement = [];
    let Statement1 = {};
    Statement1.Action = 'execute-api:Invoke';
    Statement1.Effect = effect;
    Statement1.Resource = resource;
    policyDocument.Statement[0] = Statement1;
    authResponse.policyDocument = policyDocument;
  }

  return authResponse;
};
