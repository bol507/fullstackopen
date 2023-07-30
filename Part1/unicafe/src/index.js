//react imports
import React from 'react';
import { createRoot } from 'react-dom/client';
//local imports
import App from './App';


//new method in react18
const container = document.getElementById('root');
const root = createRoot(container); 
root.render(<App />);