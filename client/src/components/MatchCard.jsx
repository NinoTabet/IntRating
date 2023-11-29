import React from "react";

const MatchCard = ({ src, alt, gameType, Map,kda, gameRating, cs }) => {
	const handleClick = () => {
		console.log('click')
	}
	return (
		<div className="rounded">
			<div className="border-bottom">
				<img
				src={src}
				alt={alt}
			/>
            <span>{gameType} - {Map}</span>
			<button onClick={handleClick}>Rate this game</button>
			</div>
			<span>{kda}</span>
			<span>{cs}</span>
			<span>{gameRating}</span>
		</div>
	);
};

export default MatchCard;
