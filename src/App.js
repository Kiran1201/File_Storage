import './App.css';
import LoginPage from './component/login/LoginPage';
import MainLayout from './component/Pages/MainLayout';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from 'react';
import AppRouter from './component/routers/AppRouter';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Handle login success
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="main-content"> {/* Main content area */}
      {!isLoggedIn ? (
        <LoginPage onLogin={handleLogin} />
      ) : (
        <AppRouter />,
        <MainLayout />
      )}
    </div>
  );
}

export default App;
