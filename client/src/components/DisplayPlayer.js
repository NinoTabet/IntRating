import React, { useState, useEffect } from "react";
import "../DisplayPlayer.css"

const apiUrl = process.env.REACT_APP_API_URL;

const DisplayPlayer = (props) => {

    const { original_username, server_name } = props.playerData;

    // State to hold fetched data

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
            }),
        });

        // Check if the update was successful (status code 200)
        if (!updateResponse.ok) {
            throw new Error('Update failed');
        }

        // Fetch the updated data (GET request)
        const fetchDataResponse = await fetch(apiUrl + `/api/collect-averages?original_username=${original_username}&server_name=${server_name}`);

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
    // const formatElapsedTime = (timestamp) => {
    //     if (!timestamp) {
    //     return 'Loading...';
    //     }
    
    //     const elapsedMilliseconds = Date.now() - new Date(timestamp).getTime();
    //     const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
    //     const minutes = Math.floor(elapsedSeconds / 60);
    //     const seconds = elapsedSeconds % 60;
    
    //     const formattedTime = [];
    
    //     if (minutes > 0) {
    //     formattedTime.push(`${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`);
    //     }
    
    //     if (seconds > 0) {
    //     formattedTime.push(`${seconds} ${seconds === 1 ? 'second' : 'seconds'}`);
    //     }
    
    //     return formattedTime.length > 0 ? formattedTime.join(' ') + ' ago' : 'Just now';
    // };

  // Render JSX
    return (
        <>
            <div className="text-center">
                <h1 className="mb-3">{original_username}</h1>
                <h5 className="mb-3">{server_name}</h5>
                <div>
                    <h6>Number of ratings for this player: <span> {updatedData ? `${updatedData.total_number_of_ratings.count}` : 'Loading...'}</span></h6>
                    <button onClick={updateAndFetchData} className="mt-3 btn-pill">
                    Update
                    </button>
                     <p className="mt-3">Last updated: <span>{updatedData ? `${updatedData.updated_player_averages.last_click_timestamp}` : `Loading...`}</span></p> 
                    <div className="text-center">
                        <label className="mb-2">Overall rating: <span>{updatedData ? `${updatedData.updated_player_averages.overall_avg} / 10` : 'Loading...'}</span></label>
                    </div>
                </div>
                <div className="row justify-content-center mb-3 mt-5">
                    <div className="col-2">
                        <div className="form-group text-center">
                            <label className="mb-2">Cs'ing</label>
                            <p>{updatedData ? `${updatedData.updated_player_averages.creep_score_avg} / 10` : 'Loading...'}</p>
                        </div>
                    </div>
                    <div className="col-2">
                        <div className="form-group text-center">
                            <label className="mb-2">Map Awareness</label>
                            <p>{updatedData ? `${updatedData.updated_player_averages.map_awareness_score_avg} / 10` : 'Loading...'}</p>
                        </div>
                    </div>
                    <div className="col-2">
                        <div className="form-group text-center">
                            <label className="mb-2">Team Fighting</label>
                            <p>{updatedData ? `${updatedData.updated_player_averages.team_fighting_score_avg} / 10` : 'Loading...'}</p>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center mb-3 mt-5">
                    <div className="col-2">
                        <div className="form-group text-center">
                            <label className="mb-2">Intentional Feeding</label>
                            <p>{updatedData ? `${updatedData.updated_player_averages.feeding_score_avg} / 10` : 'Loading...'}</p>
                        </div>
                    </div>
                    <div className="col-2">
                        <div className="form-group text-center">
                            <label className="mb-2">Toxicity</label>
                            <p>{updatedData ? `${updatedData.updated_player_averages.toxicity_score_avg} / 10` : 'Loading...'}</p>
                        </div>
                    </div>
                    <div className="col-2">
                        <div className="form-group text-center">
                            <label className="mb-2">Tiltability</label>
                            <p>{updatedData ? `${updatedData.updated_player_averages.tilt_score_avg} / 10` : 'Loading...'}</p>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center mb-3 mt-5">
                    <div className="col-2">
                        <div className="form-group text-center">
                            <label className="mb-2">Kindness</label>
                            <p>{updatedData ? `${updatedData.updated_player_averages.kindness_score_avg} / 10` : 'Loading...'}</p>
                        </div>
                    </div>
                    <div className="col-2">
                        <div className="form-group text-center">
                            <label className="mb-2">Laning / Jungling</label>
                            <p>{updatedData ? `${updatedData.updated_player_averages.laning_score_avg} / 10` : 'Loading...'}</p>
                        </div>
                    </div>
                    <div className="col-2">
                        <div className="form-group text-center">
                            <label className="mb-2">Carry-ability</label>
                            <p>{updatedData ? `${updatedData.updated_player_averages.carry_score_avg} / 10` : 'Loading...'}</p>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center mb-3 mt-5">
                    <div className="col-2">
                        <div className="form-group text-center">
                            <label className="mb-2">Shot calling</label>
                            <p>{updatedData ? `${updatedData.updated_player_averages.shot_calling_score_avg} / 10` : 'Loading...'}</p>
                        </div>
                    </div>
                    <div className="col-2">
                        <div className="form-group text-center">
                            <label className="mb-2">Play again?</label>
                            <p>{updatedData ? `${updatedData.updated_player_averages.play_again_avg} / 10` : 'Loading...'}</p>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center mt-5">
                    <div className="col-5">
                        <div className="form-group overflow-auto review-border">
                            <section className="background-color: #181818; review_section ">
                                <div className="container py-3 px-2">
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DisplayPlayer;