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
                return { stars: '0', text: 'No rating yet Yet' }; ;
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
    const [rankedSQ, setRankedSQ] = useState(null);
    const [rankedFQ, setRankedFQ] = useState(null);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [matchList, setMatchList] = useState(0);

    const [showRankedData, setShowRankedData] = useState(true);
    const [showHistory, setShowHistory] = useState(true);
  
    const handleButtonClick = (isRankedData) => {
      setShowRankedData(isRankedData);
      setShowHistory(isRankedData);
    };

    const updateAndFetchData = async () => {
        try {

            setDataLoaded(false);

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
            if (updateResponse.ok) {
                const fetchDataResponse = await fetch(apiUrl + `/api/collect-averages?puuid=${puuid}`);
                const updatedData = await fetchDataResponse.json();
                setUpdatedData(updatedData);
            }

        } catch (err) {
            console.error('Error:', err);
        }
    };

    const fetchMatchHistoryData = async () => {
        try {
            console.log ("in: " + matchList);
            const fetchProfileData = fetch(apiUrl + `/riot_api/player_profile?puuid=${puuid}&server_name=${server_name}`);
            const fetchMatchHistory = fetch(apiUrl + `/riot_api/match_history?puuid=${puuid}&server_name=${server_name}&matchList=${matchList}`);
            
            // Use Promise.all to make both API calls concurrently
            const [profileDataResponse, matchHistoryResponse] = await Promise.all([fetchProfileData, fetchMatchHistory]);
            
            const rawProfileData = await profileDataResponse.json();
    
            if(!rawProfileData.rankedFQ && !rawProfileData.rankedSQ){
                setPlayerProfileData(rawProfileData);
            }else{
                setPlayerProfileData(rawProfileData.playerProfileData);
            };
    
            setRankedSQ(rawProfileData.rankedSQ || null);
            setRankedFQ(rawProfileData.rankedFQ || null);
    
            const matchHistoryData = await matchHistoryResponse.json();
            setMatchHistory(matchHistoryData);
            
            if (matchList === 0){
                setMatchList(20);
            }
            setDataLoaded(true);
            
        } catch (err) {
            console.error('Error', err);
        }
    }
    
    useEffect(() => {
        updateAndFetchData();
        fetchMatchHistoryData(); // Call fetchMatchHistoryData once on component load
    }, [puuid, server_name]);

    const handleLoadMore = async () => {
        try {
            setDataLoaded(false);
            const newMatchHistoryResponse = await fetch(apiUrl + `/riot_api/match_history?puuid=${puuid}&server_name=${server_name}&matchList=${matchList}`);
            const newMatchHistoryData = await newMatchHistoryResponse.json();
    
            // Update MatchHistory state with the newly fetched matches appended to the existing ones
            setMatchHistory(prevMatchHistory => [...prevMatchHistory, ...newMatchHistoryData]);
    
            // Increment the matchList for the next fetch
            setMatchList(prevMatchList => prevMatchList + 20);
            setDataLoaded(true);
        } catch (error) {
            console.error('Error fetching match history:', error);
        }
    };
    
