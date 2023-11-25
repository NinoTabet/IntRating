import { useState } from "react";
const apiUrl = process.env.REACT_APP_API_URL;

const Playground = () => {
  const [full_username, setFull_Username] = useState("");
  const [gameName, setGameName] = useState("");
  const [tagLine, setTagLine] = useState("");
  const [region, setRegion] = useState("AMERICAS"); // Default region is set to AMERICAS

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
      console.log("\ngameName: " + gameName + "\ntagline: " + tagLine + "\nregion: " + region);

      // Call an async function to make the fetch call
      await fetchData();
    } catch (error) {
      console.error(error + " failed.");
    }
  };

  const fetchData = async () => {
    try {
        const url = apiUrl+`/riot_api/player_search?gameName=${gameName}&tagLine=${tagLine}&region=${region}`
        const response = await fetch(url,
        {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        // Check if the response status is OK (200)
        if (response.ok) {
            console.log(response);
        }

        // Parse the response as JSON
        const data = await response.json();

        console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
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
    </>
  );
};

export default Playground;
