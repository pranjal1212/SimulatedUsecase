import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './register';
import Login from './login';
import HomePage from './HomePage';
 
const App = () => {
  const [showRegisterPage, setshowRegisterPage] = useState(true);
 
  const logIn = () => {
    console.log("Log In")
    setshowRegisterPage(false);
  }
 
  const handleRegister = () => {
    setshowRegisterPage(true);
  }
 
  return (
    <Router>
      <Routes>
        <Route path="/" element={showRegisterPage ? <Register handleLogIn={logIn} /> : <Login handleRegister={handleRegister} />} />
        <Route path="/HomePage" element={<HomePage />} />
      </Routes>
    </Router>
  );
}
 
export default App;