import React from 'react';
import './App.css';
import Navbar from './comp2/navbar.js';
import { BrowserRouter as Router, Switch, Route,Routes } from 'react-router-dom';
import Home from './pages/Home';
import Reports from './pages/Reports';
import Products from './pages/products';
import Foodstock from './pages/Foodstock';
import Finance from './pages/Finance';
import Usersupport from './pages/Usersupport';
import Login from './Components/Pages/login';
import Sick from './pages/sick';



function App() {
  return (
    <>
      <Router>
        
        <Routes>
        <Route path='/' exact element={<Login/>} />

          <Route path='/Home' exact element={<Home/>} />
          <Route path='/Home/sick' exact element={<Sick/>} />
          <Route path='/Home/Reports' element={<Reports/>} />
          <Route path='/Home/products' element={<Products/>} />
          <Route path='/Home/Foodstock' element={<Foodstock/>} />
          <Route path='/Home/Finance' element={<Finance/>} />
          <Route path='/Home/Usersupport' element={<Usersupport/>} />
          </Routes>
      </Router>
    </>
  );
}

export default App;