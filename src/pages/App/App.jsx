import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import userService from '../../utilities/users-service';
import HomePage from '../HomePage/HomePage';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import MindfullPage from '../MindfullPage/MindfullPage';
import EditPage from '../EditPage/EditPage';

const App = () => {
  const [user, setUser] = useState(null);
  const [spotifyToken, setSpotifyToken] = useState(null);

  useEffect(() => {
    const currentUser = userService.getUser();
    if (currentUser) setUser(currentUser);

    const hash = window.location.hash;
    let token = window.localStorage.getItem("spotify_token");

    if (!token && hash) {
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1];
      window.location.hash = "";
      window.localStorage.setItem("spotify_token", token);
    }

    setSpotifyToken(token);
  }, []);

  const handleSignupOrLogin = () => {
    setUser(userService.getUser());
  };

  const handleLogout = () => {
    userService.logout();
    setUser(null);
  };

  const playRandomSong = async () => {
    if (!spotifyToken) return;

    const response = await fetch('https://api.spotify.com/v1/search?q=genre:pop&type=track&limit=50', {
      headers: {
        Authorization: `Bearer ${spotifyToken}`,
      },
    });
    const data = await response.json();
    const randomTrack = data.tracks.items[Math.floor(Math.random() * data.tracks.items.length)];

    const player = new window.Spotify.Player({
      name: 'Web Playback SDK',
      getOAuthToken: cb => { cb(spotifyToken); }
    });

    player.connect().then(success => {
      if (success) {
        player.addListener('ready', ({ device_id }) => {
          fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device_id}`, {
            method: 'PUT',
            body: JSON.stringify({ uris: [randomTrack.uri] }),
            headers: {
              Authorization: `Bearer ${spotifyToken}`,
            },
          });
        });
      }
    });
  };

  return (
    <div>
      <nav>
        <button onClick={playRandomSong}>Play Random Song</button>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage user={user} handleLogout={handleLogout} />} />
        <Route path="/signup" element={<SignupPage handleSignupOrLogin={handleSignupOrLogin} />} />
        <Route path="/login" element={<LoginPage handleSignupOrLogin={handleSignupOrLogin} />} />
        <Route path="/mindfull" element={<MindfullPage user={user} handleLogout={handleLogout} />} />
        <Route path="/edit" element={<EditPage user={user} handleLogout={handleLogout} />} />
      </Routes>
    </div>
  );
};

export default App;
