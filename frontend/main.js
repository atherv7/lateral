const path = require('path');
const { app, BrowserWindow } = require('electron');

const macintosh = process.platform == 'darwin';

function createHomeWindow() {
    const homeWindow = new BrowserWindow({
        title: 'lateral',
        width: 1100,
        height: 500
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
