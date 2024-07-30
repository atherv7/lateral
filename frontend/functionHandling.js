const { ipcMain, session, dialog } = require('electron'); 
const fetch = require('electron-fetch').default; 

const findFriendReqBackground = () => {
    setInterval(async () => {
        try {
            const response = await fetch(
                                   '', 
                                    {
                                        method: 'GET', 
                                        headers: {
                                            'Content-Type': 'application/json', 
                                            'Content-Length': Buffer.byteLength(stringPostData),
                                            'Access-Control-Allow-Origin': '*',
                                            'Access-Control-Allow-Credentials': true
                                        }
                                    }); 
            const data = await response.json(); 

            if(data.friendRequests) {
                mainWindow.webContents.send('pending-requests', data.friendRequests);
            }
        }
        catch(error) {
            console.log('there was an error trying to get pending friend requests'); 
            console.log(error); 
        }
    }, (60*15)); 
}

const getToken = () => {
    return new Promise((resolve, reject) => {
        session.defaultSession.cookies.get({name: "jsonwebtoken"},
        (err, cookies) => {
            if(err) {
                reject(err); 
            }
            if(cookies.length) {
                resolve(cookies[0].value); 
            }
            else {
                reject(new Error('JSONWebToken not found')); 
            }
        })
    })
}

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

        console.log(token); 
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

        return {success: true}; 
    }
    catch(error) {
        console.log('there was an error logging in'); 
        console.log(error); 
        return {success: false}; 
    }
});

ipcMain.handle('select-file', async () => {
    const result = await dialog.showOpenDialog({
        properties: ['openFile']
    }); 

    return result.filePaths; 
}); 

ipcMain.handle('send-friend-req', async (event, args) => {
    console.log('function triggered'); 
    const jsonwebtoken = await getToken(); 
    const friendReqJSONString = JSON.stringify({"friendUserame":args}); 
    try {
        const response = await fetch(
            'https://dadsso6fxc.execute-api.us-east-1.amazonaws.com/dev/version1/friends/request',
            {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json', 
                    'Access-Control-Allow-Origin': '*', 
                    'Access-Control-Allow-Credentials': true, 
                    'Content-Length': Buffer.byteLength(friendReqJSONString), 
                    'Authorization': `Bearer ${jsonwebtoken}`
                }, 
                body: friendReqJSONString
            }); 
        const data = await response.json(); 
        console.log(data); 
        return {success: response.success}; 
    }
    catch(error) {
        console.log('there was an issue sending the friend request'); 
        console.log(error); 
        return {success: false}; 
    }
}); 