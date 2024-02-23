import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_API_URL;

const LogIn = ({ setCurrentPage }) => {
  const [email_address, setEmail_address] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Use useNavigate hook to access the navigate function

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email_address, password };
      const response = await fetch(apiUrl + '/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (response.ok) {
        const { token } = await response.json();
        Cookies.set('jwt_authorization', token, {
          expires: new Date(token.exp * 1000),
        });
        alert('You are now logged in!');
        navigate('/'); // Redirect to the home page
      } else {
        alert('Login failed. Please try again.');
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="container mx-auto w-100vw d-flex align-items-center justify-content-center" style={{ height: '75vh' }}>
      <div className="w-50">
        <h1 className="text-center text-dark">Login</h1>
        <div className="text-center mt-5">
          <form onSubmit={onSubmitForm}>
            <div className="form-group col-12 col-md-7 mx-auto">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                className="form-control text-center"
                id="email"
                placeholder="Enter your email"
                value={email_address}
                onChange={(e) => setEmail_address(e.target.value)}
              />
            </div>
            <div className="form-group col-12 col-md-7 mx-auto mt-3">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control text-center"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-dark mt-5">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
