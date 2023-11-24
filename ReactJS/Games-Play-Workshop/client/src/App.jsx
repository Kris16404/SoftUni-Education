import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/header/Header.jsx';
import Home from './components/home/Home.jsx';
import Catalogue from './components/catalogue/Catalogue.jsx';
import GameCreate from './components/gameCreate/GameCreate.jsx';
import Login from './components/login/Login.jsx';
import Register from './components/register/Register.jsx';

function App() {
  return (
    <div id="box">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games/all" element={<Catalogue />} />
        <Route path="/games/create" element={<GameCreate />} />
        <Route path="/users/login" element={<Login />} />
        <Route path="/users/register" element={<Register />} />
        <Route path="/users/logout" />
      </Routes>
    </div>
  );
}

export default App;
