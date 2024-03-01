import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { createBrowserHistory } from 'history'; // Import the createBrowserHistory function
import SearchBar from './SearchBar';
import Cookies from 'js-cookie';

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const history = createBrowserHistory(); // Create a history object

  useEffect(() => {
    // Check login status each time location changes and when component mounts
    const checkLoginStatus = () => {
      const jwtToken = Cookies.get('jwt_authorization');
      setIsLoggedIn(jwtToken !== undefined);
    };

    checkLoginStatus();
  }, [location.pathname]); // Re-run effect when location changes

  const handleLogout = () => {
    // Remove JWT token from cookie
    Cookies.remove('jwt_authorization');
    // Update login status
    setIsLoggedIn(false);
    // Redirect user to the homepage
    history.push('/');
  };

  return (
    <nav className="navbar navbar-dark justify-content-between mb-5">
      <div className="container-fluid">
        <button
          className="navbar-toggler collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-collapse collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                to="/"
                className="nav-link px-2 text-light"
                activeClassName="link-secondary"
                exact
              >
                Home
              </NavLink>
            </li>
            {!isLoggedIn && (
              <li className="nav-item">
                <NavLink
                  to="/loginsignup"
                  className="nav-link px-2 text-light"
                  activeClassName="link-secondary"
                >
                  Sign up & Log in 
                </NavLink>
              </li>
            )}
            <li className="nav-item">
              <NavLink
                to="/feedback"
                className="nav-link px-2 text-light"
                activeClassName="link-secondary"
              >
                Feedback
              </NavLink>
            </li>
            {isLoggedIn && (
              <>
                <li className="nav-item">
                  <NavLink
                    to="/contribute"
                    className="nav-link px-2 text-light"
                    activeClassName="link-secondary"
                  >
                    Contribute rating
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/profile"
                    className="nav-link px-2 text-light"
                    activeClassName="link-secondary"
                  >
                    Profile
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/"
                    className="nav-link px-2 text-light"
                    activeClassName="link-secondary"
                    onClick={handleLogout} // Handle logout onClick
                  >
                    LogOut
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
        <div className="ms-auto">
          <SearchBar />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
