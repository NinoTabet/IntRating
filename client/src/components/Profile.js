// profile.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthProvider';

const apiUrl = process.env.REACT_APP_API_URL;

const Profile = () =>{
    const { user, logout } = useAuth();
    const { token } = useAuth();
    const [reviewList, setReviewList] = useState([]);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchDataOnLoad = async () => {
          try {
            const response = await fetch(apiUrl + "/profile", {
              method: "GET",
              headers: { "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
            });
            if (response.ok) {
              const data = await response.json();
              setUserData(data);
            }
          } catch (error) {
            console.error('Error:', error.message);
          }
        };
    
        fetchDataOnLoad();
      }, []);

  return (
    <>
        <h1>{userData ? `${userData.usernameSearch.username}` : 'Loading...'}</h1>
        <h2>Your reviews</h2>
        <div>
        <button className="dropdown"></button>
        <ul>
            <li>
                here is where I wold put all the reviews.
            </li>
        </ul>
        </div>
        <button onClick={logout}>Logout</button>
    </>
  );
};

export default Profile;
