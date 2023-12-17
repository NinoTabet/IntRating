import React, { useState, useEffect } from "react";
import "../DisplayPlayer.css";
import DisplayPlayerReviews from "./DisplayPlayerReviews";
import MatchCard from "./MatchCard";

const apiUrl = process.env.REACT_APP_API_URL;

const DisplayPlayer = ({playerData}) => {

    const generateSectionRating = (score, attributeType) => {
        if(attributeType === 'csing') {
            return generateCsingRating(score);
        }else if(attributeType === 'MapAwareness'){
            return generateMapAwarenessRating(score);
        }else if(attributeType === 'TeamFighting'){
            return generateTeamFightingRating(score);
        }else if(attributeType === 'IntentionalFeeding'){
            return generateIntentionalFeedingRating(score);
        }else if(attributeType === 'Toxicity'){
            return generateToxicityRating(score);
        }else if(attributeType === 'Tiltability'){
            return generateTiltabilityRating(score);
        }else if(attributeType === 'Kindness'){
            return generateKindnessRating(score);
        }else if(attributeType === 'Laning/Jungling'){
            return generateLaningJunglingRating(score);
        }else if(attributeType === 'CarryAbility'){
            return generateCarryAbilityRating(score);
        }else if(attributeType === 'ShotCalling'){
            return generateShotCallingRating(score);
        }else if(attributeType === 'PlayAgain'){
            return generatePlayAgainRating(score);
        }else{
                return { stars: '0', text: 'No Rating Yet' }; ;
        }
    };
    const generateCsingRating = (score) => {
                    if (score>=1 && score< 2){
                return { stars: '★☆☆☆☆', text: 'Awful at cs\'ing' };
                    }else if (score>=2 && score< 3){
                return { stars: '★★☆☆☆', text: 'Bad at cs\'ing' };
                    }else if (score>=3 && score< 4){
                return { stars: '★★★☆☆', text: 'Okay at cs\'ing' };
                    }else if (score>=4 && score< 5){
                return { stars: '★★★★☆', text: 'Great at cs\'ing' };
                    }else if ( score === 5){
                return { stars: '★★★★★', text: 'Excellent at cs\'ing' };
           }else{
                return { stars: '', text: ' ' };
        }
    };
    const generateMapAwarenessRating = (score) => {
                if (score>=1 && score< 2){
            return { stars: '★☆☆☆☆', text: 'Awful at map awareness' };
                }else if (score>=2 && score< 3){
            return { stars: '★★☆☆☆', text: 'Bad at map awareness' };
                }else if (score>=3 && score< 4){
            return { stars: '★★★☆☆', text: 'Okay at map awareness' };
                }else if (score>=4 && score< 5){
            return { stars: '★★★★☆', text: 'Great at map awareness' };
                }else if ( score === 5){
            return { stars: '★★★★★', text: 'Excellent at map awareness' };
        }else{
            return { stars: ' ', text: ' ' };
    }
    };
    const generateTeamFightingRating = (score) => {
                if (score>=1 && score< 2){
            return { stars: '★☆☆☆☆', text: 'Awful at team fighting' };
                }else if (score>=2 && score< 3){
            return { stars: '★★☆☆☆', text: 'Bad at team fighting' };
                }else if (score>=3 && score< 4){
            return { stars: '★★★☆☆', text: 'Okay at team fighting' };
                }else if (score>=4 && score< 5){
            return { stars: '★★★★☆', text: 'Great at team fighting' };
                }else if ( score === 5){
            return { stars: '★★★★★', text: 'Excellent at team fighting' };
        }else{
            return { stars: ' ', text: ' ' };
    }
    };
    const generateIntentionalFeedingRating = (score) => {
                if (score>=1 && score< 2){
            return { stars: '★☆☆☆☆', text: 'Dirty inter' };
                }else if (score>=2 && score< 3){
            return { stars: '★★☆☆☆', text: 'Kind of inted' };
                }else if (score>=3 && score< 4){
            return { stars: '★★★☆☆', text: 'Had a bad game' };
                }else if (score>=4 && score< 5){
            return { stars: '★★★★☆', text: 'Had a few bad deaths' };
                }else if ( score === 5){
            return { stars: '★★★★★', text: 'Didn\'t int at all' };
        }else{
            return { stars: ' ', text: ' ' };
    }
    };
    const generateToxicityRating = (score) => {
                if (score>=1 && score< 2){
            return { stars: '★☆☆☆☆', text: 'Extremely toxic' };
                }else if (score>=2 && score< 3){
            return { stars: '★★☆☆☆', text: 'Slightly toxic' };
                }else if (score>=3 && score< 4){
            return { stars: '★★★☆☆', text: 'Moderately toxic' };
                }else if (score>=4 && score< 5){
            return { stars: '★★★★☆', text: 'Not really toxic' };
                }else if ( score === 5){
            return { stars: '★★★★★', text: 'Not at all toxic' };
        }else{
            return { stars: ' ', text: ' ' };
    }
    };
    const generateTiltabilityRating = (score) => {
                if (score>=1 && score< 2){
            return { stars: '★☆☆☆☆', text: 'Extremely tiltable' };
                }else if (score>=2 && score< 3){
            return { stars: '★★☆☆☆', text: 'Slightly tiltable' };
                }else if (score>=3 && score< 4){
            return { stars: '★★★☆☆', text: 'Moderately tiltable' };
                }else if (score>=4 && score< 5){
            return { stars: '★★★★☆', text: 'Rarely tilts' };
                }else if ( score === 5){
            return { stars: '★★★★★', text: 'Tiltproof!' };
        }else{
            return { stars: ' ', text: ' ' };
    }
    };
    const generateKindnessRating = (score) => {
                if (score>=1 && score< 2){
            return { stars: '★☆☆☆☆', text: 'Extremely rude' };
                }else if (score>=2 && score< 3){
            return { stars: '★★☆☆☆', text: 'Slightly rude' };
                }else if (score>=3 && score< 4){
            return { stars: '★★★☆☆', text: 'Neutral' };
                }else if (score>=4 && score< 5){
            return { stars: '★★★★☆', text: 'Slightly Kind' };
                }else if ( score === 5){
            return { stars: '★★★★★', text: 'Very kind' };
        }else{
            return { stars: ' ', text: ' ' };
    }
    };
    const generateLaningJunglingRating = (score) => {
        if (score>=1 && score< 2){
            return { stars: '★☆☆☆☆', text: 'Awful at Laning/Jungling' };
        }else if (score>=2 && score< 3){
            return { stars: '★★☆☆☆', text: 'Bad at Laning/Jungling' };
        }else if (score>=3 && score< 4){
            return { stars: '★★★☆☆', text: 'Okay at Laning/Jungling' };
        }else if (score>=4 && score< 5){
            return { stars: '★★★★☆', text: 'Great at Laning/Jungling' };
        }else if ( score === 5){
            return { stars: '★★★★★', text: 'Excellent at Laning/Jungling' };
        }else{
            return { stars: ' ', text: ' ' };
        }
    };
    const generateCarryAbilityRating = (score) => {
                if (score>=1 && score< 2){
            return { stars: '★☆☆☆☆', text: 'Awful at carrying' };
                }else if (score>=2 && score< 3){
            return { stars: '★★☆☆☆', text: 'Bad at carrying' };
                }else if (score>=3 && score< 4){
            return { stars: '★★★☆☆', text: 'Okay at carrying' };
                }else if (score>=4 && score< 5){
            return { stars: '★★★★☆', text: 'Great at carrying' };
                }else if ( score === 5){
            return { stars: '★★★★★', text: 'Excellent at carrying' };
        }else{
            return { stars: ' ', text: ' ' };
    }
    };
    const generateShotCallingRating = (score) => {
                if (score>=1 && score< 2){
            return { stars: '★☆☆☆☆', text: 'Awful at shot calling' };
                }else if (score>=2 && score< 3){
            return { stars: '★★☆☆☆', text: 'Bad at shot calling' };
                }else if (score>=3 && score< 4){
            return { stars: '★★★☆☆', text: 'Okay at shot calling' };
                }else if (score>=4 && score< 5){
            return { stars: '★★★★☆', text: 'Great at shot calling' };
                }else if ( score === 5){
            return { stars: '★★★★★', text: 'Excellent at shot calling' };
        }else{
            return { stars: ' ', text: ' ' };
    }
    };
    const generatePlayAgainRating = (score) => {
        if (score>=1 && score< 2){
    return { stars: '★☆☆☆☆', text: 'On my block list!' };
        }else if (score>=2 && score< 3){
    return { stars: '★★☆☆☆', text: 'Wouldn\'t willingly play with them again' };
        }else if (score>=3 && score< 4){
    return { stars: '★★★☆☆', text: 'Would\'t care if I got them in a game' };
        }else if (score>=4 && score< 5){
    return { stars: '★★★★☆', text: 'Would like to play with them again' };
        }else if ( score === 5){
    return { stars: '★★★★★', text: 'Please accept my friend request!' };
    }else{
    return { stars: ' ', text: ' ' };
    }
};
    const { puuid, gameName, tagLine, server_name } = playerData;

    const [updatedData, setUpdatedData] = useState(null);
    const [MatchHistory, setMatchHistory] = useState(null);
    const [playerProfileData, setPlayerProfileData] = useState(null);

    const [showRankedData, setShowRankedData] = useState(true);
    const [showHistory, setShowHistory] = useState(true);
  
    const handleButtonClick = (isRankedData) => {
      setShowRankedData(isRankedData);
      setShowHistory(isRankedData);
    };

    const updateAndFetchData = async () => {
        try {

            // Perform the update (POST request)
            const updateResponse = await fetch(apiUrl + '/api/update-averages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    puuid: puuid,
                }),
            });

            // Check if the update was successful (status code 200)
            if (!updateResponse.ok) {
                throw new Error('Update failed');
            }

            // Fetch the updated data (GET request)
            const fetchDataResponse = await fetch(apiUrl + `/api/collect-averages?puuid=${puuid}`);

            // Check if fetching the data was successful
            if (!fetchDataResponse.ok) {
                throw new Error('Failed to fetch updated data');
            }

            // Extract the data and update the UI
            const updatedData = await fetchDataResponse.json();

            setUpdatedData(updatedData);

            const riotApiProfileData = await fetch(apiUrl + `/riot_api/player_profile?puuid=${puuid}&server_name=${server_name}`);
            const rawProfileData = await riotApiProfileData.json();
            setPlayerProfileData(rawProfileData);

            const riotApiMatchHistory = await fetch(apiUrl + `/riot_api/match_history?puuid=${puuid}&server_name=${server_name}`);
            const matchHistoryData = await riotApiMatchHistory.json();
            setMatchHistory(matchHistoryData);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        updateAndFetchData();
    }, [puuid, server_name]); 
