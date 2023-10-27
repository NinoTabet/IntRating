// ServerListNames.js
import React, { useState, useEffect } from "react";

const apiUrl = process.env.REACT_APP_API_URL;

const ServerListNames = ({ selectedServer, setSelectedServer }) => {
  const [serverList, setServerList] = useState([]);

  useEffect(() => {
    const fetchDataOnLoad = async () => {
      try {
        const response = await fetch(apiUrl + "/servers", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
          const data = await response.json();
          setServerList(data);
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    fetchDataOnLoad();
  }, []);

  const handleServerClick = (server) => {
    setSelectedServer(server);
  };

  return (
    <div className="btn-group">
      <button
        className="btn btn-light text-dark dropdown-toggle me-1 border border-dark"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        style={{ minWidth: "100px", maxWidth: "100px", overflow: "hidden", textOverflow: "ellipsis" }}
      >
        {selectedServer || "Server"}
      </button>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        {serverList.map((server) => (
          <li key={server}>
            <a
              className="dropdown-item"
              href="#"
              onClick={() => handleServerClick(server)}
            >
              {server}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServerListNames;