/*
    const formatElapsedTime = (timestamp) => {
        if (!timestamp) {
            return 'No rating yet';
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
            <div className='d-flex justify-content-between sticky-top'>
                {/* Account Info */}
                <div className='col-3 flex-column d-flex align-items-center justify-content-center '>
                    <div>
                        {playerProfileData && playerProfileData.player_icon && (
                            <img
                            src={`https://ddragon.leagueoflegends.com/cdn/14.1.1/img/profileicon/${playerProfileData.player_icon}.png`}
                            alt='profile image'
                            className='profile-pics border border-dark'
                            />
                        )}
                        <div className='mt-1'>
                            <span className='rounded bg-dark w-25 p-1 text-light'>{playerProfileData ? playerProfileData.player_level : '...'}</span>
                            <h2><span> {`${gameName}`} </span><span className="text-secondary h6">#{`${tagLine}`}</span></h2>
                            <div>Total reviews: <span>{updatedData ? `${updatedData.total_number_of_ratings.count}` : 'No rating yet'}</span></div>
                            <div>Overall rating: <span>{updatedData ? `${updatedData.updated_player_averages.overall_avg} / 5` : 'No rating yet'}</span></div>
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
                <div className="col">
                    <div className='col-8 d-flex align-items-center justify-content-center'>
                        <div className='d-flex justify-content-center'>
                            <div className='me-5'>
                                <div className='h6'>Solo / Duo</div>
                                {rankedSQ ? (
                                    <>
                                        <div className='d-flex justify-content-center'>
                                            <div className='image-container d-flex justify-content-center align-items-center'>
                                                <img src={`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-${rankedSQ.player_Tier_SQ.toLowerCase()}.png`} alt='Solo queue rank'></img>
                                            </div>
                                        </div>                                        
                                        <div>
                                            <div className="text-center">
                                                <div className='h3 mb-0'>{rankedSQ.player_Tier_SQ}
                                                    <span className='ms-2'>{rankedSQ.player_Rank_SQ}</span>
                                                </div>
                                            </div>
                                            <p className='h6 text-secondary'>{rankedSQ.player_LP_SQ}<span> LP</span></p>
                                            <div className='h6'>
                                                <span className='text-primary'>{rankedSQ.player_Ranked_Wins_SQ}</span>
                                                 | 
                                                <span className='text-danger'>{rankedSQ.player_Ranked_Losses_SQ}</span>
                                            </div>
                                            <div className='h6 text-secondary'>{rankedSQ.calculated_Player_WR_SQ}%</div>
                                        </div>
                                    </>
                                ) : (
                                    <div>Unranked</div>
                                )}
                            </div>
                            <div>
                                <div className='h6'>Flex 5v5</div>
                                {rankedFQ ? (
                                    <>
                                        <div className='d-flex justify-content-center'>
                                            <div className='image-container d-flex justify-content-center align-items-center'>
                                                <img src={`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-${rankedFQ.player_Tier_FQ.toLowerCase()}.png`} alt='Flex queue rank'></img>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-center">
                                                <div className='h3 mb-0'>{rankedFQ.player_Tier_FQ}
                                                    <span className='ms-2'>{rankedFQ.player_Rank_FQ}</span>
                                                </div>
                                            </div>
                                            <p className='h6 text-secondary'>{rankedFQ.player_LP_FQ}<span> LP</span></p>
                                            <div className='h6'>
                                                <span className='text-primary'>{rankedFQ.player_Ranked_Wins_FQ}</span>
                                                 | 
                                                <span className='text-danger'>{rankedFQ.player_Ranked_Losses_FQ}</span>
                                            </div>
                                            <div className='h6 text-secondary'>{rankedFQ.calculated_Player_WR_FQ}%</div>
                                        </div>
                                    </>
                                ) : (
                                    <div>Unranked</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                ) : (
                <div className='col'>
                    <div className='p1 col-8'>
                    <div className="row">
                        <div className="col m-1">
                            <div className="fw-bold">Cs'ing</div>
                            <small className="text-muted">{generateSectionRating(updatedData ? parseFloat(updatedData.updated_player_averages.creep_score_avg) : 0, 'csing').text}</small>
                            <div>{generateSectionRating(updatedData ? parseFloat(updatedData.updated_player_averages.creep_score_avg) : 0, 'csing').stars}</div>
                            <div>{updatedData ? `${updatedData.updated_player_averages.creep_score_avg} / 5` : 'No rating yet'}</div>
                        </div>
                        <div className="col m-1">
                            <div className="fw-bold">Map Awareness</div>
                            <small className="text-muted">{generateSectionRating(updatedData ? parseFloat(updatedData.updated_player_averages.map_awareness_score_avg) : 0, 'MapAwareness').text}</small>
                            <div>{generateSectionRating(updatedData ? parseFloat(updatedData.updated_player_averages.map_awareness_score_avg) : 0, 'MapAwareness').stars}</div>
                            <div>{updatedData ? `${updatedData.updated_player_averages.map_awareness_score_avg} / 5` : 'No rating yet'}</div>
                        </div>
                        <div className="col m-1"> 
                            <div className="fw-bold">Team Fighting</div>
                            <small className="text-muted">{generateSectionRating(updatedData ? parseFloat(updatedData.updated_player_averages.team_fighting_score_avg) : 0, 'TeamFighting').text}</small>
                            <div>{generateSectionRating(updatedData ? parseFloat(updatedData.updated_player_averages.team_fighting_score_avg) : 0, 'TeamFighting').stars}</div>
                            <div>{updatedData ? `${updatedData.updated_player_averages.team_fighting_score_avg} / 5` : 'No rating yet'}</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col m-1"> 
                            <div className="fw-bold">Intentional Feeding</div>
                            <small className="text-muted">{generateSectionRating(updatedData ? parseFloat(updatedData.updated_player_averages.feeding_score_avg) : 0, 'IntentionalFeeding').text}</small>
                            <div>{generateSectionRating(updatedData ? parseFloat(updatedData.updated_player_averages.feeding_score_avg) : 0, 'IntentionalFeeding').stars}</div>
                            <div>{updatedData ? `${updatedData.updated_player_averages.feeding_score_avg} / 5` : 'No rating yet'}</div>
                        </div>
                        <div className="col m-1"> 
                            <div className="fw-bold">Toxicity</div>
                            <small className="text-muted">{generateSectionRating(updatedData ? parseFloat(updatedData.updated_player_averages.toxicity_score_avg) : 0, 'Toxicity').text}</small>
                            <div>{generateSectionRating(updatedData ? parseFloat(updatedData.updated_player_averages.toxicity_score_avg) : 0, 'Toxicity').stars}</div>
                            <div>{updatedData ? `${updatedData.updated_player_averages.toxicity_score_avg} / 5` : 'No rating yet'}</div>
                        </div>
                        <div className="col m-1"> 
                            <div className="fw-bold">Tiltability</div>
                            <small className="text-muted">{generateSectionRating(updatedData ? parseFloat(updatedData.updated_player_averages.tilt_score_avg) : 0, 'Tiltability').text}</small>
                            <div>{generateSectionRating(updatedData ? parseFloat(updatedData.updated_player_averages.tilt_score_avg) : 0, 'Tiltability').stars}</div>
                            <div>{updatedData ? `${updatedData.updated_player_averages.tilt_score_avg} / 5` : 'No rating yet'}</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col m-1"> 
                            <div className="fw-bold">Kindness</div>
                            <small className="text-muted">{generateSectionRating(updatedData ? parseFloat(updatedData.updated_player_averages.kindness_score_avg) : 0, 'Kindness').text}</small>
                            <div>{generateSectionRating(updatedData ? parseFloat(updatedData.updated_player_averages.kindness_score_avg) : 0, 'Kindness').stars}</div>
                            <div>{updatedData ? `${updatedData.updated_player_averages.kindness_score_avg} / 5` : 'No rating yet'}</div>
                        </div>
                        <div className="col m-1"> 
                            <div className="fw-bold">Laning / Jungling</div>
                            <small className="text-muted">{generateSectionRating(updatedData ? parseFloat(updatedData.updated_player_averages.laning_score_avg) : 0, 'Laning/Jungling').text}</small>
                            <div>{generateSectionRating(updatedData ? parseFloat(updatedData.updated_player_averages.laning_score_avg) : 0, 'Laning/Jungling').stars}</div>
                            <div>{updatedData ? `${updatedData.updated_player_averages.laning_score_avg} / 5` : 'No rating yet'}</div>
                        </div>
                        <div className="col m-1"> 
                            <div className="fw-bold">Carry-ability</div>
                            <small className="text-muted">{generateSectionRating(updatedData ? parseFloat(updatedData.updated_player_averages.carry_score_avg) : 0, 'CarryAbility').text}</small>
                            <div>{generateSectionRating(updatedData ? parseFloat(updatedData.updated_player_averages.carry_score_avg) : 0, 'CarryAbility').stars}</div>
                            <div>{updatedData ? `${updatedData.updated_player_averages.carry_score_avg} / 5` : 'No rating yet'}</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col m-1"> 
                            <div className="fw-bold">Shot calling</div>
                            <small className="text-muted">{generateSectionRating(updatedData ? parseFloat(updatedData.updated_player_averages.shot_calling_score_avg) : 0, 'ShotCalling').text}</small>
                            <div>{generateSectionRating(updatedData ? parseFloat(updatedData.updated_player_averages.shot_calling_score_avg) : 0, 'ShotCalling').stars}</div>
                            <div>{updatedData ? `${updatedData.updated_player_averages.shot_calling_score_avg} / 5` : 'No rating yet'}</div>
                        </div>
                        <div className="col m-1"> 
                            <div className="fw-bold">Play again?</div>
                            <small className="text-muted">{generateSectionRating(updatedData ? parseFloat(updatedData.updated_player_averages.play_again_avg) : 0, 'PlayAgain').text}</small>
                            <div>{generateSectionRating(updatedData ? parseFloat(updatedData.updated_player_averages.play_again_avg) : 0, 'PlayAgain').stars}</div>
                            <div>{updatedData ? `${updatedData.updated_player_averages.play_again_avg} / 5` : 'No rating yet'}</div>
                        </div>
                    </div>
                </div>
            </div>
                )}
            </div>
            </div>
        </div>
      {showHistory ? (
        <div className='d-flex justify-content-around mt-5'>
            <div className='col-6'>
                {MatchHistory === null && <p className="text-center">Loading match history...</p>}
                {MatchHistory && MatchHistory.length > 0 && (
                MatchHistory.map((match, index) => (
                    <MatchCard key={index} match={match} />
                ))
                )}
                {MatchHistory && MatchHistory.length === 0 && <p>No match history available.</p>}
                {dataLoaded && (
                    <div className="text-center">
                        <button className="btn btn-success" onClick={handleLoadMore}>LOAD MORE</button>
                    </div>
                )}
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