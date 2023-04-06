import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WorkingCollection from './pages/WorkingCollections';
import Steps from './pages/Steps';

import SavedCollections from './pages/SavedCollections';
import Browse from './pages/Browse';
import RecipePage from './pages/RecipePage'; 
import LikedRecipes from './pages/LikedRecipes';
import Profile from './pages/Profile';
import Success from './pages/Success';
import Login from './pages/Login';


function App() {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');

  const assignUsername = (user) => {
      setUsername(user);
  }

  const assignName = (name) => {
      setName(name);
  }

  return (
    <div className="App">
      <header className="App-header">

        <Router>
          <Routes>
            <Route path="/" element={<Login passUser={assignUsername} passName={assignName} />} />
            <Route path={`/${username}/browse`} element={<Browse name={name} username={username} />} />
            <Route path={`/${username}/workingCollection`} element={<WorkingCollection />} />
            <Route path={`/${username}/steps`} element={<Steps />} />
            <Route path={`/${username}/recipePage`} element={<RecipePage />} />
            <Route path={`/${username}/likedRecipes`} element={<LikedRecipes />} />
            <Route path={`/${username}/profile`} element={<Profile />} />
            <Route path={`${username}/success`} element={<Success />} />
          </Routes>
        </Router>


      </header>
    </div>
  );
}

export default App;
