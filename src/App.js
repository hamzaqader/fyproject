import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route,Routes } from 'react-router-dom';
import Navroute from './navroute';
import Login from './Components/Pages/login'
import Modal from 'react-modal';



function App() {
  return (
   <Navroute />
  );
}
export default App;

