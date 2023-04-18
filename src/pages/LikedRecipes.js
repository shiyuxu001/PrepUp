import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import NavBar from "../components/NavBar";
import axios from 'axios';


import '../styles/LikedRecipes.css';
import RecipesCard from '../components/RecipesCard';


function LikedRecipes( {username} ) {
    let navigate = useNavigate();

    const [liked , setLiked] = useState('')
    const [list , setList] = useState([])

    const [key, setKey] = useState('')
    const [recipesLoaded, setRecipeLoaded] = useState(false)
    const [listLoaded, setListLoaded] = useState(false)


    const databaseURL = "https://prepup-41491-default-rtdb.firebaseio.com/";

    // const removeLiked = () => {

    // }

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
                setRecipeLoaded(true)
            } else {
                console.log('response :' , response)
                console.log('response null flop')
            }
        }) 
    }

    const populateLikedRecipes = () => {
        const parsed = liked.split(' ')
        // let recipeList = []
        for (let i = 0; i < parsed.length; i++) {
            let recipe = parsed[i]
            recipe = recipe.replace(/\s/g, '')
            if (recipe.length) {
                axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipe}`)
                .then(response => {
                    // recipeList.push(response.data.meals)
                    // setList(oldArray => [...oldArray, response.data.meals]);
                    // console.log('recipe retrieved :', response.data.meals)
                    setList((prevList) => [...prevList, response.data.meals]);
                })
            }
        }
        // for (l)
        // setList(oldArray => [...oldArray, recipeList]);
        setListLoaded(true)
    }

    const navToBrowse = () => {
        console.log('button pressed')
        navigate(`/PrepUp/${username}/browse`);
    }

    useEffect(() => {    
        getLiked();
    }, []);

    useEffect(() => {    
        if ( recipesLoaded  ) {
            populateLikedRecipes();
        }
    }, [liked]);

    useEffect(() => {    
        if ( listLoaded  ) {
            console.log('final recipe list: ', list)
        }
    }, [list]);


    
    return (
        <div>
            <NavBar username={username} setMyRecipes={true} setMyCollections={false} />

            <h2 className="header-title">My Recipes</h2>

            {/* <div className="input-container">
                <input className="saved-recipe-input" type="text" placeholder="Search" onChange={handleNameChange}/>
            </div> */}

            <div className="add-button-container">
                <button className="add-button" onClick={navToBrowse}>Browse more recipes!</button>
            </div>

            {recipesLoaded && liked.length > 0 &&
                    <div className="my-liked-recipe-cards">
                        {listLoaded && list.length > 0 &&
                            (
                                list.map((item) => ( 
                                <RecipesCard 
                                    title = {item[0]['strMeal']}  
                                    imgURL = {item[0]['strMealThumb']}
                                    username= {username} 
                                    mealId = {item[0]['idMeal']} 
                                    />
                                )) 
                            ) 
                        }   
                    </div>
            }


                {recipesLoaded && liked.length == 0 &&
                    <h1>No Liked Recipes</h1>
                }
             {/* <div className='liked-recipe-container'>
            //     <div className='recipe-img-container'>
            //     <img className="liked-recipe-img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkMfn_L7UIPDX1rlx_J_f0ypeTtnuZSd73CQ&usqp=CAU" alt="Chicken Katsu" />
            //     </div>     

            //     <div className='recipe-info'>
            //         <h4 className='rp-recipe-name'> Chicken Katsu</h4>
            //         <p> Total Time: 50 min</p>
            //         <div className="recipe-info-footer">
            //             <button className='like-btn'>Liked</button>
            //         </div>
            //     </div> 
            // </div>

            // <div className='liked-recipe-container'>
            //     <div className='recipe-img-container'>
            //     <img className="liked-recipe-img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTalsT91fYd5yEucMTRc65oeAKBrFXrpbRQ1w&usqp=CAU" alt="Chocolate Cake" />
            //     </div>     

            //     <div className='recipe-info'>
            //         <h4 className='rp-recipe-name'> Chocolate Cake</h4>
            //         <p> Total Time: 50 min</p>
            //         <div className="recipe-info-footer">
            //             <button className='like-btn'>Liked</button>
            //         </div>
            //     </div> 
            // </div> */}
        

        </div>
    )
}

export default LikedRecipes;