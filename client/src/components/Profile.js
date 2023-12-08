import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import Review from './Review'; // Assuming the Review component is in the same directory

const apiUrl = process.env.REACT_APP_API_URL;

const Profile = () => {
  const cookies = new Cookies();
  const token = cookies.get('jwt_authorization');

  const [reviewList, setReviewList] = useState([]);
  const [userData, setUserData] = useState(null);
  const [playerNames, setPlayerNames] = useState([]);

  useEffect(() => {
    const fetchDataOnLoad = async () => {
      try {
        const response = await fetch(apiUrl + "/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
          // Check if data.reviewSearch is an array before setting it to reviewList
          if (Array.isArray(data.reviewSearch)) {
            setReviewList(data.reviewSearch);
          }
          // Check if data.playerNames is an array before setting it
          if (Array.isArray(data.playerNames)) {
          setPlayerNames(data.playerNames);
          }
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    fetchDataOnLoad();
  }, [token]);

  return (
<>
  <div className="container w-100vw d-flex align-items-center justify-content-center pt-5" style={{ height: '75vh' }}>
    <div className="w-75 text-center mt-5">
      <h1>{userData ? `${userData.usernameSearch.username}` : 'Loading...'}</h1>
      <h2 className='mt-5'>Your reviews</h2>
      <div className='mt-5 card-container mx-auto' style={{ maxHeight: '500px', overflowY: 'auto' }}>
        {reviewList && reviewList.reverse().map((review) => (
          <div key={review.rating_id} className="mb-3">
            <Review review={review} playerNames={playerNames}/>
          </div>
        ))}
      </div>
    </div>
  </div>
</>

  );
};

export default Profile;
