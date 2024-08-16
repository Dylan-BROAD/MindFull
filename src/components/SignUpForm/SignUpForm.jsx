import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../../utilities/users-service';

const SignupForm = ({ updateMessage, handleSignupOrLogin }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        passwordConf: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        updateMessage('');
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signup(formData);
            handleSignupOrLogin();
            navigate('/'); // Navigate to the home page after signup
        } catch (err) {
            updateMessage(err.message);
        }
    };

    const isFormInvalid = () => {
        return !(formData.name && formData.email && formData.password === formData.passwordConf);
    };

    return (
        <div className="max-w-md mx-auto mt-8 bg-white p-6 rounded-lg shadow-md">
            <header className="text-2xl font-bold text-center mb-6">Sign Up</header>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        className="w-full py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                        placeholder="Name"
                        value={formData.name}
                        name="name"
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        className="w-full py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                        placeholder="Email"
                        value={formData.email}
                        name="email"
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        className="w-full py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                        placeholder="Password"
                        value={formData.password}
                        name="password"
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        className="w-full py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                        placeholder="Confirm Password"
                        value={formData.passwordConf}
                        name="passwordConf"
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group text-center">
                    <button
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
                        disabled={isFormInvalid()}
                    >
                        Sign Up
                    </button>
                </div>
                <div className="form-group text-center mt-4">
                    <Link to='/' className="text-blue-500 hover:text-blue-700">Cancel</Link>
                </div>
            </form>
        </div>
    );
};

export default SignupForm;
