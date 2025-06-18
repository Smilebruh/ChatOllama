import React, { useRef, useEffect, useState } from "react";

export default function ChatPage(): React.ReactElement {
    const [inputText, setInputText] = useState('');
    const text: React.RefObject<HTMLTextAreaElement> = useRef(null);
    useEffect(()=>{
        if(!text.current || text.current.scrollHeight > 192) return;

        text.current.style.height = "auto";
        text.current.style.height = `${text.current.scrollHeight}px`;
        console.log(text.current.style.height)
    }, [inputText]);

    return (
        <main className="flex flex-col items-center w-[calc(100%-280px)]">
        <h1 className="flex justify-center h-15 w-1/2 text-[30px] mt-65">
            How Can i Help ?
        </h1>
        <div className="flex items-center min-w-1/2 min-h-15 rounded-2xl bg-zinc-700">
            <textarea
                ref={text}
                onChange={e=> setInputText(e.target.value)}
                className="resize-none w-[90%] h-15 pl-5 focus:outline-none overflow-hidden my-4"
                rows={1}
                placeholder="ask anything"
            />
            <div className="focus:outline-none flex items-end min-h-[80%]">
                <button className="flex w-10 h-10 rounded-full cursor-pointer">
                    <img className="flex w-full h-full" src="/images/arrow-up.svg" alt="arrow up logo" />
                </button>

            </div>
        </div>
        </main>
  );
}
