import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


import {ShowPanel} from "./panelerror/PanelError";
import { MdAlarmAdd } from "react-icons/md";
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

const b1=document.getElementById("bt1");
b1.onclick=function (){
    ShowPanel({message:"error timeout=5c",type:"error",image:'./error.png',head:'ERROR'})
}
const b2=document.getElementById("bt2");
b2.onclick=function (){
    ShowPanel({message:"error timeout=-1c",type:"error",timeout:-1,image:'./error.png',head:'ERROR'})
}

const b3=document.getElementById("bt3");
b3.onclick=function (){
    ShowPanel({message:"warning timeout=5c",type:"warning",image:'./logo192.png'})
}

const b4=document.getElementById("bt4");
b4.onclick=function (){
    ShowPanel({message:"info timeout=5c",type:"info"})
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

