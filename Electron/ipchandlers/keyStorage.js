import Store from 'electron-store';
import { ipcMain } from 'electron';

export default function apiKeyHandler(){
    const store = new Store()
  ipcMain.on('share-apikey', (event,key) => {
    store.set('gemini.key', key);
  })

  ipcMain.handle('get-api-key', ()=>{
    return store.get('gemini.key')
  })
}