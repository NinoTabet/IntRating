// App.js
import React, { useState } from 'react';
import Home from './components/Home';
import NavBar from './components/NavBar';
import Contribute from './components/Contribute';
import Contact from './components/Contact';
import DisplayPlayer from './components/DisplayPlayer';
import LoginSignup from './components/LoginSignup';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [playerData, setPlayerData] = useState(null);

  const [token, setToken] = useState(null);

  const handleContributeClick = () => {
    setCurrentPage('contribute');
    setSubmissionSuccess(false);
  };
  const handleSearchSuccess = (data) => {
    setCurrentPage('displayPlayer');
    setPlayerData(data);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home handleContributeClick={handleContributeClick} handleSearchSuccess={handleSearchSuccess} />;
      case 'contribute':
        return <Contribute token={token} handleContributeClick={handleContributeClick} handleSearchSuccess={handleSearchSuccess} />;
      case 'contact':
        return <Contact />;
      case 'loginsignup':
        return <LoginSignup setCurrentPage={setCurrentPage}/>;
      case 'login':
        return <LogIn/>;
      case 'signup':
        return <SignUp/>;
      case 'displayPlayer':
        return <DisplayPlayer playerData={playerData} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <NavBar setCurrentPage={setCurrentPage} handleSearchSuccess={handleSearchSuccess} />
      {renderPage()}
    </div>
  );
};

export default App;
