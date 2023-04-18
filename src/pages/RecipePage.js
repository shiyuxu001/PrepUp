import { useState, useEffect } from 'react';
import { useNavigate, useParams , useLocation } from 'react-router-dom'
import axios from 'axios';
import '../styles/RecipePage.css';
import NavBar from '../components/NavBar';

function RecipePage({username}) {
  let {mealId}= useParams()

  let navigate = useNavigate();
  let time = 0
  const[recipe,setRecipe]=useState();
  const [recipeLoaded, setRecipeLoaded] = useState(false)
  const [liked, setLiked] = useState()
  const [patch, setPatchComplete] = useState()
  const [key, setKey] = useState('')
  const [wc, setWC] = useState('')

  const location = useLocation();


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

    const addtoWC = () => {

    }

    const getWC = () => {

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
                const fetched = dataPoints[0]['wc'];
                console.log('fetched working collection: ', fetched)
                setWC(fetched)
            } else {
                console.log('response :' , response)
                console.log('response null flop')
            }
        }) 
    }

    const handleAddToQueue = () => {
      console.log('sending recipe;')
      console.log(recipe[0]['strMealThumb'])
      //add new entry into wc
      if(wc.includes(mealId.toString())){
        console.log('wc already contaains recipe')
      }else{
        const newWc = mealId + ';' + wc
        const dict = {
          wc: newWc
        }

        fetch(`${databaseURL}/${username}/${key}/.json`, {
          method: "PATCH",
          body: JSON.stringify(dict)
        }).then((response) => {
          if (response) {
              if (response.status !== 200) {
                  console.log(' status flop in upload')
                  alert("Unable to add recipe to working collection!")
              } 
              else {
                  console.log('updated working collection: ', dict)
                  return;
              }
          } else {
              alert("Unable to add recipe to working collection!")
          }
        })
      }

      
      
    
      navigate(`/PrepUp/${username}/workingCollection`,{
       
      });
    }

    
    const handleAddToSavedCollection = () => {
      navigate(`/PrepUp/${username}/savedCollections`);
    }

    const handleBackButton = () => {
      navigate(`/PrepUp/${username}/browse`);
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
    console.log(typeof(liked))

    if(liked.includes(mealId.toString())){
      console.log('id already in working collection')
    }else{

      const likedRep = liked + ' ' + mealId
      console.log('adding new recipe to wc')
      const dict = {
          likedRecipes: likedRep
      }
      fetch(`${databaseURL}/${username}/${key}/.json`, {
          method: "PATCH",
          body: JSON.stringify(dict)
      }).then((response) => {
          if (response) {
            if (response.status !== 200) {
              alert("Unable to add recipe to liked reciped!")
              console.log(' status flop in upload')
          } 
          else {
              console.log('updated Liked Recipes: ', likedRep)
              alert(recipe[0]['strMeal'] + 'added to your liked recipes!')
              setPatchComplete(true)
              return;
            }
          } else {
            alert("Unable to add recipe to liked reciped!")
          }

      })

    }
      
  }
  useEffect(() => {    
      getLiked();
      getWC();
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
        if (instructions[i] === 'hr' || instructions[i].includes('hour') || instructions[i] === 'hrs' 
        || instructions[i] === 'hrs.' || instructions[i] === 'hr.') {
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
      time = totalTime
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
          <NavBar username={username} setMyRecipes={false} setMyCollections={false} />
          
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
            <button onClick={addToLiked}>Like</button>
          </div>
        </div>
        }
      </div>
    );
}

export default RecipePage;