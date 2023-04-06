import { useState } from 'react';
import '../styles/SavedCollection.css';

function SavedCollections({username}) {
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
                <h2 className="collection-page-title">Collections</h2>

            </div>
            <div className="input-container">
                <input className="collection-name-input" type="text" placeholder="Search" onChange={handleNameChange}/>
            </div>

            <div className="collection-container">
                <div className="collection">
                    <img className="collection-img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkMfn_L7UIPDX1rlx_J_f0ypeTtnuZSd73CQ&usqp=CAU" alt="30 minute Dinner"/>
                    <h2 className="collection-name">30min Dinner</h2>
                </div>      
            </div>
            <div className="collection-container">
                <div className="collection">
                    <img className="collection-img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJ1ON_tJJB8MrxwHqdUpg1D6JiIJ-a414Jjg&usqp=CAU" alt="Thanksgiving Dinner Collection" />
                    <h2 className="collection-name">Thanksgiving</h2>
                </div>       
            </div>
            <div className="collection-container">
                <div className="collection">
                    <img className="collection-img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0TV8Mc7nmkNIQYjia0fzhVjUenIxK6kNS-g&usqp=CAU" alt="Curry Dinner" />
                    <h2 className="collection-name">Curry Dinner</h2>
                </div>       
            </div>


            <div className="add-button-container">
                <button className="add-button">Add Collection</button>
            </div>
        </div>
    )
}

export default SavedCollections;