const jwt = require('jsonwebtoken'); 

const getTokenFromHeader = (event) => {
    try {
        const authentication = event.headers.Authorization || event.header.authorization; 

        if(authentication) {
            const token = authentication.split(' ')[1]; 
            if(token) {
                return token;
            }
        }

        return null; 
    }
    catch(error) {
        console.log('there was an error getting jsonwebtoken'); 
        console.log(error); 
        return null; 
    }
}; 

const getUsernameFromToken = (event, jwt_secret) => {
    const token = getTokenFromHeader(event); 

    const username = jwt.decode(token, jwt_secret).username; 

    return (username) ? username : null; 
}; 

module.exports = {getTokenFromHeader, getUsernameFromToken}; 