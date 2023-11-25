// SearchBar.js
import React, { useState } from "react";
import ServerListNames from "./ServerListNames";

const apiUrl = process.env.REACT_APP_API_URL;
const RIOT_API = process.env.RIOT_API;

const SearchBar = ({ handleSearchSuccess }) => {
  const [ full_username, setFull_Username ] = useState("");
  const [selectedServer, setSelectedServer] = useState("Server");
  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const url = apiUrl + `/search?full_username=${encodeURIComponent(full_username)}&server_name=${encodeURIComponent(selectedServer)}`;
      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const data = await response.json();
        handleSearchSuccess({ original_username: data.original_username, server_name: selectedServer, tag_line : data.tag_line });
      }else{
        alert('Player not found in database. Be the first to rate '+full_username+'!');
      }
    } catch (err) {
      console.error("Error:", err.message);
    }
  };

  return (
  <form className="d-flex flex-column flex-md-row mx-auto text-center" onSubmit={onSubmitForm}>
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
      <ServerListNames selectedServer={selectedServer} setSelectedServer={setSelectedServer} />
      <button className="btn btn-dark text-light" type="submit">
        Search
      </button>
    </div>
  </form>
  );
};

export default SearchBar;
