import React, { useRef, useEffect, useState } from "react";
import Select, { StylesConfig } from "react-select";
import ArrowUp from "/public/images/arrow-up.svg?react";
import { sendMassage, start_server } from "./module";

interface Options {
  value: string;
  label: string;
}

export default function ChatPage(): React.ReactElement {
  const [inputText, setInputText] = useState("");
  const text: React.RefObject<HTMLTextAreaElement> = useRef(null);
  const arrowUpColor = useRef("#52525c");
  const allowToSend = useRef(false);
  const [currentModel, setCurrentModel] = useState("");
  
  const runSendButton = () => {
    if(!allowToSend.current) return;
    sendMassage(text,currentModel);
    arrowUpColor.current = "#52525c";
    setInputText("");
  }

  const textAreaKeyHandler = (
    element: React.KeyboardEvent<HTMLTextAreaElement>
  ): void => {
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


  const customStyles: StylesConfig<Options, false> = {
    control: (defaultStyles) => {
      return {
        ...defaultStyles,
        backgroundColor: "none",
        border: "none",
        boxShadow: "none",
        width: "200px",
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
        backgroundColor: states.isFocused ? "#3f3f46" : "none",
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
    if (!text.current) return;

    if (text.current.scrollHeight > 192) return;
    text.current.style.height = "auto";
    text.current.style.height = `${text.current.scrollHeight}px`;
    allowToSend.current = !!text.current.value.replaceAll(/\s/g, "");
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
      <h1 className="flex justify-center h-15 w-1/2 text-[30px] mt-40">
        How can I help with ?
      </h1>
      <div className="inline-flex flex-col justify-center min-w-1/2 min-h-16 rounded-2xl bg-zinc-700">
        <div className="flex w-full min-h-10 mr-7 px-5 mt-4">
          <textarea
            ref={text}
            onKeyDown={textAreaKeyHandler}
            onChange={(e) => {
              arrowUpColor.current = !!e.target.value.replaceAll(/\s/g, "")
                ? "#F2F2F2"
                : "#52525c";
              setInputText(e.target.value);
            }}
            className="resize-none w-full h-full focus:outline-none overflow-hidden"
            rows={1}
            placeholder="ask anything"
          />
        </div>
        <div className="focus:outline-none flex justify-end items-center w-full h-7 mb-4">
          <button
            className="flex w-7 h-7 rounded-full cursor-pointer focus:outline-none mr-5"
            onClick={runSendButton}
          >
            <ArrowUp
              fill={arrowUpColor.current ?? ""}
              className="flex w-full h-full"
            />
          </button>
        </div>
      </div>
    </main>
  );
}
