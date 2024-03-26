import axios from 'axios'
import React, { useEffect, useState } from 'react';
import Register from './register';
import Login from './login';

const App = () => {
  const [showRegisterPage, setshowRegisterPage] = useState(true)

  const logIn = () => {
    console.log("Log In")
    setshowRegisterPage(false);
  }

  const handleRegister = () => {
    setshowRegisterPage(true);
  }

  return (
    <div className='App'>
      {
        showRegisterPage ? (
          <Register  handleLogIn = {logIn}></Register >
        ) : (
          <Login handleRegister = {handleRegister}></Login>
        )
      }
    </div >
  )
}

export default App;