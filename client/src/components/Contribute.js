import React, { useState } from 'react';
import ServerListNames from './ServerListNames';

const apiUrl = process.env.REACT_APP_API_URL;


const Contribute = ({handleSearchSuccess}) => {

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
            const body = { original_username, server_name: selectedServer,creep_score, map_awareness_score, team_fighting_score, feeding_score, toxicity_score, tilt_score, kindness_score, laning_score, carry_score, shot_calling_score, play_again: play_again === 'yes' ? 10 : play_again === 'no' ? 0 : null}
            const post_response = await fetch(apiUrl + "/rating", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
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
            alert("Failed to insert rating. Please make sure ratings are between 0 and 10 inclusive!");
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
                <div className="col-md-6">
                <div className="form-group text-center">
                    <label htmlFor="playerName">Player Name</label>
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
                    <div className="col-2">
                        <div className="form-group text-center">
                            <label>Cs'ing</label>
                            <input
                            type="number"
                            className="form-control text-center"
                            placeholder="Enter a rating on 10"
                            min="0"
                            max="10"
                            value={creep_score} onChange={e => setCreep_score(e.target.value)}
                            />
                        </div>
                        </div>
                        <div className="col-2">
                        <div className="form-group text-center">
                            <label>Map Awareness</label>
                            <input
                            type="number"
                            className="form-control text-center"
                            placeholder="Enter a rating on 10"
                            min="0"
                            max="10"
                            value={map_awareness_score} onChange={e => setMap_awareness_score(e.target.value)}
                            />
                        </div>
                        </div>
                        <div className="col-2">
                        <div className="form-group text-center">
                            <label>Team Fighting</label>
                            <input
                            type="number"
                            className="form-control text-center"
                            placeholder="Enter a rating on 10"
                            min="0"
                            max="10"
                            value={team_fighting_score} onChange={e => setTeam_fighting_score(e.target.value)}
                            />
                        </div>
                        </div>
                </div>
                {/* this is one line */}
                <div className="row justify-content-center mb-3">
                    <div className="col-2">
                        <div className="form-group text-center">
                            <label>Intentional Feeding</label>
                            <input
                            type="number"
                            className="form-control text-center"
                            placeholder="Enter a rating on 10"
                            min="0"
                            max="10"
                            value={feeding_score} onChange={e => setFeeding_score(e.target.value)}
                            />
                        </div>
                        </div>
                        <div className="col-2">
                        <div className="form-group text-center">
                            <label>Toxicity</label>
                            <input
                            type="number"
                            className="form-control text-center"
                            placeholder="Enter a rating on 10"
                            min="0"
                            max="10"
                            value={toxicity_score} onChange={e => setToxicity_score(e.target.value)}
                            />
                        </div>
                        </div>
                        <div className="col-2">
                        <div className="form-group text-center">
                            <label>Tiltability</label>
                            <input
                            type="number"
                            className="form-control text-center"
                            placeholder="Enter a rating on 10"
                            min="0"
                            max="10"
                            value={tilt_score} onChange={e => setTilt_score(e.target.value)}
                            />
                        </div>
                        </div>
                </div>
                {/* this is one line */}
                <div className="row justify-content-center mb-3">
                    <div className="col-2">
                        <div className="form-group text-center">
                            <label>Kindness</label>
                            <input
                            type="number"
                            className="form-control text-center"
                            placeholder="Enter a rating on 10"
                            min="0"
                            max="10"
                            value={kindness_score} onChange={e => setKindness_score(e.target.value)}
                            />
                        </div>
                        </div>
                        <div className="col-2">
                        <div className="form-group text-center">
                            <label>Laning / Jungling</label>
                            <input
                            type="number"
                            className="form-control text-center"
                            placeholder="Enter a rating on 10"
                            min="0"
                            max="10"
                            value={laning_score} onChange={e => setLaning_score(e.target.value)}
                            />
                        </div>
                        </div>
                        <div className="col-2">
                        <div className="form-group text-center">
                            <label>Carry-ability</label>
                            <input
                            type="number"
                            className="form-control text-center"
                            placeholder="Enter a rating on 10"
                            min="0"
                            max="10"
                            value={carry_score} onChange={e => setCarry_score(e.target.value)}
                            />
                        </div>
                        </div>
                {/* this is one line */}
                </div>
                <div className="row justify-content-center mb-3">
                        <div className="col-2">
                        <div className="form-group text-center">
                            <label>Shot calling</label>
                            <input
                            type="number"
                            className="form-control text-center"
                            placeholder="Enter a rating on 10"
                            min="0"
                            max="10"
                            value={shot_calling_score} onChange={e => setShot_calling_score(e.target.value)}
                            />
                        </div>
                        </div>
                        <div className="col-2">
                        <div className="form-group text-center">
                            <label>Play again?</label>
                            <select
                        className="form-control text-center"
                        value={play_again} onChange={e => setPlay_again(e.target.value)}
                        >
                            <option value="select" disabled>Select an option</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-6 text-center">
                    <button
                        type="submit"
                        className="btn btn-dark text-light btn-lg mt-2"
                    >
                        Contribute
                    </button>
                    </div>
                </div>
            </div>
        </form>
        </div>
  );
};

export default Contribute;
