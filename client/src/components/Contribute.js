import React, { useState } from 'react';
import ServerListNames from './ServerListNames';
import ContributionStars from './ContributionStars';
import Cookies from 'universal-cookie';

const apiUrl = process.env.REACT_APP_API_URL;


const Contribute = ({ handleSearchSuccess}) => {

    // Get the JWT token from the cookie
    const cookies = new Cookies();
    const token = cookies.get('jwt_authorization');

    // all main input fields for rating
    const [ original_username, setOriginal_username ] = useState("");
    const [ creep_score, setCreep_score ] = useState("");
    const [ map_awareness_score, setMap_awareness_score ] = useState("");
    const [ team_fighting_score, setTeam_fighting_score ] = useState("");
    const [ feeding_score, setFeeding_score ] = useState("");
    const [ toxicity_score, setToxicity_score ] = useState("");
    const [ tilt_score, setTilt_score ] = useState("");
    const [ kindness_score, setKindness_score ] = useState("");
    const [ laning_score, setLaning_score ] = useState("");
    const [ carry_score, setCarry_score ] = useState("");
    const [ shot_calling_score, setShot_calling_score ] = useState("");
    const [ review, setReview ] = useState("");
    const [ play_again, setPlay_again ] = useState('yes');

    // server selector used for locating specified player
    const [ selectedServer, setSelectedServer ] = useState(null);

    // saves player data
    const [playerData, setPlayerData] = useState({});

      
    const onSubmitForm = async e => {
        e.preventDefault();

        const allFieldsFilled = (
            original_username &&
            selectedServer &&
            creep_score !== "" &&
            map_awareness_score !== "" &&
            team_fighting_score !== "" &&
            feeding_score !== "" &&
            toxicity_score !== "" &&
            tilt_score !== "" &&
            kindness_score !== "" &&
            laning_score !== "" &&
            carry_score !== "" &&
            shot_calling_score !== ""
        );
    
        if (!allFieldsFilled) {
            alert("Please fill out all fields before contributing!");
            return;
        }
        try {
            const body = { original_username, server_name: selectedServer,creep_score, map_awareness_score, team_fighting_score, feeding_score, toxicity_score, tilt_score, kindness_score, laning_score, carry_score, shot_calling_score, review,play_again: play_again === 'yes' ? 5 : play_again === 'no' ? 1 : null}
            const post_response = await fetch(apiUrl + "/rating", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
              },
            body: JSON.stringify(body)
        });
            const url = apiUrl + `/search?original_username=${encodeURIComponent(original_username)}&server_name=${encodeURIComponent(selectedServer)}`;
            const get_response = await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        console.log(post_response);
        if (post_response.ok) {
            const data = await get_response.json();
            setPlayerData({ original_username: data.original_username, server_name: selectedServer });
            handleSearchSuccess({ original_username: data.original_username, server_name: selectedServer, playerData: data });
        }else{
            alert("Please log in before attempting to contribute a rating!");
        }
        } catch (err) {
            console.error(err.message);
        }
    };
  
    return (
        <div className="text-center">
        <h1 className="text-center mb-3">CONTRIBUTE RATING</h1>
        <form onSubmit={onSubmitForm}>
            <div className="mt-lg-5">
            <div className="row justify-content-center mb-3">
                <div className="col-md-6">
                <div className="form-group text-center">
                    <ServerListNames
                    selectedServer={selectedServer}
                    setSelectedServer={setSelectedServer}
                    className="form-control text-center"
                   />
                </div>
                </div>
            </div>
            <div className="row justify-content-center mb-3">
                <div className="col-12 col-md-2">
                <div className="form-group text-center">
                    <label className='h4' htmlFor="playerName">Player Name</label>
                    <input
                    type="text"
                    className="form-control text-center"
                    id="playerName"
                    placeholder="Enter a name"
                    value={original_username} onChange={e => setOriginal_username(e.target.value)}
                    />
                </div>
                </div>
            </div>
                {/* this is one line */}
                <div className="row justify-content-center mb-3">
                    <div className="col-12 col-md-2">
                        <div className="form-group text-center">
                            <label className="h4">Cs'ing</label>
                            <ContributionStars value={creep_score} onChange={(value) => setCreep_score(value)} attributeType="csing" />

                        </div>
                        </div>
                        <div className="col-12 col-md-2">
                        <div className="form-group text-center">
                            <label className="h4">Map Awareness</label>
                            <ContributionStars value={map_awareness_score} onChange={(value) => setMap_awareness_score(value)} attributeType="MapAwareness"/>
                        </div>
                        </div>
                        <div className="col-12 col-md-2">
                        <div className="form-group text-center">
                            <label className="h4">Team Fighting</label>
                            <ContributionStars value={team_fighting_score} onChange={(value) => setTeam_fighting_score(value)} attributeType="TeamFighting"/>
                        </div>
                        </div>
                </div>
                {/* this is one line */}
                <div className="row justify-content-center mb-3">
                    <div className="col-12 col-md-2">
                        <div className="form-group text-center">
                            <label className="h4">Intentional Feeding</label>
                            <ContributionStars value={feeding_score} onChange={(value) => setFeeding_score(value)} attributeType="IntentionalFeeding"/>
                        </div>
                        </div>
                        <div className="col-12 col-md-2">
                        <div className="form-group text-center">
                            <label className="h4">Toxicity</label>
                            <ContributionStars value={toxicity_score} onChange={(value) => setToxicity_score(value)} attributeType="Toxicity"/>
                        </div>
                        </div>
                        <div className="col-12 col-md-2">
                        <div className="form-group text-center">
                            <label className="h4">Tiltability</label> 
                            <ContributionStars value={tilt_score} onChange={(value) => setTilt_score(value)} attributeType="Tiltability"/>
                        </div>
                        </div>
                </div>
                {/* this is one line */}
                <div className="row justify-content-center mb-3">
                    <div className="col-12 col-md-2">
                        <div className="form-group text-center">
                            <label className="h4">Kindness</label>
                            <ContributionStars value={kindness_score} onChange={(value) => setKindness_score(value)} attributeType="Kindness"/>
                        </div>
                        </div>
                        <div className="col-12 col-md-2">
                        <div className="form-group text-center">
                            <label className="h4">Laning / Jungling</label>
                            <ContributionStars value={laning_score} onChange={(value) => setLaning_score(value)} attributeType="Laning/Jungling"/>
                        </div>
                        </div>
                        <div className="col-12 col-md-2">
                        <div className="form-group text-center">
                            <label className="h4">Carry-ability</label>
                            <ContributionStars value={carry_score} onChange={(value) => setCarry_score(value)} attributeType="CarryAbility"/>
                        </div>
                        </div>
                {/* this is one line */}
                </div>
                <div className="row justify-content-center mb-3">
                        <div className="col-12 col-md-2">
                        <div className="form-group text-center">
                            <label className="h4">Shot calling</label>
                            <ContributionStars value={shot_calling_score} onChange={(value) => setShot_calling_score(value)} attributeType="ShotCalling"/>
                        </div>
                        </div>
                </div>
                <div className="row justify-content-center mb-3">
                    <div className="col-2">
                        <div className="form-group text-center">
                            <label className="h4 text-nowrap">Play again?</label>
                            <select className="form-control text-center" value={play_again} onChange={(e) => setPlay_again(e.target.value)}>
                                <option value="select" disabled>Select an option</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center mb-3">
                    <div className="col-4">
                        <div className="form-group">
                        <label className="text-center">Write a review</label>
                        <textarea className="form-control text-center" rows="3" placeholder="Enter your review" value={review || ''}onChange={(e) => setReview(e.target.value)}></textarea>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-6 text-center">
                    <button
                        type="submit"
                        className="btn btn-dark text-light btn-lg mt-2"
                    >
                        Contribute rating
                    </button>
                    </div>
                </div>
            </div>
        </form>
        </div>
    );
};

export default Contribute;