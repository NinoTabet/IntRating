import React, { useState } from 'react';
import '../Stars.css';

const ContributionStars = ({ value, onChange, attributeType }) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [clickedRating, setClickedRating] = useState(0);
  const [lastClickedRating, setLastClickedRating] = useState(0);

  const handleMouseOver = (hoveredRating) => {
    setHoveredRating(hoveredRating);
    if (!clickedRating) {
      setRating(hoveredRating);
    }
  };

  const handleMouseLeave = () => {
    setHoveredRating(0);
    if (clickedRating === lastClickedRating) {
      setRating(clickedRating);
    } else {
      setRating(0);
    }
    onChange(rating);
  };

  const handleClick = (clickedRating) => {
    if (clickedRating === lastClickedRating) {
      setClickedRating(0);
      setLastClickedRating(0);
      setRating(0);
    } else {
      setClickedRating(clickedRating);
      setLastClickedRating(clickedRating);
    }
  };

  const getSectionText = (rating) => {
    switch (attributeType) {
        case 'csing':
            return getCsingText(rating);
        case 'MapAwareness':
            return getMapAwarenessText(rating);
        case 'TeamFighting':
            return getTeamFightingText(rating);
        case 'IntentionalFeeding':
            return getIntentionalFeedingText(rating);
        case 'Toxicity':
            return getToxicityText(rating);
        case 'Tiltability':
            return getTiltabilityText(rating);
        case 'Kindness':
            return getKindnessText(rating);
        case 'Laning/Jungling':
            return getLaningJunglingText(rating);
        case 'CarryAbility':
            return getCarryAbilityText(rating);
        case 'ShotCalling':
            return getShotCallingText(rating);
      default:
        return '';
    }
  };

  const getCsingText = (rating) => {
    switch (rating) {
        case 1:
            return 'Awful at cs\'ing';
        case 2:
            return 'Bad at cs\'ing';
        case 3:
            return 'Okay at cs\'ing';
        case 4:
            return 'Great at cs\'ing';
        case 5:
            return 'Excellent at cs\'ing';
        default:
            return '';
    }
  };
  const getMapAwarenessText = (rating) => {
    switch (rating) {
        case 1:
            return 'Awful at map awareness';
        case 2:
            return 'Bad at map awareness';
        case 3:
            return 'Okay at map awareness';
        case 4:
            return 'Great at map awareness';
        case 5:
            return 'Excellent at map awareness';
        default:
            return '';
    }
  };
  const getTeamFightingText = (rating) => {
    switch (rating) {
        case 1:
            return 'Awful at team fighting';
        case 2:
            return 'Bad at team fighting';
        case 3:
            return 'Okay at team fighting';
        case 4:
            return 'Great at team fighting';
        case 5:
            return 'Excellent at team fighting';
        default:
            return '';
    }
  };
  const getIntentionalFeedingText = (rating) => {
    switch (rating) {
        case 1:
            return 'Dirty inter';
        case 2:
            return 'Kind of inted';
        case 3:
            return 'Had a bad game';
        case 4:
            return 'Had a few bad deaths';
        case 5:
            return 'Didn\'t int at all';
        default:
            return '';
    }
  };
  const getToxicityText = (rating) => {
    switch (rating) {
        case 1:
            return 'Extremely toxic';
        case 2:
            return 'Slightly toxic';
        case 3:
            return 'Moderately toxic';
        case 4:
            return 'Not really toxic';
        case 5:
            return 'Not at all toxic';
        default:
            return '';
    }
  };
  const getTiltabilityText = (rating) => {
    switch (rating) {
        case 1:
            return 'Extremely tiltable';
        case 2:
            return 'Slightly tiltable';
        case 3:
            return 'Moderately tiltable';
        case 4:
            return 'Rarely tilts';
        case 5:
            return 'Tiltproof!';
        default:
            return '';
    }
  };
  const getKindnessText = (rating) => {
    switch (rating) {
        case 1:
            return 'Extremely rude';
        case 2:
            return 'Slightly rude';
        case 3:
            return 'Neutral';
        case 4:
            return 'Slightly Kind';
        case 5:
            return 'Very kind';
        default:
            return '';
    }
  };
  const getLaningJunglingText = (rating) => {
    switch (rating) {
        case 1:
            return 'Awful at Laning/Jungling';
        case 2:
            return 'Bad at Laning/Jungling';
        case 3:
            return 'Okay at Laning/Jungling';
        case 4:
            return 'Great at Laning/Jungling';
        case 5:
            return 'Excellent at Laning/Jungling';
        default:
            return '';
    }
  };
  const getCarryAbilityText = (rating) => {
    switch (rating) {
        case 1:
            return 'Awful at carrying';
        case 2:
            return 'Bad at carrying';
        case 3:
            return 'Okay at carrying';
        case 4:
            return 'Great at carrying';
        case 5:
            return 'Excellent at carrying';
        default:
            return '';
    }
  };
  const getShotCallingText = (rating) => {
    switch (rating) {
        case 1:
            return 'Awful at shot calling';
        case 2:
            return 'Bad at shot calling';
        case 3:
            return 'Okay at shot calling';
        case 4:
            return 'Great at shot calling';
        case 5:
            return 'Excellent at shot calling';
        default:
            return '';
    }
  };

  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={`star-${star}-${rating}`}
          className={`star-${star} ${star <= rating ? 'selected' : ''}`}
          onClick={() => handleClick(star)}
          onMouseOver={() => handleMouseOver(star)}
          onMouseLeave={handleMouseLeave}
        >
          {star <= rating ? '★' : '☆'}
        </span>
      ))}
    <div>
        {hoveredRating > 0 && getSectionText(hoveredRating)}
    </div>
    </div>
  );
};

export default ContributionStars;