/*
    const formatElapsedTime = (timestamp) => {
        if (!timestamp) {
            return 'Loading...';
        }
    
        const parsedTimestamp = new Date(timestamp.replace(' ', 'T'));
        const elapsedMilliseconds = Date.now() - parsedTimestamp.getTime();
        const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000000);
        const minutes = Math.floor(elapsedSeconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
    
        if (minutes < 1) {
            return 'Just now';
        } else if (minutes < 60) {
            return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
        } else if (hours < 24) {
            return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
        } else {
            return `${days} ${days === 1 ? 'day' : 'days'} ago`;
        }
    };   
*/    
  // Render JSX
    return (
    <>
        <div className='text-center'>
            <div className='d-flex flex-column'>
            <div className='d-flex justify-content-around sticky-top'>
                {/* Account Info */}
                <div className='col-3 flex-column d-flex align-items-center justify-content-center '>
                <div>
                    <img
                    src='https://opgg-static.akamaized.net/meta/images/profile_icons/profileIcon5057.jpg?image=q_auto,f_webp,w_auto&amp;v=1700641403304'
                    alt='profile image'
                    className='profile-pics border border-dark'
                    />
                    <div className='mt-1'>
                        <span className='rounded bg-dark w-25 p-1 text-light'>{playerProfileData ? playerProfileData.player_level : '...'}</span>
                        <h2><span> {`${gameName}`} </span><span className="text-secondary h6">#{`${tagLine}`}</span></h2>
                        <div>Total reviews: <span>{updatedData ? `${updatedData.total_number_of_ratings.count}` : 'Loading...'}</span></div>
                        <div>Overall rating: <span>{updatedData ? `${updatedData.updated_player_averages.overall_avg} / 5` : 'Loading...'}</span></div>
                    </div>
                </div>
                <div className='row'>
                    <div className='d-flex mt-2'>
                        <button onClick={() => handleButtonClick(true)} className={`btn btn-light btn-med flex-grow-1 me-1 ${showRankedData ? 'active' : ''}`}>Match History</button>
                        <button onClick={() => handleButtonClick(false)} className={`btn btn-dark border border-dark btn-med flex-grow-1 ${!showRankedData ? 'active' : ''}`}>Reviews</button>
                    </div>
                </div>
                </div>
                {showRankedData ? (
                <div className='border border-primary d-flex col align-items-center justify-content-center'>
                <div className='d-flex justify-content-center'>
                    <div className='me-5'>
                    <div className='h6'>Solo / Duo</div>
                    <img src='https://opgg-static.akamaized.net/meta/images/profile_icons/profileIcon5057.jpg?image=q_auto,f_webp,w_auto&amp;v=1700641403304' alt='profile image ' className='profile-pics border border-dark'></img>
                    <div>
                        <div className='border'>
                            <div className='h3 mb-0'>{playerProfileData ? playerProfileData.player_Tier : '...'}
                                <span className='ms-2 me-2'>{playerProfileData ? playerProfileData.player_Rank : '...'}</span>
                            </div>
                        </div>
                        <p className='h6 text-secondary'>{playerProfileData ? playerProfileData.player_LP : '...'}<span> LP</span></p>
                        <div className='h6'><span className='text-primary'>{playerProfileData ? playerProfileData.player_Ranked_Wins : '...'}</span> | <span className='text-danger'>{playerProfileData ? playerProfileData.player_Ranked_Losses : '...'}</span></div>
                        <div className='h6 text-secondary'>{playerProfileData ? playerProfileData.calculated_Player_WR+'%': '...'}</div>
                    </div>
                    </div>
                    <div>
                    <div className='h6'>Flex 5v5</div>
                    <img src='https://opgg-static.akamaized.net/meta/images/profile_icons/profileIcon5057.jpg?image=q_auto,f_webp,w_auto&amp;v=1700641403304' alt='profile image ' className='profile-pics border border-dark'></img>
                    <div>
                        <div className='border'><div className='h3 mb-0'>Platinum<span className='ms-2 me-2'>II</span></div></div>
                        <p className='h6 text-secondary'>69 LP</p>
                        <div className='h6'><span className='text-primary'>200</span> | <span className='text-danger'>100</span></div>
                        <div className='h6 text-secondary'>60% WR</div>
                    </div>
                    </div>
                </div>
                </div>
                ) : (
                <div className='col d-flex'>
                    <div className='p1 col'>
                    <div className="row">
                        <div className="col m-1">
                                <div className="mb-1">Cs'ing</div>
                                <div><small className="text-muted">{generateSectionRating(updatedData ? parseFloat(updatedData.updated_player_averages.creep_score_avg) : 0, 'csing').text}</small></div>
                                <div>{generateSectionRating(updatedData ? parseFloat(updatedData.updated_player_averages.creep_score_avg) : 0, 'csing').stars}</div>
                                <div>{updatedData ? `${updatedData.updated_player_averages.creep_score_avg} / 5` : 'Loading...'}</div>
                        </div>
                        <div className="col m-1">
                                <div>Map Awareness</div>
                                <div><small className="text-muted">{generateSectionRating(updatedData ? parseFloat(updatedData.updated_player_averages.map_awareness_score_avg) : 0, 'MapAwareness').text}</small></div>
                                <div>{generateSectionRating(updatedData ? parseFloat(updatedData.updated_player_averages.map_awareness_score_avg) : 0, 'MapAwareness').stars}</div>
                                <div>{updatedData ? `${updatedData.updated_player_averages.map_awareness_score_avg} / 5` : 'Loading...'}</div>
                        </div>
                        <div className="col m-1"> 
                                <div className="mb-1">Team Fighting</div>
                                <div><small className="text-muted">{generateSectionRating(updatedData ? parseFloat(updatedData.updated_player_averages.team_fighting_score_avg) : 0, 'TeamFighting').text}</small></div>
                                <div>{generateSectionRating(updatedData ? parseFloat(updatedData.updated_player_averages.team_fighting_score_avg) : 0, 'TeamFighting').stars}</div>
                                <div>{updatedData ? `${updatedData.updated_player_averages.team_fighting_score_avg} / 5` : 'Loading...'}</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col m-1"> 
                                <div className="mb-1">Intentional Feeding</div>
                                <div><small className="text-muted">{generateSectionRating(updatedData ? parseFloat(updatedData.updated_player_averages.feeding_score_avg) : 0, 'IntentionalFeeding').text}</small></div>
                                <div>{generateSectionRating(updatedData ? parseFloat(updatedData.updated_player_averages.feeding_score_avg) : 0, 'IntentionalFeeding').stars}</div>
                                <div>{updatedData ? `${updatedData.updated_player_averages.feeding_score_avg} / 5` : 'Loading...'}</div>
                        </div>
                        <div className="col m-1"> 
                                <div className="mb-1">Toxicity</div>
                                <div><small className="text-muted">{generateSectionRating(updatedData ? parseFloat(updatedData.updated_player_averages.toxicity_score_avg) : 0, 'Toxicity').text}</small></div>
                                <div>{generateSectionRating(updatedData ? parseFloat(updatedData.updated_player_averages.toxicity_score_avg) : 0, 'Toxicity').stars}</div>
                                <div>{updatedData ? `${updatedData.updated_player_averages.toxicity_score_avg} / 5` : 'Loading...'}</div>
                        </div>
                        <div className="col m-1"> 
                                <div className="mb-1">Tiltability</div>
                                <div><small className="text-muted">{generateSectionRating(updatedData ? parseFloat(updatedData.updated_player_averages.tilt_score_avg) : 0, 'Tiltability').text}</small></div>
                                <div>{generateSectionRating(updatedData ? parseFloat(updatedData.updated_player_averages.tilt_score_avg) : 0, 'Tiltability').stars}</div>
                                <div>{updatedData ? `${updatedData.updated_player_averages.tilt_score_avg} / 5` : 'Loading...'}</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col m-1"> 
                                <div className="mb-2">Kindness</div>
                                <div><small className="text-muted">{generateSectionRating(updatedData ? parseFloat(updatedData.updated_player_averages.kindness_score_avg) : 0, 'Kindness').text}</small></div>
                                <div>{generateSectionRating(updatedData ? parseFloat(updatedData.updated_player_averages.kindness_score_avg) : 0, 'Kindness').stars}</div>
                                <div>{updatedData ? `${updatedData.updated_player_averages.kindness_score_avg} / 5` : 'Loading...'}</div>
                        </div>
                        <div className="col m-1"> 
                                <div className="mb-2">Laning / Jungling</div>
                                <div><small className="text-muted">{generateSectionRating(updatedData ? parseFloat(updatedData.updated_player_averages.laning_score_avg) : 0, 'Laning/Jungling').text}</small></div>
                                <div>{generateSectionRating(updatedData ? parseFloat(updatedData.updated_player_averages.laning_score_avg) : 0, 'Laning/Jungling').stars}</div>
                                <div>{updatedData ? `${updatedData.updated_player_averages.laning_score_avg} / 5` : 'Loading...'}</div>
                        </div>
                        <div className="col m-1"> 
                                <div className="mb-2">Carry-ability</div>
                                <div><small className="text-muted">{generateSectionRating(updatedData ? parseFloat(updatedData.updated_player_averages.carry_score_avg) : 0, 'CarryAbility').text}</small></div>
                                <div>{generateSectionRating(updatedData ? parseFloat(updatedData.updated_player_averages.carry_score_avg) : 0, 'CarryAbility').stars}</div>
                                <div>{updatedData ? `${updatedData.updated_player_averages.carry_score_avg} / 5` : 'Loading...'}</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col m-1"> 
                                <div className="mb-2">Shot calling</div>
                                <div><small className="text-muted">{generateSectionRating(updatedData ? parseFloat(updatedData.updated_player_averages.shot_calling_score_avg) : 0, 'ShotCalling').text}</small></div>
                                <div>{generateSectionRating(updatedData ? parseFloat(updatedData.updated_player_averages.shot_calling_score_avg) : 0, 'ShotCalling').stars}</div>
                                <div>{updatedData ? `${updatedData.updated_player_averages.shot_calling_score_avg} / 5` : 'Loading...'}</div>
                        </div>
                        <div className="col m-1"> 
                                <div className="mb-2">Play again?</div>
                                <div><small className="text-muted">{generateSectionRating(updatedData ? parseFloat(updatedData.updated_player_averages.play_again_avg) : 0, 'PlayAgain').text}</small></div>
                                <div>{generateSectionRating(updatedData ? parseFloat(updatedData.updated_player_averages.play_again_avg) : 0, 'PlayAgain').stars}</div>
                                <div>{updatedData ? `${updatedData.updated_player_averages.play_again_avg} / 5` : 'Loading...'}</div>
                        </div>
                    </div>
                    <div className="text-center mt-4">
                        <div className="border col-9 col-md-5 mx-auto"/></div>
                    </div>
                </div>
                )}
            </div>
            </div>
        </div>
      {showHistory ? (
      <div className='d-flex justify-content-around mt-5'>
        <div className='col-6'>
          <MatchCard/>
        </div>
      </div>
      ):(
      <div className='d-flex justify-content-around mt-5'>
        <div className='col-6 border rounded border-dark'>
          <DisplayPlayerReviews puuid={puuid}/>
        </div>
      </div>
      )}
    </>
    );
}

export default DisplayPlayer;