import { useState } from 'react';
import SignupForm from '../../components/SignUpForm/SignUpForm'

const SignupPage = (props) => {
    const [message, setMessage] = useState('');

    const updateMessage = (msg) => {
        setMessage(msg);
    };

    return (
        <div className='SignupPage'>
            <SignupForm {...props} updateMessage={updateMessage} />
            <p>{message}</p>
        </div>
    );
}

export default SignupPage;