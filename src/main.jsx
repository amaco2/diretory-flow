import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import React from "react";
import ReactDom from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import WrapperComponent from "./WrapperComponents.jsx";

// Recperation de la route grace createRoot
const root = ReactDom.createRoot(document.getElementById('root'));

// Insertion dans le DOM
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <WrapperComponent />     
   </BrowserRouter>
  </React.StrictMode>
)