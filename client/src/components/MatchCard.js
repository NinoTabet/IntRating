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
    most_used_ping,
    total_pings,
    kill_participation,
  } = match;

  
  return (
    <div className="rounded border border-dark p-1">
      <div className="border-bottom align-items-center d-flex justify-content-between">
        <div className="d-flex align-items-center">
        <img src={require(`../../public/content/Champions/${champion_played}.jpg`)} alt='Champion image' className='champion-icon border border-dark me-2 rounded'></img>
        <div className="text-center">
          <div className="fw-bold">{kda}</div>
          <small className="text-muted">{calculated_kda} KDA</small></div>
        </div>
       
          <button onClick={handleClick} className="btn border border-primary bt-sm">
            Rate this game
          </button>
      </div>
      <div className="d-flex justify-content-between">
        <div className="col d-flex flex-column align-items-start justify-content-center">
          <div className="fw-bold">{game_mode}</div>
          <div className="fw-bold">{game_time}</div>
          <div>{items.join(", ")}</div>
        </div>
        <div className="col">
          <div><span className="fw-bold">Kill participation:</span> {kill_participation}%</div>
          <div><span className="fw-bold">Most Used Ping:</span> {most_used_ping}</div>
          <div><span className="fw-bold">Total # Pings:</span> {total_pings}</div>
        </div>
        <div className="col">
          <div><span className="fw-bold">Summoner Spells:</span> {summoner_spells.join(", ")}</div>
          <div><span className="fw-bold">Minion Kills:</span> {minion_kills}</div>
          <div><span className="fw-bold">Minions Per Minute:</span> {minions_pm}</div>
        </div>
      </div>
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
