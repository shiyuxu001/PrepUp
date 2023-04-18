import { useState, useEffect } from 'react';
import { useNavigate , useLocation } from 'react-router-dom'
import '../styles/WorkingCollection.css';
import NavBar from '../components/NavBar';

function WorkingCollection({username}  ) {
    const [collectionName, setCollectionName] = useState('');
    const [key, setKey] = useState('')
    const [wc, setWC] = useState('')
    const [loaded, setLoaded] = useState(false)

    
    const location = useLocation();
    // const username = location.state.username
    // const mealID = location.state.mealId
    // const mealName = location.state.mealName
    // const mealTime = location.state.mealTime
    // const mealImg = location.state.mealImg
    const databaseURL = "https://prepup-41491-default-rtdb.firebaseio.com/";


    //get from firebase
    // console.log(wc)

    // console.log(username+ ',' + mealID + ',' + mealName + ',' + mealTime + ',' + mealImg)
    
    let navigate = useNavigate();

    const getWC = () => {

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
                  const fetched = dataPoints[0]['wc'];
                  console.log('fetched working collection: ', fetched)
                  setWC(fetched)
              } else {
                  console.log('response :' , response)
                  console.log('response null flop')
              }
          }) 
      }

    const handleNameChange = (e) => {
        setCollectionName(e.target.value);
    }

    const generateSteps = () => {
        navigate(`/PrepUp/${username}/steps`, {
        });
    }

    useEffect(() => {
        // initial load
        getWC();
        setLoaded(true)
      }, []);
    
    return (
        <div>
            <NavBar username={username} setMyRecipes={false} setMyCollections={false} />

            <div className="sub-header-container">
                <button className="back-button">Back</button>
                <button className="cook-button" onClick={generateSteps}>Cook</button>
            </div>
            <div className="input-container">
                <input className="collection-name-input" type="text" placeholder="Collection Name" onChange={handleNameChange}/>
            </div>
            {/* <div className="recipes-container">
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
            </div> */}
            <div className="recipes-container">
                <div className="recipe">
                    {/* <img className="chickpea-curry-img" src={mealImg} alt={mealName} /> */}
                    {/* <div>
                        <h2 className="recipe-name">{mealName}</h2>
                        <p className="recipe-total-header">TOTAL</p>
                        <p className="recipe-total-time">{mealTime} mins</p>
                        
                    </div> */}
                </div>       
            </div>
            <div className="add-button-container">
                <button className="add-button">Add Recipe</button>
            </div>
        </div>
    )
}

export default WorkingCollection;