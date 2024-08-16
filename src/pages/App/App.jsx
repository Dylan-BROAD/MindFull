import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser, logout } from '../../utilities/users-service';
import HomePage from '../HomePage/HomePage';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import MindfullPage from '../MindfullPage/MindfullPage';
import EditPage from '../EditPage/EditPage';

const App = () => {
  const [user, setUser] = useState(null);
  const [spotifyToken, setSpotifyToken] = useState(null);
  const [player, setPlayer] = useState(null);  // State to hold the Spotify Player
  const [currentTrack, setCurrentTrack] = useState(null);  // State to hold the current track info

  useEffect(() => {
    const currentUser = getUser();
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
    setUser(getUser());
  };

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  const playRandomSong = async () => {
    if (!spotifyToken) return;

    // Fetch a random song
    const response = await fetch('https://api.spotify.com/v1/search?q=genre:pop&type=track&limit=50', {
      headers: {
        Authorization: `Bearer ${spotifyToken}`,
      },
    });
    const data = await response.json();
    const randomTrack = data.tracks.items[Math.floor(Math.random() * data.tracks.items.length)];

    // Initialize the Spotify Player if it hasn't been initialized yet
    if (!player) {
      const newPlayer = new window.Spotify.Player({
        name: 'Web Playback SDK',
        getOAuthToken: cb => { cb(spotifyToken); }
      });

      newPlayer.connect().then(success => {
        if (success) {
          newPlayer.addListener('ready', ({ device_id }) => {
            // Play the random song
            fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device_id}`, {
              method: 'PUT',
              body: JSON.stringify({ uris: [randomTrack.uri] }),
              headers: {
                Authorization: `Bearer ${spotifyToken}`,
              },
            });
          });

          newPlayer.addListener('player_state_changed', (state) => {
            if (!state) {
              return;
            }
            setCurrentTrack(state.track_window.current_track);  // Update current track info
          });
        }
      });

      // Store the player in state
      setPlayer(newPlayer);
    } else {
      // If the player already exists, just play the song
      player.getOAuthToken(token => {
        fetch(`https://api.spotify.com/v1/me/player/play`, {
          method: 'PUT',
          body: JSON.stringify({ uris: [randomTrack.uri] }),
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      });
    }
  };

  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage user={user} handleLogout={handleLogout} playRandomSong={playRandomSong} currentTrack={currentTrack} />} />
        <Route path="/signup" element={<SignupPage handleSignupOrLogin={handleSignupOrLogin} />} />
        <Route path="/login" element={<LoginPage handleSignupOrLogin={handleSignupOrLogin} />} />
        <Route path="/mindfull" element={<MindfullPage user={user} handleLogout={handleLogout} />} />
        <Route path="/edit" element={<EditPage user={user} handleLogout={handleLogout} />} />
      </Routes>
    </div>
  );
};

export default App;
