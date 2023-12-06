import React, { useState, useEffect } from "react";

const apiUrl = process.env.REACT_APP_API_URL;

const DisplayPlayerReviews = ({ puuid }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchPlayerReviews = async () => {
      try {
        const response = await fetch(apiUrl + `/api/text_review?puuid=${puuid}`);
  
        if (response.ok) {
          const data = await response.json();
          setData(data);
        }
      } catch (error) {
        console.error("Error fetching player reviews:", error.message);
      }
    };
  
    // Call the function to fetch reviews
    fetchPlayerReviews();
  }, [puuid]);  

  const getHighestRatedField = (review) => {
    const fields = [
      'creep_score',
      'map_awareness_score',
      'team_fighting_score',
      'feeding_score',
      'toxicity_score',
      'tilt_score',
      'kindness_score',
      'laning_score',
      'carry_score',
      'shot_calling_score',
    ];
    return fields.reduce((highest, field) => {
      return review[field] > review[highest] ? field : highest;
    }, fields[0]);
  };

  const getLowestRatedField = (review) => {
    const fields = [
      'creep_score',
      'map_awareness_score',
      'team_fighting_score',
      'feeding_score',
      'toxicity_score',
      'tilt_score',
      'kindness_score',
      'laning_score',
      'carry_score',
      'shot_calling_score',
    ];
    return fields.reduce((lowest, field) => {
      return review[field] < review[lowest] ? field : lowest;
    }, fields[0]);
  };

  const calculateOverallRating = (review) => {
    // Replace this with your logic for calculating overall rating
    const fields = [
      'creep_score',
      'map_awareness_score',
      'team_fighting_score',
      'feeding_score',
      'toxicity_score',
      'tilt_score',
      'kindness_score',
      'laning_score',
      'carry_score',
      'shot_calling_score',
    ];

    const totalScore = fields.reduce((sum, field) => sum + review[field], 0);
    const overallRating = totalScore / fields.length;

    return overallRating.toFixed(2);
  };

  const calculateAverageScore = (review) => {
    // Replace this with your logic for calculating average score
    const fields = [
      'creep_score',
      'map_awareness_score',
      'team_fighting_score',
      'feeding_score',
      'toxicity_score',
      'tilt_score',
      'kindness_score',
      'laning_score',
      'carry_score',
      'shot_calling_score',
    ];

    const totalScore = fields.reduce((sum, field) => sum + review[field], 0);
    const averageScore = totalScore / fields.length;

    return averageScore.toFixed(2);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-5 text-center">Player Reviews</h2>
      <div className="row justify-content-center">
        {data && data.reviews && data.reviews.length > 0 ? (
          <div className="col-md-5 border rounded px-3 pt-1">
            <div className="reviews-container" style={{ maxHeight: '500px', overflowY: 'auto' }} >
              {data.reviews.map((review, index) => (
                <div key={index} className="card-container w-100 mb-3">
                  <div className="card mx-auto">
                    <div className="card-body" style={{ textAlign: 'left' }}>
                      <p className="card-title"><span className="fw-bold">Review by: </span>{data.usernames[index]}</p>
                      <p className="mt-3"><span className="fw-bold">Overall Rating: </span>{calculateAverageScore(review)}</p>
                      <p><span className="fw-bold">Highest Rated Field: </span>{getHighestRatedField(review)} - {review[getHighestRatedField(review)]}</p>
                      <p><span className="fw-bold">Lowest Rated Field: </span>{getLowestRatedField(review)} - {review[getLowestRatedField(review)]}</p>
                      <p><span className="fw-bold">Would Play Again: </span>{review.play_again}</p>
                      {review.review && <p className="card-text"><span className="fw-bold">Review: </span>{review.review}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-center">No reviews available</p>
        )}
      </div>
    </div>
  );
  
    
};

export default DisplayPlayerReviews;
