import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState, type ReactElement } from 'react';
import ReactDom, { type Container } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import WrapperComponent from './App.js';
import "@mantine/core/styles.css";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { MantineProvider } from "@mantine/core";

// Recperation de la route grace createRoot
const root = ReactDom.createRoot(document.getElementById('root'));

const isLoad = document.querySelector('.load');

function dom(callBack: Function)
{
  if (document.readyState === 'complete')
  {
    callBack();
  } else
  {
    document.addEventListener('DOMContentLoaded', callBack());
  }
}

dom(() =>
{
  // Insertion dans le DOM
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <MantineProvider>
          <WrapperComponent />
        </MantineProvider>

      </BrowserRouter>
    </React.StrictMode>,
  );
});
