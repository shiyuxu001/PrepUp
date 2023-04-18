import { useState, useEffect } from 'react';
import { useNavigate , useLocation } from 'react-router-dom'
import '../styles/WorkingCollection.css';
import NavBar from '../components/NavBar';
import QueueCard from '../components/QueueCard';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';


function WorkingCollection({username}  ) {
    const [collectionName, setCollectionName] = useState('');
    const [key, setKey] = useState('')
    const [wc, setWC] = useState([]) //list of meal ids
    const [loaded, setLoaded] = useState(false)
    const [infos, setInfos] = useState([])
    const [infosloaded, setInfosLoaded] = useState(false)

    const databaseURL = "https://prepup-41491-default-rtdb.firebaseio.com/";

    
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
                  setWC(fetched.split(';'))
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
            <div className="sub-header-container">
                <button className="back-button">Back</button>
                <button className="cook-button" onClick={generateSteps}>Cook</button>
            </div>

            <div className="input-container">
                <input className="collection-name-input" type="text" placeholder="Collection Name" onChange={handleNameChange}/>
            </div>

            <Col>
                {console.log(loaded)}
                {console.log('info inside div',infos)}


                {(loaded && infosloaded) ? 
                    (
                    // <div>

                          infos.map((info, index) => ( 
                            <Row key={index}>
                                {/* <QueueCard  
                                title='hello' 
                                imgURL='fake-img-url' 
                                />  */}
                                <p>hi</p>
                            </Row>
                            
                          ))
                        // <p>hi</p>

                    ) : (
                        <div>Loadinng ...</div>
                    )
                }
            </Col>


            {/* <div className="header">
                <NavBar username={username} setMyRecipes={false} setMyCollections={false} />
                  
            </div>
            <div className="sub-header-container">
                <button className="back-button">Back</button>
                <button className="cook-button" onClick={generateSteps}>Cook</button>
            </div>
            <div className="input-container">
                <input className="collection-name-input" type="text" placeholder="Collection Name" onChange={handleNameChange}/>
            </div>
            
             <div>

                { loaded? 
                    (
                        infos.map((info) => (
                    
                        // console.log('info inside map is:',info)
                        // return(
                        //     <div>
                        //     {console.log("info inside map here is:",info)}
                         <QueueCard title='hello' imgURL='fake-img-url'}/> 
                            // 'hi'
                            // <button>hi</button>
                        //     </div>

                        // )
                        
                            
                   
                        ))
                    ) : ( 
                        <div className="loading-text">
                            <p>loading...</p>
                        </div>
                    )

                }
              
            </div> 
            
            <div className="add-button-container">
                <button className="add-button">Add Recipe</button>
            </div> */}
        </div>
    )
}

export default WorkingCollection;