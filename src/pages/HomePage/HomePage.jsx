import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from "../../components/NavBar/NavBar";
import MindfullForm from "../../components/Mindfull/MindfullForm";

const HomePage = (props) => {
    const [spotifyToken, setSpotifyToken] = useState(null);
    const [spotifyUser, setSpotifyUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const hash = window.location.hash;
        let token = window.localStorage.getItem("spotify_token");

        if (!token && hash) {
            const urlParams = new URLSearchParams(hash.substring(1));
            token = urlParams.get('access_token');

            if (token) {
                window.localStorage.setItem("spotify_token", token);
                window.location.hash = ''; // Clear the hash to avoid repetition
                setSpotifyToken(token);
                fetchSpotifyUser(token);
            }
        } else if (token) {
            setSpotifyToken(token);
            fetchSpotifyUser(token);
        }
    }, []);

    const handleSpotifyLogin = () => {
        if (!props.user) {
            alert("You must be logged in to link your Spotify account.");
            return;
        }

        const clientId = 'c77eb0411ae3492a8dbaf29ec8bdf249';
        const redirectUri = 'http://localhost:3000/';
        const scopes = [
            'streaming',
            'user-read-email',
            'user-read-private',
        ];

        window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scopes.join('%20')}&response_type=token&show_dialog=true`;
    };

    const handleSpotifyLogout = () => {
        window.localStorage.removeItem("spotify_token");
        setSpotifyToken(null);
        setSpotifyUser(null);
        window.location = '/';
    };

    const fetchSpotifyUser = async (token) => {
        try {
            const response = await fetch('https://api.spotify.com/v1/me', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            setSpotifyUser(data);
        } catch (error) {
            console.error('Error fetching Spotify user:', error);
        }
    };

    const handleLogout = () => {
        props.handleLogout();
        handleSpotifyLogout();
    };

    let homepage;

    if (props.user) {
        homepage = spotifyUser ? (
            <div className="flex flex-col items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-white bg-opacity-80 shadow-md rounded-lg">
                <MindfullForm user={spotifyUser} />
                {props.currentTrack && (
                    <div className="text-center mt-4">
                        <h2 className="text-xl font-bold">{props.currentTrack.name}</h2>
                        <p className="text-gray-700">
                            {props.currentTrack.artists.map(artist => artist.name).join(', ')}
                        </p>
                    </div>
                )}
                <button onClick={props.playRandomSong} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200">
                    Play Random Song
                </button>
                <button
                    onClick={handleSpotifyLogout}
                    className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-200"
                >
                    Log Out from Spotify
                </button>
            </div>
        ) : (
            <div className="flex flex-col items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-white bg-opacity-80 shadow-md rounded-lg">
                <p className="text-lg text-gray-700 mb-8">Please link your Spotify to begin your journey.</p>
                <button
                    onClick={handleSpotifyLogin}
                    className="w-full max-w-xs bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-200"
                >
                    Link with Spotify
                </button>
            </div>
        );
    } else {
        homepage = (
            <div className="flex flex-col items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-white bg-opacity-80 shadow-md rounded-lg">
                <p className="text-lg text-gray-700 mb-8">In order to experience all that MindFull has to offer, please log in or sign up.</p>
                <div className="flex flex-col items-center space-y-4">
                    <button
                        onClick={() => navigate('/login')}
                        className="w-full max-w-xs bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
                    >
                        Log In
                    </button>
                    <p className="text-gray-500">or</p>
                    <button
                        onClick={() => navigate('/signup')}
                        className="w-full max-w-xs bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-200"
                    >
                        Sign Up
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div
            className="min-h-screen flex flex-col bg-cover bg-center"
            style={{ backgroundImage: `url('/bg-image.jpg')` }}
        >
            <NavBar user={props.user} handleLogout={handleLogout} spotifyUser={spotifyUser} />
            <div className="flex-grow flex items-center justify-center p-4">
                <div className="w-full max-w-3xl space-y-8">
                    <div className="text-center">
                        <h2 className="text-4xl font-bold text-white mb-4">
                            Welcome to MindFull
                        </h2>
                        <p className="text-lg text-white bg-opacity-80 bg-gray-800 p-4 rounded-lg">
                            Your space to reflect, grow, and achieve your goals.
                        </p>
                    </div>
                    {homepage}
                </div>
            </div>
            <footer className="bg-gray-900 text-white py-4 bg-opacity-80">
                <div className="text-center text-sm">
                    &copy; 2024 MindFull. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
