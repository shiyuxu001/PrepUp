import { useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom'
import NavBar from "../components/NavBar";
import axios from 'axios';

import '../styles/SavedCollection.css';

function NewCollection( {username} ) {
    let navigate = useNavigate();

    const [collectionName, setCollectionName] = useState('');
    const [recipe,setRecipe] = useState();
    const [key, setKey] = useState('')
    const [collectionKey, setCollectionKey] = useState('')
    const [collectionAdded, setCollectionAdded] = useState('')


    const handleNameChange = (e) => {
        setCollectionName(e.target.value);
    }

    const addRecipeToCollection = () => {
        const dict = {
            collectionName: collectionName
        }
        fetch(`${databaseURL}/${username}/${key}/savedCollections/${collectionKey}/${collectionName}.json`, {
            method: "PATCH",
            body: JSON.stringify(dict)
        }).then((response) => {
            let parsedResponse = response.json();
            console.log('saved collection response: ', parsedResponse)
            const keys = Object.keys(parsedResponse);
            const dataPoints = keys
                .map((k) => parsedResponse[k]);
            // const fetchedLiked = dataPoints[0]['likedRecipes'];
            console.log('fetched datapoints: ', dataPoints)

        })
    }

    const getCollectionKey = () => {
        fetch(`${databaseURL}/${username}/${key}/savedCollections/.json`)
        .then((response) => {
            if (response.status == 200) {
                return response.json();
            } else {
                console.log(' status flop')
            }
        })
        .then((response) => {
            if (response) {
                let storedIndex = 0
                const keys = Object.keys(response);
                const dataPoints = keys
                .map((k) => response[k]);
                for (let i = 0 ; i < dataPoints.length; i++) {
                    if (dataPoints[i]['collectionName'] === collectionName) {
                        storedIndex = i
                    }
                }
            const fetchedKey = keys[storedIndex];
            console.log(fetchedKey)
            } else {
                console.log('response :' , response)
                console.log('response null flop')
            }
        }) 
    }

    const addNewCollection = () => {
        const dict = {
            collectionName: collectionName
        }
        fetch(`${databaseURL}/${username}/${key}/savedCollections/.json`, {
            method: "POST",
            body: JSON.stringify(dict)
        }).then((response) => {
            let parsedResponse = response.json();
            console.log('saved collection response: ', parsedResponse)
            const keys = Object.keys(parsedResponse);
            const dataPoints = keys
                .map((k) => parsedResponse[k]);
            // const fetchedLiked = dataPoints[0]['likedRecipes'];
            console.log('fetched datapoints: ', dataPoints)
            

        })
    }

    // TODO search function

    const getSavedCollections = () => {
        fetch(`${databaseURL}/${username}/${key}/savedCollections.json`)
        .then((response) => {
            let parsedResponse = response.json();
            console.log('saved collection response: ', parsedResponse)
            const keys = Object.keys(parsedResponse);
            const dataPoints = keys
                .map((k) => parsedResponse[k]);
            // const fetchedLiked = dataPoints[0]['likedRecipes'];
            console.log('fetched datapoints: ', dataPoints)

        })
    }

    const databaseURL = "https://prepup-41491-default-rtdb.firebaseio.com/";

    const getUserKey = () => {
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
            } else {
                console.log('response :' , response)
                console.log('response null flop')
            }
        }) 
    }

    useEffect(() => {    
        getUserKey();
    }, []);

    useEffect(() => {   
        if (key.length > 0) {
            getSavedCollections();
        } 
    }, [key]);
    
    return (
        <div>

            <NavBar username={username} setMyRecipes={false} setMyCollections={true} />

            <div className="sub-header-container">
                <h2 className="collection-page-title">Create A New Collection</h2>
            </div>

            <div className="input-container">
                <input className="collection-name-input" type="text" placeholder="Collection name" onChange={(e)=>setCollectionName(e.target.value)} value={collectionName} onKeyPress={addNewCollection}/>
            </div>

            {}

            <div className="all-collections">
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
            </div>


            <div className="add-button-container">
                <button className="add-button" onClick={addRecipeToCollection}>Add Recipe to {collectionName}</button>
            </div>
        </div>
    )
}

export default NewCollection;