import './App.css';
import WorkingCollection from './pages/WorkingCollections';
import Steps from './pages/Steps';
import SavedCollections from './pages/SavedCollections';
import Browse from './pages/Browse';
import RecipePage from './pages/RecipePage'; 
import LikedRecipes from './pages/LikedRecipes';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <WorkingCollection /> */}
        {/* <Steps /> */}
        {/* <SavedCollections /> */}
        {/* < Browse /> */}
        {/* <RecipePage /> */}
        <LikedRecipes />


      </header>
    </div>
  );
}

export default App;
