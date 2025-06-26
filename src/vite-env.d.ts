/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

import type { RefObject, MutableRefObject, HtmlHTMLAttributes } from 'react';
import type { Socket } from 'socket.io-client';
import type { Store } from '@tauri-apps/plugin-store';

interface backToFront {
  modelMSG: (modelOutput: string) => void;
}

interface frontToBack {
  chatToModel: (model: string, message: string)=>void
}

declare global{
    var text: RefObject<HTMLTextAreaElement>;
    var allowToSend: MutablefObject<boolean>;
    var alreadyMsg: MutableRefObject<boolean>;
    var arrowUpColor: MutableRefObject<string>;
    var setInputText: Dispatch<SetStateAction<string>>;
    var socketio: Socket<backToFront, frontToBack> | undefined;
    var currentModel: string;
    var lightColor: string;
    var darkColor: string;
    var settingsDB: Store;
}
