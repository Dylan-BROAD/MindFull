import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as userService from '../../utilities/users-service';

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
      await userService.login(credentials); // Now uses the updated login function with sendRequest
      handleSignupOrLogin(); // Call the parent function to update user state
      navigate('/'); // Redirect to the home page after successful login
    } catch (err) {
      const errorMessage = err.message || 'Login failed due to network error';
      setError(errorMessage); // Display the error message
    }
  }

  function handleSpotifyLogin() {
    const clientId = 'c77eb0411ae3492a8dbaf29ec8bdf249';
    const redirectUri = 'https://mindfull-wagf.onrender.com';
    const scopes = [
      'streaming',
      'user-read-email',
      'user-read-private',
      'user-modify-playback-state',
      'user-read-playback-state',
    ];

    window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=token&show_dialog=true`;
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url('/bg-image.jpg')` }}
    >
      <div className="max-w-md mx-auto bg-white bg-opacity-90 py-10 px-10 rounded-lg shadow-md">
        <header className="text-2xl font-bold text-center mb-6">Log In</header>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="w-full py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Email"
              value={credentials.email}
              name="email"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="w-full py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Password"
              value={credentials.password}
              name="password"
              onChange={handleChange}
            />
          </div>
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          <div className="form-group text-center mt-6">
            <button
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
              type="submit"
            >
              Log In
            </button>
          </div>
          <div className="form-group text-center mt-4">
            <Link to='/' className="text-blue-500 hover:text-blue-700">Cancel</Link>
          </div>
        </form>
        <div className="text-center mt-4">

        </div>
      </div>
    </div>
  );
}
