//LoginSignup
import React, { useState } from 'react';
const apiUrl = process.env.REACT_APP_API_URL;

const SignUp = ({ setCurrentPage }) => {

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

          if (!response.ok) {
              const errorData = await response.json();
              alert(errorData.error); // Show the error message in an alert
              return;
          } else {
              alert("Yay! You've signed up. Time to log in!");
              setCurrentPage("login");
          }
          // Handle success, e.g., redirect or show a success message
      } catch (err) {
          console.error("Error:", err.message);
          alert(err);
      }
  };
    const handleNavigation = (page) => {
        console.log('Changing page to', page);
        try {
            setCurrentPage(page);   
        } catch (err) {
            console.error('Failed to load page: ' + err.message)
        }
    }

  return (
    <>
        <div className="container mx-auto w-100vw d-flex align-items-center justify-content-center" style={{ height: '75vh' }}>
        <div className="w-50">
            <div className='text-center '>
                <h1 className='text-center text-dark'>Signup</h1>
                <p className='mt-5'>Please include at least one capital letter, one number, and one special character in your password!</p> 
            </div>    
            <div className='text-center container mt-5'>
                <form onSubmit={onSubmitForm} className='mb-3'>
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
                <small>Please note that by signing up to IntRating.net you agree to our 
                    <span><a href="#" onClick={() => handleNavigation('terms')} > Terms of Service </a></span>
                     and 
                    <span><a href="#" onClick={() => handleNavigation('privacy')}> Privacy Policy</a></span>
                    .
                </small>
            </div>
            </div>
        </div>
    </>
  );
};

export default SignUp;
