import { useState } from 'react';
import '../styles/Browse.css';


function Browse() {
    const [recipeName, setRecipeName] = useState('');

    const handleNameChange = (e) => {
        setRecipeName(e.target.value);
    }
    
    return (
        <div>
            <div className="header">
                    <button className="header-item">Menu</button>
                    <h1 className="logo header-item">PrepUp</h1>
                    <button className="header-item">Profile</button>
            </div>

            <div className="input-container">
                <input className="collection-name-input" type="text" placeholder="Search" onChange={handleNameChange}/>
                {/* <FontAwesomeIcon icon="fa-solid fa-filter" /> */}
            </div>
            <h3>Newest Recipes</h3>
            <div className="recipes-container">
                <div className="recipe">
                    <img className="recipe-img" src="https://img.hellofresh.com/c_fit,f_auto,fl_lossy,h_500,q_auto,w_1900/hellofresh_s3/image/vegan-chickpea-coconut-curry-d528b3ae.jpg" alt="Chickpea Curry" />
                    <div>
                        <h2 className="recipe-name">Chickpea Curry</h2>
                        <p className="recipe-total-header">TOTAL</p>
                        <p className="recipe-total-time">20 min</p>
                        <div className="recipe-buttons">
                            <button>Queue</button>
                            <button>Add</button>
                            <button>Like</button>
                        </div>
                    </div>
                </div>      
            </div>
            <div className="recipes-container">
                <div className="recipe">
                    <img className="recipe-img" src="https://plantbasedonabudget.com/wp-content/uploads/2014/09/Vegan-French-Toast-Plant-Based-on-a-Budget-1-2.jpg" alt="French Toast" />
                    <div>
                        <h2 className="recipe-name">French Toast</h2>
                        <p className="recipe-total-header">TOTAL</p>
                        <p className="recipe-total-time">10 min</p>
                        <div className="recipe-buttons">
                            <button>Queue</button>
                            <button>Add</button>
                            <button>Like</button>
                        </div>
                    </div>
                </div>       
            </div>
            <h3>Top Categories</h3>

            <div className="category-container">
                <div className="category">
                    <div>
                        <h2 className="category-name">30 Minute Meals</h2>
                    </div>
                    <img className="category-img" src="https://plantbasedonabudget.com/wp-content/uploads/2014/09/Vegan-French-Toast-Plant-Based-on-a-Budget-1-2.jpg" alt="30 Minute Meal" />
                </div>       
            </div>

            <div className="category-container">
                <div className="category">
                    <h2 className="category-name">Desserts</h2>
                    <img className="category-img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTalsT91fYd5yEucMTRc65oeAKBrFXrpbRQ1w&usqp=CAU" alt="Chocolate Cake" />

                </div>  
                     
            </div>
            

        </div>
    )
}

export default Browse;