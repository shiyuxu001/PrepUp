import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

import '../styles/LikedRecipes.css';

function LikedRecipes() {
    let navigate = useNavigate();

    const [collectionName, setCollectionName] = useState('');

    const handleNameChange = (e) => {
        setCollectionName(e.target.value);
    }

    const handleBackButton = () => {
        navigate("/");
      }
    
    return (
        <div>

            <div className='app-header'>
            <button className='back-btn' onClick={handleBackButton}> &lt; Back </button>
            <h1>PREP UP</h1>
            <button className='user-btn' >Profile</button>
            </div>

            <h2>Saved Recipes</h2>

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