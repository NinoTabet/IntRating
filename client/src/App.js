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
import Profile from './components/Profile';
import Footer from './components/Footer';
import TermsAndConditions from './components/TermsAndConditions';
import PrivacyPolicy from './components/PrivacyPolicy';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [playerData, setPlayerData] = useState(null);

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
        return <Home setCurrentPage={setCurrentPage} handleContributeClick={handleContributeClick} handleSearchSuccess={handleSearchSuccess} />;
      case 'contribute':
        return <Contribute handleContributeClick={handleContributeClick} handleSearchSuccess={handleSearchSuccess} />;
      case 'contact':
        return <Contact />;
      case 'loginsignup':
        return <LoginSignup setCurrentPage={setCurrentPage}/>;
      case 'login':
        return <LogIn setCurrentPage={setCurrentPage}/>;
      case 'signup':
        return <SignUp setCurrentPage={setCurrentPage}/>;
      case 'profile':
        return <Profile/>
      case 'displayPlayer':
        return <DisplayPlayer playerData={playerData} />;
      case 'terms':
        return <TermsAndConditions/>
      case 'privacy':
        return <PrivacyPolicy/>
      default:
        return null;
    }
  };

  return (
      <div>
        <NavBar setCurrentPage={setCurrentPage} handleSearchSuccess={handleSearchSuccess} />
        {renderPage()}
        <Footer setCurrentPage={setCurrentPage}/>
      </div>
  );
};

export default App;
