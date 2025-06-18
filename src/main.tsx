import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from 'react-router-dom';
import './tailwind.css'

interface RootElement{
  children: React.ReactNode,
  className? : string
}

function Root({children, className = ""} : RootElement): React.ReactElement {
  return (
    <div className={className}>
      {children}
    </div>
  )
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <Root className="flex min-w-screen min-h-screen bg-[#222426] text-[#F2F2F2] ">
        <App />
      </Root>
    </Router>
  </React.StrictMode>,
);
