import React from "react";

const Review = ({ review }) => {
  const getHighestRatedField = () => {
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
    const highestField = fields.reduce((highest, field) => {
      return review[field] > review[highest] ? field : highest;
    }, fields[0]);

    return highestField;
  };

  const getLowestRatedField = () => {
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
    const lowestField = fields.reduce((lowest, field) => {
      return review[field] < review[lowest] ? field : lowest;
    }, fields[0]);

    return lowestField;
  };

  const calculateOverallRating = () => {
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

  const highestRatedField = getHighestRatedField();
  const lowestRatedField = getLowestRatedField();
  const overallRating = calculateOverallRating();

  // Convert the play_again rating to "Yes" or "No"
  const playAgainText = review.play_again === 5 ? 'Yes' : 'No';

  return (
    <div className="card">
      <div className="card-body" style={{ textAlign: 'left' }}>
        <p className="card-title"><span className="fw-bold"></span>{review.reviewed_username}</p>
        <p className="card-text"><span className="fw-bold">Overall Rating: </span>{overallRating}</p>
        <p className="card-text"><span className="fw-bold">Highest Rated Field: </span>{highestRatedField}: {review[highestRatedField]}</p>
        <p className="card-text"><span className="fw-bold">Lowest Rated Field: </span>{lowestRatedField}: {review[lowestRatedField]}</p>
        <p className="card-text"><span className="fw-bold">Play Again: </span>{playAgainText}</p>
        {review.review && <p className="card-text"><span className="fw-bold">Review: </span>{review.review}</p>}
        {/* <p className="card-text">Date: {new Date(review.date).toLocaleDateString()}</p> */}
      </div>
    </div>
  );    
};

export default Review;