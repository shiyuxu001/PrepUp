import './App.css';
import React, { useState, useEffect } from 'react';
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
import HelpPage from './pages/Help'


function App() {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [helpPressed, setHelpPressed] = useState(false)

  useEffect(() => {
    const ioniconsScript = document.createElement('script');
    ioniconsScript.setAttribute('type', 'module');
    ioniconsScript.setAttribute('src', 'https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js');
    document.head.appendChild(ioniconsScript);

    const ioniconsScriptNoModule = document.createElement('script');
    ioniconsScriptNoModule.setAttribute('nomodule', '');
    ioniconsScriptNoModule.setAttribute('src', 'https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js');
    document.head.appendChild(ioniconsScriptNoModule);
  }, []);

  const assignUsername = (user) => {
      setUsername(user);
  }

  const assignName = (name) => {
      setName(name);
  }
  return (
    <div className="App">
      <header className="App-header">      
      </header>

      {helpPressed ?
         <div className='help-page' ><HelpPage username= {username}/></div>
         : ''
      
    }
    <div className='help-page' ><HelpPage username= {username}/></div>

     


        <Router>
          <Routes>
            <Route exact path="/PrepUp" element={<Login passUser={assignUsername} passName={assignName} />} />
            <Route path={`/PrepUp/${username}/browse`} element={<Browse name={name} username={username} />} />
            <Route path={`/PrepUp/${username}/workingCollection`} element={<WorkingCollection username={username} />} />
            <Route path={`/PrepUp/${username}/steps`} element={<Steps username={username} />} />
            <Route path={`/PrepUp/${username}/recipePage/:mealId`} element={<RecipePage username={username} />} />
            <Route path={`/PrepUp/${username}/categoryPage/:categoryName`} element={<CategoryPage username={username} />} />
            <Route path={`/PrepUp/${username}/likedRecipes`} element={<LikedRecipes username={username} />} />
            <Route path={`/PrepUp/${username}/profile`} element={<Profile username={username} />} />
            <Route path={`/PrepUp/${username}/success`} element={<Success username={username} />} />
            <Route path={`/PrepUp/${username}/savedCollections`} element={<SavedCollections username={username} />} />
          </Routes>
        </Router>
        {/* <HelpPage/> */}
    </div>
    
            

  );
}

export default App;
