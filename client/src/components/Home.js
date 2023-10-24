import React, { Fragment } from "react";
import SearchBar from "./SearchBar";
import "../Main.css";

const Home = ({ handleContributeClick, handleSearchSuccess }) => {
  return (
    <Fragment>
      <div className="middle_page d-flex flex-column align-items-center">
      <h1 className='text-center'>Welcome to Int Rating!</h1>
      <p className='text-center mt-4'>Please feel free to leave some feedback by clicking the feedback tab!</p>
      {/* <p className="text-center mt-2">Be sure to also check out the updates tab to learn what's new!</p> */}
        <button
          type="button"
          className="btn btn-lg btn-dark text-light mt-sm-5"
          onClick={handleContributeClick}
        >
          Contribute
        </button>
        <h5 className="mt-2">OR</h5>
        <SearchBar handleSearchSuccess={handleSearchSuccess} />
      </div>
    </Fragment>
  );
};

export default Home;