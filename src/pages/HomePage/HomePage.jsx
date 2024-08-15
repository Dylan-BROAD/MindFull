import NavBar from "../../components/NavBar/NavBar";
import MindfullForm from "../../components/Mindfull/MindfullForm";

const HomePage = (props) => {
    let homepage = props.user ? (
        <div className="flex flex-col items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-white bg-opacity-80 shadow-md rounded-lg">
            <MindfullForm user={props.user} />
            <h1 className="text-3xl font-semibold mt-8 text-gray-800">
                Hello, {props.user.name}!
            </h1>
        </div>
    ) : (
        <></>
    );

    return (
        <div
            className="min-h-screen flex flex-col bg-cover bg-center"
            style={{ backgroundImage: `url('/bg-image.jpg')` }}
        >
            <NavBar user={props.user} handleLogout={props.handleLogout} />
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
