import React from 'react';
import userService from '../../utilities/users-service';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import MindfullPage from '../MindfullPage/MindfullPage';
import EditPage from '../EditPage/EditPage';

class App extends React.Component {
  state = {
    user: null
  };

  handleSignupOrLogin = () => {
    this.setState({
      user: userService.getUser()
    });
  }

  handleLogout = () => {
    userService.logout();
    this.setState({ user: null });
  }

  render() {
    return (
      <div>
        <Routes>
          <Route path="/" element={<HomePage user={this.state.user} handleLogout={this.handleLogout} />} />
          <Route path="/signup" element={<SignupPage handleSignupOrLogin={this.handleSignupOrLogin} />} />
          <Route path="/login" element={<LoginPage handleSignupOrLogin={this.handleSignupOrLogin} />} />
          <Route path="/Mindfull" element={<MindfullPage user={this.state.user} handleLogout={this.handleLogout} />} />
          <Route path="/edit" element={<EditPage location={window.location} user={this.state.user} handleLogout={this.handleLogout} />} />
        </Routes>
      </div>
    );
  }
}

export default App;
