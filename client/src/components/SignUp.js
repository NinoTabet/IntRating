//LoginSignup
import React, { useState } from 'react';
const apiUrl = process.env.REACT_APP_API_URL;

const SignUp = () => {

    const [email_address, setEmail_address] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = { email_address, username, password };
            const response = await fetch(apiUrl + "/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            }); 

        } catch (err) {
            console.error("Error:", err.message);
            alert('An error occurred while trying to submit your feedback. Please try again.');
        }
    };   

  return (
    <>
        <div className="container mt-lg-5 middle_page w-50">
            <div className='text-center '>
                <h1 className='text-center text-dark'>Signup</h1>
                <p className='mt-5'>Please use a real email address as there is a confirmation code that will be sent!</p>
                <p>Also, include at least one capital letter, one number, and one special character in your password.</p>    
            </div>    
            <div className='text-center container mt-5'>
                <form onSubmit={onSubmitForm}>
                    <div class="form-group mx-auto w-md-100 w-lg-50">
                    <label for="email">Email address</label>
                    <input type="email" class="form-control text-center" id="email" placeholder="Enter your email" value={email_address}
              onChange={(e) => setEmail_address(e.target.value)}/>
                    </div>
                    <div class="form-group mx-auto w-md-100 w-lg-50  mt-3">
                    <label for="username">Username</label>
                    <input type="text" class="form-control text-center" id="username" placeholder="Enter your username" value={username}
              onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                    <div class="form-group mx-auto w-md-100 w-lg-50 mt-3">
                    <label for="password">Password</label>
                    <input type="password" class="form-control text-center" id="password" placeholder="Enter your password" value={password}
              onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <button type="submit" class="btn btn-dark mt-5">Signup</button>
                </form>
            </div>
        </div>
    </>
  );
};

export default SignUp;
