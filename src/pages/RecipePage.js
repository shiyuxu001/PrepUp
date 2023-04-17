import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import '../styles/RecipePage.css';


function RecipePage({username}) {
  let {mealId}= useParams()

  let navigate = useNavigate();
  const[recipe,setRecipe]=useState();
  const [recipeLoaded, setRecipeLoaded] = useState(false)
  const [liked, setLiked] = useState()
  const [key, setKey] = useState('')

  const databaseURL = "https://prepup-41491-default-rtdb.firebaseio.com/";


    const getRecipe= ()=>{
      axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
      .then(response => {
          console.log('recipe: ', response.data.meals)
          setRecipe(response.data.meals);
          setRecipeLoaded(true);
      })
  }

    const handleProfile = () => {
      navigate(`/PrepUp/${username}/profile`);
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
      console.log('liked button clicked')
      addToLiked();
      navigate(`/PrepUp/${username}/likedRecipes`, {username: username});
  }

  const getLiked = () => {
      fetch(`${databaseURL}/${username}/.json`)
      .then((response) => {
          if (response.status == 200) {
              return response.json();
          } else {
              console.log(' status flop')
          }
      })
      .then((response) => {
          if (response) {
              const keys = Object.keys(response);
              setKey(keys);
              const dataPoints = keys
                  .map((k) => response[k]);
              const fetchedLiked = dataPoints[0]['likedRecipes'];
              console.log('fetched liked recipes: ', fetchedLiked)
              setLiked(fetchedLiked)
          } else {
              console.log('response :' , response)
              console.log('response null flop')
          }
      }) 
  }

  const addToLiked = () => {
      const likedRep = liked + ' ' + mealId
      console.log('adding to liked')
      const dict = {
          likedRecipes: likedRep
      }
      fetch(`${databaseURL}/${username}/${key}/.json`, {
          method: "PATCH",
          body: JSON.stringify(dict)
      }).then((response) => {
          if (response.status !== 200) {
              console.log(' status flop in upload')
          } 
          else {
              console.log('updated Liked Recipes: ', likedRep)
              return;
          }
      })
  }
  useEffect(() => {    
      getLiked();
  }, []);

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

    function computeTotalTime() {
      let totalTime = 0
      const instructions = recipe[0]['strInstructions'].split(" ")
      for (let i = 0; i < instructions.length; i++) {
        if (instructions[i] === 'hr' || instructions[i].includes('hour') || instructions[i] === 'hrs') {
          let intFound = instructions[i - 1]
          if (intFound.includes("-")) {
            intFound = intFound.split("-")
            intFound = intFound[1]
          }
          console.log('hour found: ', intFound)
          let int = parseInt(intFound)
          if (!isNaN(int)) {
            int = int * 60
            totalTime += int
          }
        }
        if (instructions[i].includes("min")) {
          let intFound = instructions[i - 1]
          if (intFound.includes("-")) {
            intFound = intFound.split("-")
            intFound = intFound[1]
          }
          console.log('integer found: ', intFound)
          let int = parseInt(intFound)
          if (!isNaN(int)) {
            totalTime += int
          }
          
        }
      }
      console.log('total time: ', totalTime)
      if (totalTime == 0) {
        totalTime = 20
      }
      return (
        <p> Total Time: ~ {totalTime} minutes</p>
      )
    }
  
      function renderIngredients(){
        // parse ingridents 
        const ingList = []

        for(let i=1; i <= 20; i++ ) {
          if(recipe[0][`strMeasure${i}`] && recipe[0][`strIngredient${i}`]) {
              const ingredient = {id: i, name: recipe[0][`strMeasure${i}`] + " " + recipe[0][`strIngredient${i}`], checked: false }
              // console.log('single ing: ', ingredient)
              ingList.push(ingredient)
              // setIngredients(oldIngredients => [...oldIngredients, ingredient]);
          }
        }
        // console.log('ingredients: ', ingList)
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



      useEffect(() => {    
        getRecipe();
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
          <button className='user-btn' onClick={handleProfile}>Profile</button>
        </div>
  
       {recipeLoaded && recipe.length > 0 &&
        <div className='recipe-container'>
          <div className='recipe-header'>
          <h1 className='rp-recipe-name'> {recipe[0]['strMeal']}</h1>
            {computeTotalTime()}
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