const { ipcMain, session } = require('electron'); 
const fetch = require('electron-fetch').default; 

ipcMain.handle('login', async (event, args) => {
    const postData = {
        "username": args[0], 
        "password": args[1]
    }; 
    const stringPostData = JSON.stringify(postData); 
    try {
        const response = await fetch(
            'https://dadsso6fxc.execute-api.us-east-1.amazonaws.com/dev/version1/user/login', 
            {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json', 
                    'Content-Length': Buffer.byteLength(stringPostData),
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true
                }, 
                body: stringPostData
            }
        ); 
        const message = await response.json(); 
        const token = message.token; 

        await session.defaultSession.cookies.set({
            url: 'https://dadsso6fxc.execute-api.us-east-1.amazonaws.com/dev/version1/user/login', 
            name: 'jsonwebtoken', 
            value: token, 
            expirationData: Math.floor(Date.now() / 1000) + (60*60*24) // 24 hours
        }); 

        return {success: true}; 
    }
    catch(error) {
        console.log('error creating user'); 
        console.log(error); 

        return {success: false}; 
    }
    
}); 

ipcMain.handle('register', async (event, args) => {
    const postData = {
        "username": args[0], 
        "password": args[1] 
    }; 

    const stringPostData = JSON.stringify(postData); 
    try {
        const response = await fetch(
            'https://dadsso6fxc.execute-api.us-east-1.amazonaws.com/dev/version1/user/create',
            {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json', 
                    'Content-Length': Buffer.byteLength(stringPostData), 
                    'Access-Control-Allow-Origin': '*', 
                    'Access-Control-Allow-Credentials': true
                },
                body: stringPostData
            }
        );

        const message = await response.json(); 
        const token = message.token; 

        await session.defaultSession.cookies.set({
            url: 'https://dadsso6fxc.execute-api.us-east-1.amazonaws.com/dev/version1/user/create', 
            name: 'jsonwebtoken', 
            value: token, 
            expirationData: Math.floor(Date.now() / 1000) + (60*60*24) // 24 hours
        }); 

        console.log('there was success logging/registering user'); 
        return {success: true}; 
    }
    catch(error) {
        console.log('there was an error logging in'); 
        console.log(error); 
        return {success: false}; 
    }
});