import { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon, Input } from 'semantic-ui-react'
import userService from '../../utilities/users-service';
import './LoginPage.css';

class LoginPage extends Component {

    state = {
        email: '',
        pw: ''
    };

    handleChange = (e) => {
        this.setState({
            // Using ES2015 Computed Property Names
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await userService.login(this.state);
            // Let <App> know a user has signed up!
            this.props.handleSignupOrLogin();
            // Successfully signed up - show 
            this.props.history.push('/');
        } catch (err) {
            // Use a modal or toast in your apps instead of alert
            alert('Invalid Credentials!');
        }
    }

    render() {
        return (
            <div className="LoginPage">
                <header className="header-footer">Log In</header>
                <form className="form-horizontal" onSubmit={this.handleSubmit} >
                    <div className="form-group">
                        <div className="col-sm-12">
                            <Input iconPosition='left' placeholder='Email'>
                                <input type="email" placeholder="Email" value={this.state.email} name="email" onChange={this.handleChange} />
                                <Icon name='at' />
                            </Input>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-12">
                            <Input icon='users' iconPosition='left' placeholder='Password' value={this.state.pw} name="pw" onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-12 text-center">
                            <button className="btn btn-default">Log In</button>&nbsp;&nbsp;&nbsp;
              <Link to='/'>Cancel</Link>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default LoginPage;