import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Contribute from './components/Contribute';
import Feedback from './components/Feedback';
import DisplayPlayer from './components/DisplayPlayer';
import LoginSignup from './components/LoginSignup';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import Profile from './components/Profile';
import Footer from './components/Footer';
import TermsAndConditions from './components/TermsAndConditions';
import PrivacyPolicy from './components/PrivacyPolicy';

const App = () => {
  return (
    <Router>
      <div>
        <NavBar /> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contribute" element={<Contribute />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/loginsignup" element={<LoginSignup />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/displayPlayer" element={<DisplayPlayer />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;