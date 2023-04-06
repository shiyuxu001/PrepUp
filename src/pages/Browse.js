import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import '../styles/Browse.css';
import NavBar from "../components/NavBar";
import axios from 'axios';
import RecipesCard from '../components/RecipesCard';
import CatCards from '../components/catCards';


function Browse() {
    const [recipeName, setRecipeName] = useState('');
    const [cat, setCat] = useState([]);
    const [initRec, setInitRec] = useState([])
    const [loaded, setLoaded] = useState(false)
    let navigate = useNavigate();

    const handleNameChange = (e) => {
        setRecipeName(e.target.value);
    }

    const navToProfile = () => {
        navigate("/profile");
    }

    const navToRecipePage = () => {
        navigate("/recipePage");
    }

    const navToLikedRecipes = () => {
        navigate("/likedRecipe")
    }

    // const catCards = cat.map((item) => (        
    //     <CatCards title = {item['strCategory']} imgURL = {item['strCategoryThumb']} />

    //   ));


    
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

            <div className="input-container">
                <input className="collection-name-input" type="text" placeholder="Search" onChange={handleNameChange}/>
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
        </div>
    )
}

export default Browse;