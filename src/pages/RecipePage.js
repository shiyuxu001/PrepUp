import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import '../styles/RecipePage.css';


function RecipePage(username) {
  let {mealId}= useParams()

  let navigate = useNavigate();
  const[recipe,setRecipe]=useState();
  const [recipeLoaded, setRecipeLoaded] = useState(false)


    const getRecipe= ()=>{
      axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
      .then(response => {
          console.log('recipe: ', response.data.meals)
          setRecipe(response.data.meals);
          setRecipeLoaded(true)
      })
  }

    const handleAddToQueue = () => {
      navigate(`/PrepUp/${username}/workingCollection`);
    }

    const handleAddToSavedCollection = () => {
      navigate(`/PrepUp/${username}/savedCollections`);
    }

    const handleBackButton = () => {
      navigate(`/PrepUp/${username}/browse`);
    }

    const navToLikedRecipes = () => {
      navigate(`/PrepUp/${username}/likedRecipes`)
    }

    // function handleCheckboxChange(id) {
    //     const updatedIngredients = ingredients.map(ingredient => {
    //       if (ingredient.id === id) {
    //         return { ...ingredient, checked: !ingredient.checked };
    //       } else {
    //         return ingredient;
    //       }
    //     });
    //     setIngredients(updatedIngredients);
    //   }
  
      function renderIngredients(){
        // parse ingridents 
        const ingList = []

        for(let i=1; i <= 20; i++ ) {
          if(recipe[0][`strMeasure${i}`]) {
              const ingredient = {id: i, name: recipe[0][`strMeasure${i}`] + " " + recipe[0][`strIngredient${i}`], checked: false }
              // console.log('single ing: ', ingredient)
              ingList.push(ingredient)
              // setIngredients(oldIngredients => [...oldIngredients, ingredient]);
          }
        }
        console.log('ingredients: ', ingList)
        return (
          <ul>
            {ingList.map(ingredient => (
              <li key={ingredient.id}>
                <label>
                  <input
                    type="checkbox"
                    checked={ingredient.checked}
                  />
                  <span style={{ textDecoration: ingredient.checked ? 'line-through' : 'none' }}>{ingredient.name}</span>
                </label>
              </li>
            ))}
          </ul>
        )
      }

      function renderImage(){
        return (
          <img className="recipe-img" src={recipe[0]['strMealThumb']} alt={recipe[0]['strMeal']} />
        )
      }

      function renderTitle() {
        return(
          <h1 className='rp-recipe-name'> {recipe[0]['strMeal']}</h1>
        )
      }

      function renderInstructions(){
        return(
          <p> {recipe[0]['strInstructions']}</p>
        )
      }


      useEffect(() => {    
        getRecipe()
      }, []);
  
    return (
      <div className="App">
        <header className="App-header">
          {/* <WorkingCollection /> */}
          {/* <Steps /> */}
          
        </header>
  
        <div className='app-header'>
          <button className='back-btn' onClick={handleBackButton}> &lt; Back </button>
          <h1>PREP UP</h1>
          <button className='user-btn' >Profile</button>
        </div>
  
       {recipeLoaded && recipe.length > 0 &&
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
        }
      </div>
    );
}

export default RecipePage;