// SearchBar.js
import React, { useState } from "react";
import ServerListNames from "./ServerListNames";

const apiUrl = process.env.REACT_APP_API_URL;

const SearchBar = ({ handleSearchSuccess }) => {
  const [ original_username, setOriginal_username ] = useState("");
  const [selectedServer, setSelectedServer] = useState("Server");
  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const url = apiUrl + `/search?original_username=${encodeURIComponent(original_username)}&server_name=${encodeURIComponent(selectedServer)}`;
      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const data = await response.json();
        handleSearchSuccess({ original_username: data.original_username, server_name: selectedServer, playerData: data });
      }else{
        alert('Player not found in databse. Be the first to rate '+original_username+'!');
      }
    } catch (err) {
      console.error("Error:", err.message);
    }
  };

  return (
    <form className="d-flex" onSubmit={onSubmitForm}>
      <input
        type="search"
        className="form-control text-bg-light btn-lg me-1"
        placeholder="Player name..."
        aria-label="Search"
        value={original_username}
        onChange={(e) => setOriginal_username(e.target.value)}
      />
      <ServerListNames selectedServer={selectedServer} setSelectedServer={setSelectedServer} />
      <button className="btn btn-dark text-light btn-sm" type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
