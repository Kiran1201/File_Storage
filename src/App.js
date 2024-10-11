import './App.css';
import LoginPage from './component/login/LoginPage';
import { BrowserRouter as Router } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from 'react';
import MainLayout from './component/Pages/MainLayout';
import Header from './component/Pages/Header';
import Footer from './component/Pages/Footer';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className='app-container'>
      <Header />
      <Router>
        <CssBaseline />
        <div className='main-content'>
          {!isLoggedIn ? (
            <LoginPage onLogin={handleLogin} />
          ) : (
            <MainLayout />
          )}
        </div>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
