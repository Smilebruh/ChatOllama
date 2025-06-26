import { Store } from '@tauri-apps/plugin-store';

async function initSettings(){
    const settingsDB = await Store.load('setting-ChatOllama.json', { autoSave : true});
    globalThis.settingsDB = settingsDB;
}

export { initSettings }