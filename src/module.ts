import React from "react";
// import { Command } from '@tauri-apps/api/shell'
// import { invoke } from '@tauri-apps/api/core';
import { Command } from '@tauri-apps/plugin-shell';

async function sendMassage(text: React.RefObject<HTMLTextAreaElement>,model: string){
    if(!text.current) return;
    // let res: any = await callFunction('runModel',[model,JSON.stringify({
    //     data: [{
    //         role: "user",
    //         content: "hai"
    //     }]
    // })])
    // text.current.value = "";

    
    // console.log(res)
   
}

const start_server = async ()=> {
    console.log("server has started : 11435")
    // const cmd = Command.sidecar('ollama_api')
    // await invoke<string>('ollama_api');
    // const output = await cmd.execute()
    // console.log(output.stdout)
    const command = Command.sidecar('binaries/ollama_api');
    const output = await command.execute();
    console.log(output.stdout);
    //it funcking  works !!!

}
export { sendMassage , start_server }