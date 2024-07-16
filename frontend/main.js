const path = require('path'); 
const { app, BrowserWindow } = require('electron'); 

function createHomeWindow() {
    const homeWindow = new BrowserWindow({
        title: 'lateral', 
        width: 600, 
        height: 500 
    }); 

    homeWindow.loadFile(path.join(__dirname, './gu_interface/home.html')); 
}

app.whenReady().then(()=>{
    createHomeWindow(); 
}); 