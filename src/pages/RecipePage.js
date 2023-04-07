import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import '../styles/RecipePage.css';


function RecipePage( {username, recipe} ) {
    console.log(recipe)
    // let instructions = recipe.instructions?.split('\r\n');
    // instructions = instructions.filter(instruction => instruction.length > 1);

    let navigate = useNavigate();

    const handleAddToQueue = () => {
      navigate(`/PrepUp/${username}/workingCollection`);
    }

    const handleBackButton = () => {
      navigate(`/PrepUp/${username}/browse`);
    }

    const navToLikedRecipes = () => {
      navigate(`/PrepUp/${username}/likedRecipes`)
    }


    const [ingredients, setIngredients] = useState([
      { id: 1, name: 'Flour', checked: false },
      { id: 2, name: 'Sugar', checked: false },
      { id: 3, name: 'Eggs', checked: false },
      // add more ingredients as needed
    ])
  
    const [steps, setSteps] = useState([
      { id: 1, name: 'Preheat oven to 350º F. Prepare two 9-inch cake pans.' },
      { id: 2, name: 'Add flour, sugar, cocoa, baking powder, baking soda, salt and espresso powder to a large bowl.' },
      { id: 3, name: 'Add milk, vegetable oil, eggs, and vanilla to flour mixture and mix together on medium speed until well combined.' },
      // add more steps as needed
    ])
  
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
  
      function renderSteps(){
        return (
          <ol>
        {steps.map(step => (
          <li key={step.id}>
            <label>
              <span>{step.name}</span>
            </label>
          </li>
        ))}
      </ol>
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
            <h1 className='rp-recipe-name'> Chocolate Cake</h1>
            <p> Total Time: 50 min</p>
            <img className="recipe-img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTalsT91fYd5yEucMTRc65oeAKBrFXrpbRQ1w&usqp=CAU" alt="Chocolate Cake" />
          </div>
  
          <div className='recipe-ingredients'>
            <h2>Ingredients</h2>
            {renderIngredients()}
          </div>
  
          <div className='recipe-steps'>
            <h2>Instructions</h2>
            {renderSteps()}
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