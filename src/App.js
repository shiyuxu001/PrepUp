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
import CategoryPage from './pages/CategoryPage';


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
            <Route exact path="/PrepUp" element={<Login passUser={assignUsername} passName={assignName} />} />
            <Route path={`/PrepUp/${username}/browse`} element={<Browse name={name} username={username} />} />
            <Route path={`/PrepUp/${username}/workingCollection`} element={<WorkingCollection username={username} />} />
            <Route path={`/PrepUp/${username}/steps`} element={<Steps username={username} />} />
            <Route path={`/PrepUp/${username}/recipePage/:mealId`} element={<RecipePage username={username} />} />
            <Route path={`/PrepUp/${username}/categoryPage/:categoryName`} element={<CategoryPage username={username} />} />
            <Route path={`/PrepUp/${username}/likedRecipes`} element={<LikedRecipes username={username} />} />
            <Route path={`/PrepUp/${username}/profile`} element={<Profile />} />
            <Route path={`/PrepUp/${username}/success`} element={<Success username={username} />} />
            <Route path={`/PrepUp/${username}/savedCollections`} element={<SavedCollections username={username} />} />
          </Routes>
        </Router>


      </header>
    </div>
  );
}

export default App;
