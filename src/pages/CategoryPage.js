import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import '../styles/RecipePage.css';
import RecipesCard from '../components/RecipesCard';



function CategoryPage({username}) {
  let {categoryName}= useParams()

  let navigate = useNavigate();
  const[recipes,setRecipes]=useState();
  const [recipesLoaded, setRecipesLoaded] = useState(false)


    const getRecipes= ()=>{
      axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`)
      .then(response => {
          console.log('recipes: ', response.data.meals)
          setRecipes(response.data.meals);
          setRecipesLoaded(true)
      })
  }

    const handleAddToQueue = () => {
      navigate(`/PrepUp/${username}/workingCollection`);
    }

    const handleAddToSavedCollection = () => {
      navigate(`/PrepUp/${username}/savedCollections`);
    }

    const handleBackButton = () => {
      console.log('username: ', username)
      navigate(`/PrepUp/${username}/browse`);
    }

    // const navToLikedRecipes = () => {
    //   navigate(`/PrepUp/${username}/likedRecipes`)
    // }


      useEffect(() => {    
        getRecipes()
      }, []);
  
    return (
      <div className="App">
        <header className="App-header">
          {/* <WorkingCollection /> */}
          {/* <Steps /> */}
          
        </header>
  
        <div className='app-header'>
            <button className='back-btn' onClick={handleBackButton}> &lt; Back to Browse </button>
          <h1>{categoryName} Recipes</h1>
          <button className='user-btn' >Profile</button>
        </div>

        <div className="new-recipe-cards-container">
            <div className="new-recipe-cards">
                {recipesLoaded && recipes.length > 0 && 
                        recipes.map((item) => ( 
                        <RecipesCard 
                            title = {item['strMeal']}  
                            imgURL = {item['strMealThumb']}
                            username= {username} 
                            mealId = {item['idMeal']} 
                            />
                        )) 
                }  
            </div>
        </div>
  
       {/* {recipeLoaded && recipes.length > 0 &&
        <div className='recipe-container'>
          <div className='recipe-header'>
          <h1 className='rp-recipe-name'> {recipe[0]['strMeal']}</h1>
            <p> Total Time: 50 min</p>
            <img className="recipe-img" src={recipe[0]['strMealThumb']} alt={recipe[0]['strMeal']} />
          </div>
  
          <div className='recipe-ingredients'>
            <h2>Ingredients</h2>
            {renderIngredients()}
          </div>
  
          <div className='recipe-steps'>
            <h2>Instructions</h2>
            <p> {recipe[0]['strInstructions']}</p>
          </div>

          <div className="recipe-buttons">
            <button onClick={handleAddToQueue}>Queue</button>
            <button onClick={handleAddToSavedCollection}>Add</button>
            <button onClick={navToLikedRecipes}>Like</button>
          </div>
        </div>
        } */}
      </div>
    );
}

export default CategoryPage;