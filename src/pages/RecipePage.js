import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import '../styles/RecipePage.css';


function RecipePage(username) {
  let {mealId}= useParams()

  let navigate = useNavigate();
  const[recipe,setRecipe]=useState();
  const[ingredients, setIngredients] = useState();


    const getRecipe= ()=>{
      axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
      .then(response => {
          console.log(response.data.meals)
          setRecipe(response.data.meals);
      })
  }

    const handleAddToQueue = () => {
      navigate(`/PrepUp/${username}/workingCollection`);
    }

    const handleBackButton = () => {
      navigate(`/PrepUp/${username}/browse`);
    }

    const navToLikedRecipes = () => {
      navigate(`/PrepUp/${username}/likedRecipes`)
    }

    useEffect(() => {
      getRecipe() 
      } 
      ,[])

    const parseIngredients = () => {
      for(let i=1; i <= 20; i++ ) {
        if(recipe[0][`strMeasure${i}`]) {
            const ingredient = {id: i, name: recipe[0][`strMeasure${i}`] + " " + recipe[0][`strIngredient${i}}`], checked: false }
            setIngredients(oldIngredients => [...oldIngredients, ingredient]);
        }
      }
      console.log('ingredients: ', ingredients)
    }


  
    function handleCheckboxChange(id) {
        const updatedIngredients = ingredients.map(ingredient => {
          if (ingredient.id === id) {
            return { ...ingredient, checked: !ingredient.checked };
          } else {
            return ingredient;
          }
        });
        setIngredients(updatedIngredients);
      }
  
      function renderIngredients(){
        parseIngredients();
        return (
          <ul>
            {ingredients.map(ingredient => (
              <li key={ingredient.id}>
                <label>
                  <input
                    type="checkbox"
                    checked={ingredient.checked}
                    onChange={() => handleCheckboxChange(ingredient.id)}
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
  
  
        <div className='recipe-container'>
          <div className='recipe-header'>
            {renderTitle()}
            <p> Total Time: 50 min</p>
            {renderImage()}
          </div>
  
          <div className='recipe-ingredients'>
            <h2>Ingredients</h2>
            {renderIngredients()}
          </div>
  
          <div className='recipe-steps'>
            <h2>Instructions</h2>
            {renderInstructions()}
          </div>

          <div className="recipe-buttons">
            <button>Queue</button>
            <button onClick={handleAddToQueue}>Add</button>
            <button onClick={navToLikedRecipes}>Like</button>
          </div>
        </div>
      </div>
    );
}

export default RecipePage;