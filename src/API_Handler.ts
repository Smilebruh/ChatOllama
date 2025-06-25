import { io , type Socket} from 'socket.io-client';
import { Command } from '@tauri-apps/plugin-shell';

interface GetModelOutput {
  modelMSG: (modelOutput: string) => void;
}

let sockIoClient: Socket<GetModelOutput>;
let data = "";
const start_server = async ()=> {
    const command = Command.sidecar('binaries/ollama_api');
    const output = await command.execute();
    console.log(output.stdout);
    sockIoClient = io("http://localhost:11435");
    
    sockIoClient.on('modelMSG', modelOutput => {
        data+=modelOutput
    });
}


export { start_server }