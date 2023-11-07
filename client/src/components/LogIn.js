//LoginSignup
import React, { useState } from 'react';

const LoginSignup = () => {


  return (
    <>
        <div className="container mt-lg-5 middle_page w-50">
        <h1 className='text-center text-dark'>Log In!</h1>
            <div className='text-center'>
                <button
                    type="button"
                    className="btn btn-medz btn-dark text-light mt-5"
                    // onClick={handleContributeClick}
                    >SIGN UP
                </button>
                <button
                    type="button"
                    className="btn btn-med btn-light text-dark border border-dark mt-5 ms-1"
                    // onClick={handleContributeClick}
                    >LOG IN
                </button>
            </div>
        </div>
    </>
  );
};

export default LoginSignup;
