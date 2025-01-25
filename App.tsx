import React, { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { AuthForm } from './components/AuthForm';
import { Dashboard } from './components/Dashboard';

function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleLogin = (newToken: string) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <>
      <Toaster position="top-right" />
      {!token ? (
        <AuthForm onLogin={handleLogin} />
      ) : (
        <Dashboard onLogout={handleLogout} />
      )}
    </>
  );
}

export default App;