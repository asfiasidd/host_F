import React, { useState, useEffect } from 'react';
import AuthForm from './components/AuthForm';
import ProfileForm from './components/ProfileForm';
import ProfilePreview from './components/ProfilePreview';
import { getProfile } from './services/api';
import './App.css'
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem('token')
  );
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (isLoggedIn) {
      getProfile()
        .then((res) => setProfile(res.data))
        .catch(() => setProfile(null));
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return <AuthForm onLoginSuccess={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="min-h-screen p-6">
      <button
        onClick={() => {
          localStorage.removeItem('token');
          setIsLoggedIn(false);
          setProfile(null);
        }}
        className="mb-4 bg-red-600 text-white px-4 py-2 rounded"
      >
        Logout
      </button>

      <ProfileForm />
      <ProfilePreview profile={profile} />
    </div>
  );
};

export default App;
