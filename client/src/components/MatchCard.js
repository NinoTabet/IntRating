import React from "react";
import PropTypes from "prop-types";

const MatchCard = ({ match }) => {
  const handleClick = () => {
    console.log("click");
  };

  const {
    kda,
    calculated_kda,
    champion_played,
    minion_kills,
    summoner_spells,
    game_mode,
    game_time,
    minions_pm,
    items,
    game_end_time,
    total_pings,
    kill_participation,
  } = match;

  return (
    <div className="rounded border border-dark">
      <div className="border-bottom align-items-center d-flex">
        <span>
          kda {kda} calculated kda {calculated_kda} <span>Kill Participation: {kill_participation}%</span>

        </span>
        <button onClick={handleClick} className="btn border border-primary bt-sm">
          Rate this game
        </button>
      </div>
      <span>Champion Played: {champion_played}</span>
      <span>Minion Kills: {minion_kills}</span>
      <span>Summoner Spells: {summoner_spells.join(", ")}</span>
      <span>Game Mode: {game_mode}</span>
      <span>Game Time: {game_time}</span>
      <span>Minions Per Minute: {minions_pm}</span>
      <span>Items: {items.join(", ")}</span>
      <span>Total Pings: {total_pings}</span>
    </div>
  );
};

MatchCard.propTypes = {
  match: PropTypes.shape({
    kda: PropTypes.string.isRequired,
    calculated_kda: PropTypes.string.isRequired,
    champion_played: PropTypes.string.isRequired,
    minion_kills: PropTypes.number.isRequired,
    summoner_spells: PropTypes.arrayOf(PropTypes.number).isRequired,
    game_mode: PropTypes.string.isRequired,
    game_time: PropTypes.string.isRequired,
    minions_pm: PropTypes.number.isRequired,
    items: PropTypes.arrayOf(PropTypes.number).isRequired,
    game_end_time: PropTypes.number.isRequired,
    total_pings: PropTypes.number.isRequired,
    kill_participation: PropTypes.string.isRequired,
  }).isRequired,
};

export default MatchCard;
