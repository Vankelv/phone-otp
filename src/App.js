import React from 'react';
import Login from './login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';


const App = () => {
  return (
    <div>
     <Login />
     <BrowserRouter>
     <Routes>
      <Route path="/Home" element={<Home/>} />
     </Routes>
     </BrowserRouter>
    </div>
  );
};

export default App;
