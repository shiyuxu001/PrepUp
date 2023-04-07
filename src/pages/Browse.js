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




    const navToProfile = () => {
        navigate(`/PrepUp/${username}/profile`);
    }

    const navToRecipePage = () => {
        navigate(`/PrepUp/${username}/recipePage`);
    }

    const navToLikedRecipes = () => {
        navigate(`/PrepUp/${username}/likedRecipes`)
    }

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

        // // Doesn't work in the for-loop for some reason
        // //
        // setRecipesLoaded(false)
        
        // axios.get(`https://www.themealdb.com/api/json/v1/1/random.php`)
        // .then(response => {
        //     newRecipes.push(response.data)
        //     setRecipesLoaded(true) //this sucks lol
            
        // })
        // .catch(error => {
        //     console.error('failed fetching categories from theMealDB');
        // });
            
        setInitRec(newRecipes)
        console.log('5 recipes:')
        console.log(initRec)
        console.log("New Recipes: " + newRecipes.length)

        setHasLoaded(true)

      }, []);



      
    return (
        <div>
            <NavBar />
            {/* <div className="header">
                    <button className="header-item">Menu</button>
                    <h1 className="logo header-item">PrepUp</h1>
                    <button className="header-item" onClick={navToProfile}>Profile</button>
                
            </div> */}

            <p className="greeting-header">Hi, {name}!</p>


            <div className="searchBox">
                <input type="search" className="collection-name-input" placeholder="Search for a recipe" onChange={(e)=>setSearch(e.target.value)} value={search} onKeyPress={searchMeal}/>
                {/* <FontAwesomeIcon icon="fa-solid fa-filter" /> */}

            </div>

            {hasLoaded && !isActivelySearching ? (
                <div>
                    <h3 className="section-header">Newest Recipes</h3>
                    {console.log('loading recipes in return()')}
                    {console.log(initRec)}
                    {console.log(recipesLoaded)}
                    <div>
                    {recipesLoaded? (
                        
                        initRec.map((item) => ( 
                        <RecipesCard 
                            title = {item['meals'][0]['strMeal']}  
                            imgURL = {item['meals'][0]['strMealThumb']}
                            username= {username} 
                            mealId = {item['meals'][0]['idMeal']} 
                            />
                        )) ): (<div>loading</div>)}   
                    </div>

                    <h3 className="section-header">Top Categories</h3>
                    {console.log('loading categories')}
                    {console.log(cat)}
                    {cat.map((item) => (
                            <CatCards 
                                title={item['strCategory']}
                                imgURL = {item['strCategoryThumb']} />
                    ))}

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