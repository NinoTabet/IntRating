import React from 'react';
import { Link } from 'react-router-dom';

const LoginSignup = () => {
  return (
    <div className="container mx-auto w-100vw d-flex align-items-center justify-content-center" style={{ height: '75vh' }}>
      <div>
        <h1 className='text-center text-dark'>Signup or Login!</h1>
        <div className='text-center mt-5 justify-content-center d-flex'>
          <Link to="/signup" className="btn btn-lg btn-dark text-light me-3">
            SIGN UP
          </Link>
          <Link to="/login" className="btn btn-lg btn-light text-dark border border-dark">
            LOG IN
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
