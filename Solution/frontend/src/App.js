import React from 'react';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import Login from './Login';
import SelectGym from './SelectGym'
import HomePage from './HomePage'

const App = () => {
   return (
   <Router>
      <Routes>
         <Route path="/" element={<Login/>}/>
         <Route path="/SelectGym" element={<SelectGym/>}/>
         <Route path="/HomePage" element={<HomePage/>}/>
      </Routes>
   </Router>
   );
};
export default App;