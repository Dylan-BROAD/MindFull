import { useState } from 'react';
import SignupForm from '../../components/SignUpForm/SignUpForm';

const SignupPage = (props) => {
    const [message, setMessage] = useState('');

    const updateMessage = (msg) => {
        setMessage(msg);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url('/bg-image.jpg')` }}>
            <div className="w-full max-w-md bg-white bg-opacity-90 p-8 pr-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-center mb-6"> </h2>
                <SignupForm {...props} updateMessage={updateMessage} />
                {message && <p className="text-red-500 text-center mt-4">{message}</p>}
            </div>
        </div>
    );
}

export default SignupPage;
