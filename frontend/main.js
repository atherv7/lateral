const path = require('path');
const { app, BrowserWindow, ipcMain, session } = require('electron');
const fetch = require('electron-fetch').default; 
const macintosh = process.platform == 'darwin';

function createHomeWindow() {
    const homeWindow = new BrowserWindow({
        title: 'lateral',
        width: 1100,
        height: 500, 
        webPreferences: {
            contextIsolation: true, 
            nodeIntegration: true, 
            preload: path.join(__dirname, 'preload.js')
        }
    });

    homeWindow.webContents.openDevTools();

    // production build
    // const startUrl = url.format({
    //     pathname: path.join(__dirname, './app/index.html'),
    //     protocol: 'file'
    // });
    // homeWindow.loadURL(startUrl);

    //dev build
    homeWindow.loadURL('http://localhost:3000/');
}

app.whenReady().then(()=>{
    createHomeWindow();

    app.on('activate', () => {
        if(BrowserWindow.getAllWindows().length === 0) {
            createHomeWindow();
        }
    })
});

app.on('window-all-closed', ()=>{
    if(!macintosh) {
        app.quit();
    }
});

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