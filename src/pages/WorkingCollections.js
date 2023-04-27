import { useState, useEffect } from 'react';
import { useNavigate , useLocation } from 'react-router-dom'
import '../styles/WorkingCollection.css';
import NavBar from '../components/NavBar';

import RecipesCard from '../components/RecipesCard';
import axios from 'axios';
import { Row } from 'react-bootstrap';


function WorkingCollection({username}  ) {
    const [collectionName, setCollectionName] = useState('');
    const [key, setKey] = useState('')

    const [wc, setWC] = useState([])

    const [loaded, setLoaded] = useState(false)
    const [infos, setInfos] = useState([])
    const [infosloaded, setInfosLoaded] = useState(false)

    const databaseURL = "https://prepup-41491-default-rtdb.firebaseio.com/";

    
    let navigate = useNavigate();

    const navToBrowse = () => {
        navigate(`/PrepUp/${username}/browse`);
    }

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

                  const current_wc = fetched.split(";")
                  setWC(current_wc)

              } else {
                  console.log('response :' , response)
                  console.log('response null flop')
              }
          }) 
      }


       const fetchMealInfo = () => {
        let infos = []
        console.log('wc in fetchMealInfo:', wc)
        for(let i = 0; i < wc.length-1; i++){ //-1 for the empty string at the end
            console.log('i:',i)
            if(wc[i] != ''){
                axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${wc[i]}`)
                .then(response => {
                    infos.push(response['data']['meals']['0'])
                })
            }
        }
       setInfos(infos)
       setInfosLoaded(true)
      }

    const handleNameChange = (e) => {
        setCollectionName(e.target.value);
    }

    const generateSteps = () => {
        navigate(`/PrepUp/${username}/steps`, {
        });
    }

    const getMealInfo = () => {
        for (let i = 0; i < wc.length; i++) {
            fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${wc[i]}`)
            .then((response) => {
                if (response.status == 200) {
                    return response.json()
                } else {
                    console.log('Status flop')
                }
            })
            .then((response) => {
                const meal = response["meals"]
                console.log("Meal: " + response["meals"])
                const title = meal['strMeal']
                const imgURL = meal['strMealThumb']

                return (
                    <RecipesCard title={title} imgURL={imgURL} mealId={wc[i]} username={username}/>
                )
            })
            .catch(err => {
                console.error("Failed to find meal: " + err)
            })
        }
    }

    useEffect(() => {
        // initial load
        getWC();
      }, []);

    useEffect(() =>{
        fetchMealInfo()
        setLoaded(true)
    }, [wc])
    
    return (
        <div>
            <NavBar username={username} setMyRecipes={false} setMyCollections={false} />



            <div className="input-container">
                <p className="header">My Working Collection</p>
            </div>


            {/* {getMealInfo()} */}

            {/* {
                wc.map((mealId) => {
                    if (mealId) {
                        axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
                        .then((response) => {
                            if (response.status == 200) {
                                console.log("MealID: " + mealId)
                                const meal = response.data['meals'][0]
                                console.log("Meal: " + meal)
                                const title = meal['strMeal']
                                const imgURL = meal['strMealThumb']

                                return (
                                    <div className="working-collection-recipes">
                                        <RecipesCard title={title} imgURL={imgURL} username={username} mealId={mealId}/>
                                    </div>
                                )

                            } else {
                                console.log('Status flop')
                            }
                        })
                    }
                })
            } */}
            <div className='outerWC'>
                <div className="working-collection-recipes">
                    <RecipesCard title={"Minced Beef Pie"} imgURL={"https:\/\/www.themealdb.com\/images\/media\/meals\/xwutvy1511555540.jpg"} username={username} mealId={52876}/> 
                    <RecipesCard title={"French Onion Chicken with Roasted Carrots & Mashed Potatoes"} imgURL={"https:\/\/www.themealdb.com\/images\/media\/meals\/b5ft861583188991.jpg"} username={username} mealId={52996}/> 
                    <RecipesCard title={"Christmas Pudding Trifle"} imgURL={"https:\/\/www.themealdb.com\/images\/media\/meals\/r33cud1576791081.jpg"} username={username} mealId={52989}/> 
                    <RecipesCard title={"Osso Buco alla Milanese"} imgURL={"https:\/\/www.themealdb.com\/images\/media\/meals\/wwuqvt1487345467.jpg"} username={username} mealId={52810}/> 
                </div>
                
            </div>
            

            <div className="bottom-buttons">
                <div className="add-button-container">
                    <button className="back-to-browse-button" onClick={navToBrowse}>Back to Browse</button>
                </div>
                <div className="sub-header-container">
                    <button className="cook-button" onClick={generateSteps}>Cook</button>
                </div>
            </div>

        </div>
    )
}

export default WorkingCollection;