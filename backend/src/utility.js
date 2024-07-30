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
    }
}; 

module.exports = {getTokenFromHeader}; 