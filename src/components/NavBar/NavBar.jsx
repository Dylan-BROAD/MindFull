import { Link } from 'react-router-dom';
import '../../pages/App/App.css'
import './NavBar.css'
import * as userService from '../../utilities/users-service';

const NavBar = (props) => {
  let nav = props.user ?
    <div>
      <Link className='mindfull-nav' to='/journals'>Your Journals</Link>
      <Link to='/' onClick={props.handleLogout} className='NavBar-Link'>LOG OUT</Link>
      &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <span className='NavBar-Welcome'>COME AS YOU ARE, {props.user.name}</span>
    </div>
    :
    <div>
      <Link className='login-nav' to='/login' className='NavBar-link'>LOG IN</Link>
      &nbsp;&nbsp;|&nbsp;&nbsp;
      <Link to='/signup' className='NavBar-Link'>SIGN UP</Link>
    </div>;

    return (
      <>
      <header className='header-footer'>MindFULL</header>
      <div className='NavBar'>
        {nav}
      </div>
      </>
    );
};

export default NavBar;