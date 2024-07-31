require('./functionHandling.js'); 
const path = require('path');
const { app, BrowserWindow } = require('electron');
const macintosh = process.platform == 'darwin';

const findFriendReqBackground = () => {
    setInterval(async () => {
        try {
            const response = await fetch(
                                   'https://dadsso6fxc.execute-api.us-east-1.amazonaws.com/dev/version1/friends/pending', 
                                    {
                                        method: 'GET', 
                                        headers: {
                                            'Content-Type': 'application/json', 
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
    }, (6000*15)); 
}

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

    findFriendReqBackground(); 
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