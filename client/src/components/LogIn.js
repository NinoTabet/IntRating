//LogIn.js
import React, { useState } from 'react';
const apiUrl = process.env.REACT_APP_API_URL;

const LogIn = () => {

  const [ email_address, setEmail_address ] = useState("");
  const [ password, setPassword ] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      
      const body = { email_address, password }
      await fetch(apiUrl + "/login", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(body)
    });
    
    } catch (err) {
      console.error(err.message);
    }
  }
  return (
    <>
      <div className="container mt-lg-5 middle_page mx-auto w-50">
        <h1 className='text-center text-dark'>Login</h1>
        <div className='text-center mt-5'>
          <form onSubmit={onSubmitForm}>
            <div className="form-group w-md-100 w-lg-50 mx-auto">
              <label htmlFor="email">Email address</label>
              <input type="email" className="form-control text-center" id="email" placeholder="Enter your email" value={email_address}
              onChange={(e) => setEmail_address(e.target.value)}/>
            </div>
            <div className="form-group w-md-100 w-lg-50 mx-auto mt-3">
              <label htmlFor="password">Password</label>
              <input type="password" className="form-control text-center" id="password" placeholder="Enter your password" value={password}
              onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <button type="submit" className="btn btn-primary mt-5">Login</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LogIn;
