import { useState } from 'react';
import '../styles/WorkingCollection.css';

function WorkingCollection() {
    const [collectionName, setCollectionName] = useState('');

    const handleNameChange = (e) => {
        setCollectionName(e.target.value);
    }
    
    return (
        <div>
            <div className="header">
                    <button className="header-item">Menu</button>
                    <h1 className="logo header-item">PrepUp</h1>
                    <button className="header-item">Profile</button>
            </div>
            <div className="sub-header-container">
                <button className="back-button">Back</button>
                <button className="cook-button">Cook</button>
            </div>
            <div className="input-container">
                <input className="collection-name-input" type="text" placeholder="Collection Name" onChange={handleNameChange}/>
            </div>
            <div className="recipes-container">
                <div className="recipe">
                    <img className="chickpea-curry-img" src="https://img.hellofresh.com/c_fit,f_auto,fl_lossy,h_500,q_auto,w_1900/hellofresh_s3/image/vegan-chickpea-coconut-curry-d528b3ae.jpg" alt="Chickpea Curry" />
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
                    <img className="chickpea-curry-img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTalsT91fYd5yEucMTRc65oeAKBrFXrpbRQ1w&usqp=CAU" alt="Chocolate Cake" />
                    <div>
                        <h2 className="recipe-name">Chocolate Cake</h2>
                        <p className="recipe-total-header">TOTAL</p>
                        <p className="recipe-total-time">45 min</p>
                        <div className="recipe-buttons">
                            <button>Queue</button>
                            <button>Add</button>
                            <button>Like</button>
                        </div>
                    </div>
                </div>       
            </div>
            <div className="add-button-container">
                <button className="add-button">Add Recipe</button>
            </div>
        </div>
    )
}

export default WorkingCollection;