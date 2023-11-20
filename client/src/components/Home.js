import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import "../Main.css";
const apiUrl = process.env.REACT_APP_API_URL;

const Home = ({ setCurrentPage, handleSearchSuccess }) => {
  const [latestRatingId, setLatestRatingId] = useState(null);
  const jwtAuthorization = document.cookie.includes("jwt_authorization");

  useEffect(() => {
    const fetchLatestRatingId = async () => {
      try {
        const response = await fetch(apiUrl + "/total_ratings");
        if (response.ok) {
          const data = await response.json();
          setLatestRatingId(data.latestRatingId);
        } else {
          console.error("Failed to fetch the latest rating ID");
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    fetchLatestRatingId();
  }, []);

  const handleContributeClick = () => {
    if (jwtAuthorization) {
      setCurrentPage("contribute");
    } else {
      alert("Please sign up or log in to be able to contribute a rating!")
      setCurrentPage("loginsignup");
    }
  };

  return (
    <>
      <div className="container mx-auto w-100vw d-flex align-items-center justify-content-center border" style={{ height: '75vh' }}>
        <div className="w-50 text-center">
          <h1 className="text-center">Welcome to Int Rating!</h1>
          <p className="text-center mt-4">
            Please feel free to leave some feedback by clicking the feedback tab!
          </p>
          <h6 className="mt-3">
            Total ratings: <span>{latestRatingId}</span>
          </h6>
          <button
            type="button"
            className="btn btn-lg btn-dark text-light mt-sm-5"
            onClick={handleContributeClick}
          >
            Contribute rating
          </button>
          <h5 className="mt-2">OR</h5>
          <SearchBar handleSearchSuccess={handleSearchSuccess}/>
        </div>
      </div>
      <div className="bottom-nav fixed-bottom d-flex align-items-center justify-content-center mb-1">
      </div>
    </>
  );
};

export default Home;
