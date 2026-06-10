const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('hseUpdater', {
  version: (function(){ try { return ipcRenderer.sendSync('app-version'); } catch(e){ return ''; } })(),
  onAvailable: (cb) => ipcRenderer.on('update-available', (e, info) => cb(info)),
  onDownloaded: (cb) => ipcRenderer.on('update-downloaded', (e, info) => cb(info)),
  restart: () => ipcRenderer.send('update-restart')
});
