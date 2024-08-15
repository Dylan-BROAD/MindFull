import { useEffect, useState } from 'react';
import NavBar from "../../components/NavBar/NavBar";
import MindfullForm from "../../components/Mindfull/MindfullForm";

const HomePage = (props) => {
    const [spotifyToken, setSpotifyToken] = useState(null);
    const [spotifyUser, setSpotifyUser] = useState(null);

    useEffect(() => {
        // Get the Spotify token from local storage
        const token = window.localStorage.getItem("spotify_token");
        if (token) {
            setSpotifyToken(token);
            fetchSpotifyUser(token);
        }
    }, []);

    const handleSpotifyLogin = () => {
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
        // Clear the Spotify token from local storage
        window.localStorage.removeItem("spotify_token");
        setSpotifyToken(null); // Update the state to reflect logout
        setSpotifyUser(null);  // Clear the Spotify user information

        // Optional: Redirect the user to a safe state, like the homepage
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
        props.handleLogout(); // Log out from your application
        handleSpotifyLogout(); // Log out from Spotify
    };

    let homepage = spotifyUser ? (
        <div className="flex flex-col items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-white bg-opacity-80 shadow-md rounded-lg">
            <MindfullForm user={spotifyUser} />
            <h1 className="text-3xl font-semibold mt-8 text-gray-800">
                Hello, {spotifyUser.display_name || spotifyUser.email}!
            </h1>
            <button
                onClick={handleSpotifyLogout}
                className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-200"
            >
                Log Out from Spotify
            </button>
        </div>
    ) : (
        <div className="flex flex-col items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-white bg-opacity-80 shadow-md rounded-lg">
            <h1 className="text-3xl font-semibold text-gray-800 mb-4">Welcome to MindFull</h1>
            <p className="text-lg text-gray-700 mb-8">Please link your spotify to access your journals and more.</p>
            <button
                onClick={handleSpotifyLogin}
                className="w-full max-w-xs bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-200"
            >
                Link with Spotify
            </button>
        </div>
    );

    return (
        <div
            className="min-h-screen flex flex-col bg-cover bg-center"
            style={{ backgroundImage: `url('/bg-image.jpg')` }}
        >
            {/* Pass spotifyUser to NavBar */}
            <NavBar user={spotifyUser || props.user} handleLogout={handleLogout} spotifyUser={spotifyUser} />
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
