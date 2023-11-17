import React, { useState, useEffect } from "react";

const apiUrl = process.env.REACT_APP_API_URL;

const DisplayPlayerReviews = ({ username, serverName }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchPlayerReviews = async () => {
      try {
        // Make API call to fetch player reviews
        const response = await fetch(apiUrl + `/api/text_review?original_username=${username}&server_name=${serverName}`);

        if (!response.ok) {
          throw new Error("Failed to fetch player reviews");
        }

        const data = await response.json();
        console.log("Fetched reviews data:", data); // Add this line for debugging
        setReviews(data.reviews);
      } catch (error) {
        console.error("Error fetching player reviews:", error.message);
      }
    };

    // Call the function to fetch reviews
    fetchPlayerReviews();
  }, [username, serverName]);

  console.log("Reviews state:", reviews); // Add this line for debugging

  return (
    <div className="reviews-container">
      <h2>Player Reviews</h2>
      {reviews.map((review) => (
        <div key={review.rating_id} className="review-card">
          <h3>Username: {review.username}</h3>
          <p>Highest Rated Field: {review.highestRatedField}</p>
          <p>Highest Rated Score: {review.highestRatedScore}</p>
          <p>Lowest Rated Field: {review.lowestRatedField}</p>
          <p>Lowest Rated Score: {review.lowestRatedScore}</p>
          <p>Would Play Again: {review.playAgain}</p>
          {review.textReview && <p>Text Review: {review.textReview}</p>}
        </div>
      ))}
    </div>
  );
};

export default DisplayPlayerReviews;
