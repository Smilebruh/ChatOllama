import { Command } from '@tauri-apps/plugin-shell';
import { io, type Socket } from 'socket.io-client';
import tcpPortUsed from 'tcp-port-used';

interface backToFront {
  modelMSG: (modelOutput: string) => void;
}

interface frontToBack {
  chatToModel: (model: string, message: string)=>void
}

async function makeConnection(): Promise<Socket<backToFront,frontToBack>>{
    const command = Command.sidecar('binaries/ollama_api');
    const output = await command.spawn();
    console.log(output)

    await tcpPortUsed.waitUntilUsed(11435,500, 10000);
    console.log('done')
    const socketio = io('http://localhost:11435');

    //bind socketio listener
    socketio.on('connection_error',e => console.log(`Error : ${e}`))
    socketio.on('modelMSG', modelOutput => {
        console.log(modelOutput)
    })
    return socketio;  
}

async function sendMassage(model: string, message: string) {
    if (!model || !message || !socketio ) return;
    console.log("success")
    console.log(socketio)
    socketio.emit('chatToModel',model,message);
    console.log("send message")
}


export { makeConnection, sendMassage }