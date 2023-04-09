import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import NavBar from "../components/NavBar";

import '../styles/LikedRecipes.css';

function LikedRecipes( {username} ) {
    let navigate = useNavigate();

    const [collectionName, setCollectionName] = useState('');

    const handleNameChange = (e) => {
        setCollectionName(e.target.value);
    }

    const handleBackButton = () => {
        navigate(`/PrepUp/${username}/browse`);
    }
    
    return (
        <div>
            <NavBar username={username} setMyRecipes={true} setMyCollections={false} />

            <h2>My Recipes</h2>

            <div className="input-container">
                <input className="saved-recipe-input" type="text" placeholder="Search" onChange={handleNameChange}/>
            </div>

            <div className='liked-recipe-container'>
                <div className='recipe-img-container'>
                <img className="liked-recipe-img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkMfn_L7UIPDX1rlx_J_f0ypeTtnuZSd73CQ&usqp=CAU" alt="Chicken Katsu" />
                </div>     

                <div className='recipe-info'>
                    <h4 className='rp-recipe-name'> Chicken Katsu</h4>
                    <p> Total Time: 50 min</p>
                    <div className="recipe-info-footer">
                        <button className='like-btn'>Liked</button>
                    </div>
                </div> 
            </div>

            <div className='liked-recipe-container'>
                <div className='recipe-img-container'>
                <img className="liked-recipe-img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTalsT91fYd5yEucMTRc65oeAKBrFXrpbRQ1w&usqp=CAU" alt="Chocolate Cake" />
                </div>     

                <div className='recipe-info'>
                    <h4 className='rp-recipe-name'> Chocolate Cake</h4>
                    <p> Total Time: 50 min</p>
                    <div className="recipe-info-footer">
                        <button className='like-btn'>Liked</button>
                    </div>
                </div> 
            </div>

            <div className="add-button-container">
                <button className="add-button">Add Recipe</button>
            </div>
        </div>
    )
}

export default LikedRecipes;