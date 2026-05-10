import React, { useState } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import Settings from './components/Settings';
import Auth from './components/Auth';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="app">
      {isLoggedIn ? (
        <>
          <Dashboard onLogout={() => setIsLoggedIn(false)} />
          <button 
            className="settings-fab"
            onClick={() => setShowSettings(true)}
          >
            ⚙️
          </button>
          {showSettings && (
            <Settings onClose={() => setShowSettings(false)} />
          )}
        </>
      ) : (
        <Auth onLoginSuccess={() => setIsLoggedIn(true)} />
      )}
    </div>
  );
};

export default App;
