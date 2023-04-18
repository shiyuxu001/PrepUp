import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import '../styles/Browse.css';
import NavBar from "../components/NavBar";
import axios from 'axios';
import RecipesCard from '../components/RecipesCard';
import CatCards from '../components/catCards';


function Browse( {name, username} ) {

    const [recipes, setRecipes] = useState([]);
    const [search, setSearch] = useState("");
    const [isActivelySearching, setIsActivelySearching] = useState(false);
    const [cat, setCat] = useState([]);
    const [initRec, setInitRec] = useState([])
    const [hasLoaded, setHasLoaded] = useState(false)
    const [recipesLoaded, setRecipesLoaded] = useState(false)
    let navigate = useNavigate();

    const searchMeal=(evt)=>{
        if (evt.key == "Enter")
        {
            fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`).then(res=>res.json()).then(data=> {setRecipes(data.meals);console.log(data.meals)})
        }

        setIsActivelySearching(true)
        setHasLoaded(true);
    }
    
    useEffect(() => {
        // initial load
        
        axios.get(`https://www.themealdb.com/api/json/v1/1/categories.php`)
        .then(response => {
            setCat(response.data.categories);
        })
        .catch(error => {
            console.error('failed fetching categories from theMealDB');
        });

        //strCategory and strCategoryThumb is the one needed
        console.log('categories:')
        console.log(cat)

        let newRecipes = [];
        Promise.all(
            Array.from({ length: 5 }, () =>
              axios.get(`https://www.themealdb.com/api/json/v1/1/random.php`)
            )
          )
            .then((responses) => {
              const newRecipes = responses.map((response) => response.data);
              setInitRec(newRecipes);
              console.log('5 recipes:');
              console.log(initRec);
              setRecipesLoaded(true);
            })
            .catch((error) => {
              console.error('failed fetching recipes from theMealDB', error);
            });
            
        setInitRec(newRecipes)
        console.log('5 recipes:')
        console.log(initRec)
        console.log("New Recipes: " + newRecipes.length)

        setHasLoaded(true)

      }, []);



      
    return (
        <div>
            <NavBar username={username} setMyRecipes={false} setMyCollections={false} />

            <p className="greeting-header">Hi, {name}!</p>


            <div className="search-box">
                <input type="search" className="collection-name-input" placeholder="Search for a recipe" onChange={(e)=>setSearch(e.target.value)} value={search} onKeyPress={searchMeal}/>
                {/* <FontAwesomeIcon icon="fa-solid fa-filter" /> */}
            </div>

            {hasLoaded && !isActivelySearching ? (
                <div>
                    <h3 className="section-header">Newest Recipes</h3>
                    {console.log('loading recipes in return()')}
                    {console.log(initRec)}
                    {console.log(recipesLoaded)}

                    {/* Make this into a carousel */}
                    <div className="new-recipe-cards-container">
                        <div className="new-recipe-cards">
                            {recipesLoaded ? 
                                (
                                    initRec.map((item) => ( 
                                    <RecipesCard 
                                        title = {item['meals'][0]['strMeal']}  
                                        imgURL = {item['meals'][0]['strMealThumb']}
                                        username= {username} 
                                        mealId = {item['meals'][0]['idMeal']} 
                               
                                        />
                                    )) 
                                ) 
                                : 
                                (
                                    <div className="loading-text">
                                        <p>loading...</p>
                                    </div>
                                )
                            }   
                        </div>
                    </div>

                    <h3 className="section-header">Top Categories</h3>
                    {console.log('loading categories')}
                    {console.log(cat)}

                    {
                        cat.map((item) => (
                            <CatCards 
                                username = {username}
                                categoryName={item['strCategory']}
                                imgURL = {item['strCategoryThumb']} />
                        ))
                    }

                </div>
                    
            ) : ''
            }

            {hasLoaded ? '' : 
                (
                    <div> loading...
                        {console.log('currently loading')}
                    </div>
                )
            }

            {isActivelySearching ? 
                (<div>
                    <h3 className='results-header'>Results</h3>
                    <div>
                        {
                        recipes.map((item) => ( 
                        <RecipesCard 
                            title = {item['strMeal']} 
                            imgURL = {item['strMealThumb']}
                            username = {username}
                            mealId = {item['idMeal']}
                            />
                        ))}
                    </div>
                </div>)
                : ''
            }
        </div>
    )
}

export default Browse;