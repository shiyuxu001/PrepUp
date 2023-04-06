import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import '../styles/Browse.css';
import NavBar from "../components/NavBar";
import axios from 'axios';
import RecipesCard from '../components/RecipesCard';
import CatCards from '../components/catCards';


function Browse( {name, username} ) {
    const [recipes, setRecipes] = useState([]);
    const [search,setSearch]=useState("");
    const [cat, setCat] = useState([]);
    const [initRec, setInitRec] = useState([])
    const [loaded, setLoaded] = useState(false)
    let navigate = useNavigate();


    const navToProfile = () => {
        navigate(`/${username}/profile`);
    }

    const navToRecipePage = () => {
        navigate(`/${username}/recipePage`);
    }

    const navToLikedRecipes = () => {
        navigate(`/${username}/likedRecipes`)
    }

    const searchMeal=(evt)=>{
        if(evt.key=="Enter")
        {
            fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`).then(res=>res.json()).then(data=> {setRecipes(data.meals);console.log(data.meals)})
        }
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

      let newRecipes = []
        for(let i = 0; i < 5; i +=1){
            axios.get(`https://www.themealdb.com/api/json/v1/1/random.php`)
            .then(response => {
                newRecipes.push(response.data)
            })
            .catch(error => {
                console.error('failed fetching categories from theMealDB');
            });
        }
        setInitRec(newRecipes)
        console.log('5 recipes:')
        console.log(initRec)


      setLoaded(true)

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
                <input type="search" className="collection-name-input" placeholder="Browse Recipes" onChange={(e)=>setSearch(e.target.value)} value={search} onKeyPress={searchMeal}/>
                {/* <FontAwesomeIcon icon="fa-solid fa-filter" /> */}

            </div>

            {loaded?(
                <div>
                    <h3>Newest Recipes</h3>
                    {console.log('loading recipes')}
                    {console.log(initRec)}
                    <div>
                        {
                        initRec.map((item) => ( 
                        <RecipesCard 
                            title = {item['meals'][0]['strMeal']}  
                            imgURL = {item['meals'][0]['strMealThumb']} />
                        ))}
                    </div>
                    <h3>Top Categories</h3>
                    {console.log('loading categories')}
                    {console.log(cat)}
                    {
                        cat.map((item) => (
                            <CatCards 
                                title={item['strCategory']}
                                imgURL = {item['strCategoryThumb']} />
                            ))
                    }

                </div>
                    
            ) : (
                <div> loading...
                    {console.log('currently loading')}
                </div>
            )}

            <h3>{search} Recipes</h3>
                    <div>
                        {
                        recipes.map((item) => ( 
                        <RecipesCard 
                            title = {item['strMeal']}  
                            imgURL = {item['strMealThumb']}
                            username = {username}
                            />
                        ))}
                    </div>
        </div>
    )
}

export default Browse;