import { Link } from 'react-router-dom';

const NavBar = (props) => {
  let nav = props.user ? (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center space-x-4">
        <Link className="text-blue-500 hover:text-blue-700 font-medium" to="/mindfull">
          MindFulls
        </Link>
        <span className="text-gray-700 font-semibold">
          Welcome to your safe space, {props.user.name}
        </span>
      </div>
      <Link
        to="/"
        onClick={props.handleLogout}
        className="text-red-500 hover:text-red-700 font-medium"
      >
        LOG OUT
      </Link>
    </div>
  ) : (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center space-x-4">
        <Link className="text-blue-500 hover:text-blue-700 font-medium" to="/login">
          LOG IN
        </Link>
        <span>|</span>
        <Link className="text-green-500 hover:text-green-700 font-medium" to="/signup">
          SIGN UP
        </Link>
      </div>
    </div>
  );

  return (
    <>
      <header className="bg-gray-800 text-white py-4">
        <div className="container mx-auto">
          <Link to="/" className="text-2xl font-bold">
            MindFull
          </Link>
        </div>
      </header>

      <nav className="bg-gray-100 py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          {nav}
        </div>
      </nav>
    </>
  );
};

export default NavBar;
