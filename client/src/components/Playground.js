import { useState } from "react";
const apiUrl = process.env.REACT_APP_API_URL;

const Playground = () => {
  const [full_username, setFull_Username] = useState("");
  const [gameName, setGameName] = useState("");
  const [tagLine, setTagLine] = useState("");
  const [region, setRegion] = useState("AMERICAS"); // Default region is set to AMERICAS
  const [matchData, setMatchData] = useState(null); // Initialize matchData as null

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      // Helper function to extract username and tag_line
      const [gameNameResult, tagLineResult] = extractUsernameAndTagline(
        full_username
      );

      // Remove trailing spaces from the gameName and replace spaces with '%20'
      const trimmedGameName = gameNameResult.trim();
      setGameName(encodeURIComponent(trimmedGameName));
      setTagLine(tagLineResult);
      
      // Call an async function to make the fetch call
      const data = await fetchData();
      setMatchData(data);
    } catch (error) {
      return alert("username incorrect, please try again.");
    }
  };

  const fetchData = async () => {
    try {
      const url = apiUrl + `/riot_api/player_search?gameName=${gameName}&tagLine=${tagLine}&region=${region}`;
      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      // Check if the response status is OK (200)
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      // Parse the response as JSON
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error; // Rethrow the error to handle it in the calling function
    }
  };

  const extractUsernameAndTagline = (full_username) => {
    const hashIndex = full_username.indexOf("#");
    const gameNameResult = full_username.substring(0, hashIndex);
    const tagLineResult = full_username.substring(hashIndex + 1);

    return [gameNameResult, tagLineResult];
  };


  return (
    <>
      <form
        className="d-flex flex-column flex-md-row mx-auto text-center"
        onSubmit={onSubmitForm}
      >
        <div className="mb-1 me-md-1">
          <input
            type="search"
            className="form-control text-bg-light"
            placeholder="Player name..."
            aria-label="Search"
            value={full_username}
            onChange={(e) => setFull_Username(e.target.value)}
          />
        </div>
        <div className="mb-1 me-md-1">
          <select
            className="form-select"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          >
            <option value="AMERICAS">AMERICAS</option>
            <option value="EUROPE">EUROPE</option>
            <option value="ASIA">ASIA</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>
      {matchData && (
        <div>
          <h1>game data test</h1>
          <p>Game mode: {matchData.game_mode}</p>
          <p>Game time: {matchData.game_time}</p>
          <p>Champion played: {matchData.champion_played}</p>
          <p>K/D/A: {matchData.kda}</p>
          <p>CS Killed: {matchData.minion_kills} ({matchData.cs_pm} cs/min)</p>
          <p>Summoner spells: {matchData.summoner_spells[0]} {matchData.summoner_spells[1]}</p>
        </div>
      )}
    </>
  );
};

export default Playground;
