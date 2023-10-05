import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthForm from './Components/AuthForm';
import HomeComponent from './Components/HomeComponent';
import Sent from './Components/Sent';
import Inbox from './Components/Inbox';
import Header from './Components/Header';
import { useSelector } from 'react-redux'; 


const App = () => {
  const isLoggedIn = useSelector(state => state.auth.isAuthenticated);
  return (
    <Router>
    <div>
    <Header />
        <Routes>
          <Route path="/" element={<AuthForm />} />
          {isLoggedIn && (
            <Route path="/home" element={<HomeComponent />} />
          )}
          {isLoggedIn && (
            <Route path="/inbox" element={<Inbox />} />
          )}
          {isLoggedIn && (
            <Route path="/sent" element={<Sent />} />
          )}
        </Routes>
    </div>
  </Router>
  );
}

export default App;
