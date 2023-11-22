import React, { useState, useEffect } from "react";
import "../DisplayPlayer.css";
import DisplayPlayerReviews from "./DisplayPlayerReviews";

const apiUrl = process.env.REACT_APP_API_URL;

const DisplayPlayer = (props) => {

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

    const { original_username, server_name, tag_line } = props.playerData;

    const [updatedData, setUpdatedData] = useState(null);
    const updateAndFetchData = async () => {
        try {
            // Perform the update (POST request)
            const updateResponse = await fetch(apiUrl + '/api/update-averages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    original_username: original_username,
                    server_name: server_name,
                    tag_line: tag_line,
                }),
            });

            // Check if the update was successful (status code 200)
            if (!updateResponse.ok) {
                throw new Error('Update failed');
            }

            // Fetch the updated data (GET request)
            const fetchDataResponse = await fetch(apiUrl + `/api/collect-averages?original_username=${original_username}&server_name=${server_name}&tag_line=${tag_line}`);

            // Check if fetching the data was successful
            if (!fetchDataResponse.ok) {
                throw new Error('Failed to fetch updated data');
            }

            // Extract the data and update the UI
            const updatedData = await fetchDataResponse.json();
            console.log(updatedData);

            setUpdatedData(updatedData);
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    useEffect(() => {
        updateAndFetchData();
    }, []); 

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
    
  // Render JSX
    return (
        <>
            <div className="text-center pb-5">
                <h1 className="mb-3">{original_username}</h1>
                <h5 className="mb-3">{server_name}</h5>
                <div>
                    <h6>Number of ratings for this player: <span> {updatedData ? `${updatedData.total_number_of_ratings.count}` : 'Loading...'}</span></h6>
                    <p className="mt-3">Last updated: <span>{updatedData ? formatElapsedTime(updatedData.updated_player_averages.last_click_timestamp) : 'Loading...'}</span></p>
                    <div className="text-center">
                        <label className="mb-2">Overall rating: <span>{updatedData ? `${updatedData.updated_player_averages.overall_avg} / 5` : 'Loading...'}</span></label>
                    </div>
                </div>
                <div className="row justify-content-center mt-0 mt-md-5">
                    <div className="col-12 col-md-2 mt-4 mt-md-0">
                        <div className="form-group text-center mt-2 mt-md-1">
                            <label className="mb-2 h5">Cs'ing</label>
                            <p><small className="text-muted">{generateSectionRating(updatedData ? parseFloat(updatedData.updated_player_averages.creep_score_avg) : 0, 'csing').text}</small></p>
                            <p className="h4">{generateSectionRating(updatedData ? parseFloat(updatedData.updated_player_averages.creep_score_avg) : 0, 'csing').stars}</p>
                            <p>{updatedData ? `${updatedData.updated_player_averages.creep_score_avg} / 5` : 'Loading...'}</p>
                        </div>
                    </div>
                    <div className="col-12 col-md-2 mt-4 mt-md-0">
                        <div className="form-group text-center mt-2 mt-md-1">
                            <label className="mb-2 h5">Map Awareness</label>
                            <p><small className="text-muted">{generateSectionRating(updatedData ? parseFloat(updatedData.updated_player_averages.map_awareness_score_avg) : 0, 'MapAwareness').text}</small></p>
                            <p className="h4">{generateSectionRating(updatedData ? parseFloat(updatedData.updated_player_averages.map_awareness_score_avg) : 0, 'MapAwareness').stars}</p>
                            <p>{updatedData ? `${updatedData.updated_player_averages.map_awareness_score_avg} / 5` : 'Loading...'}</p>
                        </div>
                    </div>
                    <div className="col-12 col-md-2 mt-4 mt-md-0">
                        <div className="form-group text-center mt-2 mt-md-1">
                            <label className="mb-2 h5">Team Fighting</label>
                            <p><small className="text-muted">{generateSectionRating(updatedData ? parseFloat(updatedData.updated_player_averages.team_fighting_score_avg) : 0, 'TeamFighting').text}</small></p>
                            <p className="h4">{generateSectionRating(updatedData ? parseFloat(updatedData.updated_player_averages.team_fighting_score_avg) : 0, 'TeamFighting').stars}</p>
                            <p>{updatedData ? `${updatedData.updated_player_averages.team_fighting_score_avg} / 5` : 'Loading...'}</p>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center mt-0 mt-md-5">
                    <div className="col-12 col-md-2 mt-4 mt-md-0">
                        <div className="form-group text-center mt-2 mt-md-1">
                            <label className="mb-2 h5">Intentional Feeding</label>
                            <p><small className="text-muted">{generateSectionRating(updatedData ? parseFloat(updatedData.updated_player_averages.feeding_score_avg) : 0, 'IntentionalFeeding').text}</small></p>
                            <p className="h4">{generateSectionRating(updatedData ? parseFloat(updatedData.updated_player_averages.feeding_score_avg) : 0, 'IntentionalFeeding').stars}</p>
                            <p>{updatedData ? `${updatedData.updated_player_averages.feeding_score_avg} / 5` : 'Loading...'}</p>
                        </div>
                    </div>
                    <div className="col-12 col-md-2 mt-4 mt-md-0">
                        <div className="form-group text-center mt-2 mt-md-1">
                            <label className="mb-2 h5">Toxicity</label>
                            <p><small className="text-muted">{generateSectionRating(updatedData ? parseFloat(updatedData.updated_player_averages.toxicity_score_avg) : 0, 'Toxicity').text}</small></p>
                            <p className="h4">{generateSectionRating(updatedData ? parseFloat(updatedData.updated_player_averages.toxicity_score_avg) : 0, 'Toxicity').stars}</p>
                            <p>{updatedData ? `${updatedData.updated_player_averages.toxicity_score_avg} / 5` : 'Loading...'}</p>
                        </div>
                    </div>
                    <div className="col-12 col-md-2 mt-4 mt-md-0">
                        <div className="form-group text-center mt-2 mt-md-1">
                            <label className="mb-2 h5">Tiltability</label>
                            <p><small className="text-muted">{generateSectionRating(updatedData ? parseFloat(updatedData.updated_player_averages.tilt_score_avg) : 0, 'Tiltability').text}</small></p>
                            <p className="h4">{generateSectionRating(updatedData ? parseFloat(updatedData.updated_player_averages.tilt_score_avg) : 0, 'Tiltability').stars}</p>
                            <p>{updatedData ? `${updatedData.updated_player_averages.tilt_score_avg} / 5` : 'Loading...'}</p>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center mt-0 mt-md-5">
                    <div className="col-12 col-md-2 mt-4 mt-md-0">
                        <div className="form-group text-center mt-2 mt-md-1">
                            <label className="mb-2 h5">Kindness</label>
                            <p><small className="text-muted">{generateSectionRating(updatedData ? parseFloat(updatedData.updated_player_averages.kindness_score_avg) : 0, 'Kindness').text}</small></p>
                            <p className="h4">{generateSectionRating(updatedData ? parseFloat(updatedData.updated_player_averages.kindness_score_avg) : 0, 'Kindness').stars}</p>
                            <p>{updatedData ? `${updatedData.updated_player_averages.kindness_score_avg} / 5` : 'Loading...'}</p>
                        </div>
                    </div>
                    <div className="col-12 col-md-2 mt-4 mt-md-0">
                        <div className="form-group text-center mt-2 mt-md-1">
                            <label className="mb-2 h5">Laning / Jungling</label>
                            <p><small className="text-muted">{generateSectionRating(updatedData ? parseFloat(updatedData.updated_player_averages.laning_score_avg) : 0, 'Laning/Jungling').text}</small></p>
                            <p className="h4">{generateSectionRating(updatedData ? parseFloat(updatedData.updated_player_averages.laning_score_avg) : 0, 'Laning/Jungling').stars}</p>
                            <p>{updatedData ? `${updatedData.updated_player_averages.laning_score_avg} / 5` : 'Loading...'}</p>
                        </div>
                    </div>
                    <div className="col-12 col-md-2 mt-4 mt-md-0">
                        <div className="form-group text-center mt-2 mt-md-1">
                            <label className="mb-2 h5">Carry-ability</label>
                            <p><small className="text-muted">{generateSectionRating(updatedData ? parseFloat(updatedData.updated_player_averages.carry_score_avg) : 0, 'CarryAbility').text}</small></p>
                            <p className="h4">{generateSectionRating(updatedData ? parseFloat(updatedData.updated_player_averages.carry_score_avg) : 0, 'CarryAbility').stars}</p>
                            <p>{updatedData ? `${updatedData.updated_player_averages.carry_score_avg} / 5` : 'Loading...'}</p>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center mt-0 mt-md-5">
                    <div className="col-12 col-md-2 mt-4 mt-md-0">
                        <div className="form-group text-center mt-2 mt-md-1">
                            <label className="mb-2 h5">Shot calling</label>
                            <p><small className="text-muted">{generateSectionRating(updatedData ? parseFloat(updatedData.updated_player_averages.shot_calling_score_avg) : 0, 'ShotCalling').text}</small></p>
                            <p className="h4">{generateSectionRating(updatedData ? parseFloat(updatedData.updated_player_averages.shot_calling_score_avg) : 0, 'ShotCalling').stars}</p>
                            <p>{updatedData ? `${updatedData.updated_player_averages.shot_calling_score_avg} / 5` : 'Loading...'}</p>
                        </div>
                    </div>
                    <div className="col-12 col-md-2 mt-4 mt-md-0">
                        <div className="form-group text-center mt-2 mt-md-1">
                            <label className="mb-2 h5">Play again?</label>
                            <p><small className="text-muted">{generateSectionRating(updatedData ? parseFloat(updatedData.updated_player_averages.play_again_avg) : 0, 'PlayAgain').text}</small></p>
                            <p className="h4">{generateSectionRating(updatedData ? parseFloat(updatedData.updated_player_averages.play_again_avg) : 0, 'PlayAgain').stars}</p>
                            <p>{updatedData ? `${updatedData.updated_player_averages.play_again_avg} / 5` : 'Loading...'}</p>
                        </div>
                    </div>
                </div>
                <div className="text-center mt-4">
                    <div className="border col-9 col-md-5 mx-auto"/>
                </div>
                <DisplayPlayerReviews username={original_username} server_name={server_name} />
            </div>
        </>
    );
}

export default DisplayPlayer;