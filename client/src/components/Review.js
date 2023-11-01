import React, { Fragment, useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import "../Main.css";
const apiUrl = process.env.REACT_APP_API_URL;

const Review = () => {

  const [latestRatingId, setLatestRatingId] = useState(null);

  useEffect(() => {
    const fetchLatestRatingId = async () => {
      try {
        const response = await fetch(apiUrl + "/total_ratings");
        if (response.ok) {
          const data = await response.json();
          setLatestRatingId(data.latestRatingId);
        } else {
          console.error("Failed to fetch latest rating ID");
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    fetchLatestRatingId();
  }, []);

  return (
    <>
    </>
  );
};

export default Review;