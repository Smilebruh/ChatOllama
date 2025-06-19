import React, { useRef, useEffect, useState } from "react";
import Select, { StylesConfig } from "react-select";
import ArrowUp from "/public/images/arrow-up.svg?react";

interface Options {
  value: string;
  label: string;
}

export default function ChatPage(): React.ReactElement {
  const [inputText, setInputText] = useState("");
  const text: React.RefObject<HTMLTextAreaElement> = useRef(null);
  const sendButton: React.RefObject<HTMLButtonElement> = useRef(null);
  const [currentModel, setCurrentModel] = useState("");

  const customStyles: StylesConfig<Options, false> = {
    control: (defaultStyles) => {
      return {
        ...defaultStyles,
        backgroundColor: "none",
        border: "none",
        boxShadow: 'none',
        width: '200px'
      };
    },
    singleValue: (defaultStyles) => {
      return {
        ...defaultStyles,
        color: "#F2F2F2",
      };
    },
    option: (defaultStyles, states) => {
      return {
        ...defaultStyles,
        backgroundColor: states.isFocused? '#3f3f46' : 'none'
      };
    },
    menu: (defaultStyles) => {
      return {
        ...defaultStyles,
        backgroundColor: "none",
        border: "none",
        color: "#F2F2F2",
      };
    },
  };
  const modelOptions: Options[] = [
    {
      value: "llama3:8b",
      label: "Llama 3",
    },
    {
      value: "qwen2.5-coder:latest",
      label: "Qwen 2.5 coder",
    },
    {
      value: "qwen2.5vl:latest",
      label: "Qwen 2.5 vl",
    },
  ];

  useEffect(() => {
    if (!text.current || text.current.scrollHeight > 192) return;

    text.current.style.height = "auto";
    text.current.style.height = `${text.current.scrollHeight}px`;
  }, [inputText]);

  return (
    <main className="flex flex-col items-center w-[calc(100%-280px)]">
      <div className="sticky top-0 flex justify-start w-full h-20">
        <Select
          options={modelOptions}
          className="m-3 h-full focus:outline-none"
          styles={customStyles}
          onChange={(value) => {
            if (!value) return;
            setCurrentModel(value.value);
          }}
          placeholder="Select a model"
        />
      </div>
      <h1 className="flex justify-center h-15 w-1/2 text-[30px] mt-65">
        How can I help with ?
      </h1>
      <div className="flex items-center min-w-1/2 min-h-16 rounded-2xl bg-zinc-700">
        <textarea
          ref={text}
          onChange={(e) => {
            setInputText(e.target.value);
          }}
          className="resize-none w-[85%] mr-7 h-16 pl-5 focus:outline-none overflow-hidden my-4"
          rows={1}
          placeholder="ask anything"
        />
        <div className="focus:outline-none flex justify-center items-center min-h-[80%]">
          <button
            ref={sendButton}
            className="flex w-10 h-10 rounded-full cursor-pointer focus:outline-none"
          >
            <ArrowUp className="flex w-full h-full " />
          </button>
        </div>
      </div>
    </main>
  );
}
