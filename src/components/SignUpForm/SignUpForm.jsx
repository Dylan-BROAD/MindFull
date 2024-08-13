import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import userService from '../../utilities/users-service';

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
            await userService.signup(formData);
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
        <div>
            <header className="header-footer">SignUp</header>
            <form className="form-horizontal" onSubmit={handleSubmit} >
                <div className="form-group">
                    <div className="col-sm-12">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Name"
                            value={formData.name}
                            name="name"
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-12">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            value={formData.email}
                            name="email"
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-12">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            value={formData.password}
                            name="password"
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-12">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Confirm Password"
                            value={formData.passwordConf}
                            name="passwordConf"
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-12 text-center">
                        <button className="btn btn-default" disabled={isFormInvalid()}>Sign Up</button>&nbsp;&nbsp;
                        <Link to='/'>Cancel</Link>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SignupForm;
