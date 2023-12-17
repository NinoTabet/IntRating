import React from "react";

const MatchCard = ({ playerProfileData , riotApiMatchHistory }) => {
	const handleClick = () => {
		console.log('click')
	}
	return (
		<div className="rounded border border-dark">
			<div className="border-bottom align-items-center d-flex">
				<span>kda </span><span>calculated kda</span>
				<button onClick={handleClick} className="btn border border-primary bt-sm">Rate this game</button>
			</div>
			<span>champion_played</span>
			<span>minion_kills</span>
			<span>summoner_spells</span>
			<span>game_mode</span>
			<span>game_time</span>
			<span>minions_pm</span>
			<span>items</span>
			<span>game_end_time</span>
			<span>total_pings</span>
			<span>kill_participation</span>
		</div>
	);
};

export default MatchCard;
