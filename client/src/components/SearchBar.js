// Inside the SearchBar component

import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import ServerListNames from "./ServerListNames";

const apiUrl = process.env.REACT_APP_API_URL;

const SearchBar = () => {
  const [full_username, setFull_Username] = useState("");
  const [selectedServer, setSelectedServer] = useState("Server");
  const [gameName, setGameName] = useState("");
  const [tagLine, setTagLine] = useState("");
  const [playerData, setPlayerData] = useState(null); // State to store player data
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${apiUrl}/search?gameName=${encodeURIComponent(
          gameName
        )}&tagLine=${encodeURIComponent(tagLine)}&server_name=${selectedServer}`;

        const response = await fetch(url, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (response.ok) { 
          const data = await response.json();
          // Construct the query string from the parameters
          const queryString = `?gameName=${data.gameName}&tagLine=${data.tagLine}&server_name=${data.server_name}&puuid=${data.puuid}`;
          // Navigate to the DisplayPlayer component with the query parameters
          navigate(`/displayPlayer${queryString}`);
        } else {
          alert(
            "Player not found. Be sure to add the player's tagline." +
              full_username +
              "!"
          );
        }
      } catch (err) {
        console.error("Error:", err.message);
      }
    };

    if (gameName !== "" && tagLine !== "") {
      fetchData();
      setGameName("");
      setTagLine("");
    }
  }, [gameName, tagLine, selectedServer, full_username, navigate]);

  const onSubmitForm = (e) => {
    e.preventDefault();
    const [gameNameResult, tagLineResult] = extractUsernameAndTagline(
      full_username
    );

    const trimmedGameName = gameNameResult.trim();
    setGameName(trimmedGameName);
    setTagLine(tagLineResult);
  };

  const extractUsernameAndTagline = (full_username) => {
    const hashIndex = full_username.indexOf("#");
    const gameNameResult = full_username.substring(0, hashIndex);
    const tagLineResult = full_username.substring(hashIndex + 1);

    return [gameNameResult, tagLineResult];
  };

  return (
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
      <div>
        <ServerListNames
          selectedServer={selectedServer}
          setSelectedServer={setSelectedServer}
        />
        <button className="btn btn-dark text-light" type="submit">
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
