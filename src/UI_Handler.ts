import React from "react";
import { sendMassage } from "./API_Handler";
import { invoke } from '@tauri-apps/api/core';


async function sleep(time: number): Promise<void>{
    return new Promise(resolve => setTimeout(resolve,time));
}
async function greet(msg: string){
    console.log(await invoke<string>('greet',{name: msg}))
}

function runSendButton() {
    if (!allowToSend.current) return;
    if(text.current) sendMassage(currentModel, text.current?.value);
    allowToSend.current = false;
    arrowUpColor.current = darkColor;
    if (text.current) text.current.value = "";
    setInputText("");
}

function textAreaKeyHandler(
    element: React.KeyboardEvent<HTMLTextAreaElement>
): void {
    if (element.key === "Enter") element.preventDefault();

    if (element.key === "Enter" && !element.shiftKey) {
        runSendButton();
        return;
    }

    if (element.key === "Enter" && element.shiftKey) {
        const currentTarget = element.target as HTMLTextAreaElement;
        const { selectionStart, value, selectionEnd } = currentTarget;
        let newVal: string =
            value.slice(0, selectionStart) + "\n" + value.slice(selectionEnd);
        currentTarget.value = newVal;
        currentTarget.selectionStart = currentTarget.selectionEnd =
            selectionEnd + 1;
        setInputText(currentTarget.value);
    }
};

export { runSendButton, textAreaKeyHandler, greet , sleep }