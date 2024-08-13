import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icon, Input } from 'semantic-ui-react';
import userService from '../../utilities/users-service';
import './LoginPage.css';

export default function LoginPage({ handleSignupOrLogin }) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
    setError(''); // Clear any existing errors on input change
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const response = await userService.login(credentials);
      console.log('Login Response:', response); // Log the successful response
      handleSignupOrLogin(); // Call the parent function to update user state
      navigate('/');
    } catch (err) {
      // Log the full error object
      console.error('Login Error Details:', err);
      const errorMessage = err.message || 'Login failed due to network error';
      setError(errorMessage);
    }
  }

  return (
    <div className="LoginPage">
      <header className="header-footer">Log In</header>
      <form className="form-horizontal" onSubmit={handleSubmit}>
        <div className="form-group">
          <div className="col-sm-12">
            <Input iconPosition='left' placeholder='Email'>
              <input
                type="email"
                placeholder="Email"
                value={credentials.email}
                name="email"
                onChange={handleChange}
              />
              <Icon name='at' />
            </Input>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-12">
            <Input
              type="password"
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              value={credentials.password}
              name="password"
              onChange={handleChange}
            />
          </div>
        </div>
        {error && <div className="error-message">{error}</div>}
        <div className="form-group">
          <div className="col-sm-12 text-center">
            <button className="btn btn-default">Log In</button>&nbsp;&nbsp;&nbsp;
            <Link to='/'>Cancel</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
