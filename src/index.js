import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App_1 from "./App";
import reportWebVitals from "./reportWebVitals";
import ContextWrapper from "./context/ContextWrapper";

export var flag_show_lunar=false;
var k=1;

export function check_flag_show_lunar(check)
{
  // k++
  flag_show_lunar=check
  Render_App(check)

}
Render_App(false)
export function Render_App(flag_show_lunar){
  {ReactDOM.render(
    <React.StrictMode>
      <ContextWrapper>
        <App_1 check={flag_show_lunar}/>
      </ContextWrapper>
    </React.StrictMode>,
    document.getElementById("root")
  );
}
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
