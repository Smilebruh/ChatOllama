import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './tailwind.css'

interface RootElement{
  children: React.ReactNode,
  className? : string
}

const lightColor = "#F2F2F2";
const darkColor = "#52525c";

globalThis.lightColor = lightColor;
globalThis.darkColor = darkColor;

function Root({children, className = ""} : RootElement): React.ReactElement {
  return (
    <div className={className}>
      {children}
    </div>
  )
}
//bg-[#222426
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
      <Root className="flex min-w-screen min-h-screen bg-zinc-900 text-[#F2F2F2] ">
        <App />
      </Root>
  </React.StrictMode>,
);
