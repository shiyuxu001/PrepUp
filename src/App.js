import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WorkingCollection from './pages/WorkingCollections';
import Steps from './pages/Steps';
import SavedCollections from './pages/SavedCollections';
import Browse from './pages/Browse';
import RecipePage from './pages/RecipePage'; 
import LikedRecipes from './pages/LikedRecipes';
import Profile from './pages/Profile';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Routes>
            <Route path="/browse" element={<Browse />} />
            <Route path="/workingCollection" element={<WorkingCollection />} />
            <Route path="/steps" element={<Steps />} />
            <Route path="/recipePage" element={<RecipePage />} />
            <Route path="/likedRecipes" element={<LikedRecipes />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
