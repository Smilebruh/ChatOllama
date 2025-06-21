import React from "react";
import { callFunction } from "tauri-plugin-python-api";

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

const start_server = ()=> {
    console.log("server has started : 11435")
    callFunction("start_server",[])
}
export { sendMassage , start_server }