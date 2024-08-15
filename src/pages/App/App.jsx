import React from 'react';
import userService from '../../utilities/users-service';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import MindfullPage from '../MindfullPage/MindfullPage';
import EditPage from '../EditPage/EditPage';
import { useState } from 'react'




const App = () => {
  const [user, setUser] = useState(null)

  const handleSignupOrLogin = () => {
    setUser(
      userService.getUser()
    );
  }

  const handleLogout = () => {
    userService.logout();
    setUser(null);
  }


  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage user={user} handleLogout={handleLogout} />} />
        <Route path="/signup" element={<SignupPage handleSignupOrLogin={handleSignupOrLogin} />} />
        <Route path="/login" element={<LoginPage handleSignupOrLogin={handleSignupOrLogin} />} />
        <Route path="/Mindfull" element={<MindfullPage user={user} handleLogout={handleLogout} />} />
        <Route path="/edit" element={<EditPage location={window.location} user={user} handleLogout={handleLogout} />} />
      </Routes>
    </div>
  );

}

export default App;
