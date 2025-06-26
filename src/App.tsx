import React, { useEffect, useRef } from 'react'
import ChatPage from './ChatPage'
import { makeConnection } from './API_Handler'
import { greet } from './UI_Handler';
import { initSettings } from './DB_Handler';


export default function App(): React.ReactElement{
  const hasRun = useRef(false);

  useEffect(()=>{
    if(hasRun.current) return;
    hasRun.current = true;

    //init ChatOllama settings
    initSettings();

    //Init API server connection
    (async ()=> {
      globalThis.socketio = await makeConnection();
    })();

    //greet from Alex :)
    greet("alexstyle");
  })

  return (
    <div className="flex w-full">
      <nav className="flex flex-col items-center h-full w-70 bg-neutral-950 rounded-r-sm font-poppins">
        <div className="flex w-[90%] font-bold text-[20px] m-2 mt-4 gap-6">
          <img src="/images/ollama_logo.png" className="ml-2 w-8 h-8"/>
          <h1 className='flex justify-center items-center h-8'>ChatOllama</h1>
        </div>
        <button className="flex items-center gap-2 w-[90%] h-8 rounded-lg mt-5 hover:bg-[#727273] cursor-pointer">
          <img className="ml-2 w-5 h-5 flex justify-center items-center" src="/images/pencil-square.svg"/>
          <p className="flex justify-center items-center">New Chat</p>
        </button>

        <div className="flex items-center w-[90%]">
          <h1 className="ml-2 mt-8 text-[#A6A6A6] select-none">Chats</h1>
        </div>
      </nav>
      <ChatPage />
    </div>
)
}