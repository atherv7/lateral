const { contextBridge, ipcRenderer } = require('electron'); 

window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector); 
        if (element) element.innerText = text;
    }; 

    for (const type of ['chrome', 'node', 'electron']) {
        replaceText(`${type}--version`, process.versions[type]); 
    }
}); 


contextBridge.exposeInMainWorld("api", {
    login: (userInfo) => ipcRenderer.invoke('login', userInfo), 
    register: (userInfo) => ipcRenderer.invoke('register', userInfo), 
    selectFile: () => ipcRenderer.invoke('select-file'), 
    friendRequest: (friendUsername) => ipcRenderer.invoke('send-friend-req', friendUsername), 
    pendingRequests: (callback) => ipcRenderer.on('pending-requests', callback)
}); 