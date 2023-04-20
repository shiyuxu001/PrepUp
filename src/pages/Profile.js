import { useNavigate } from 'react-router-dom'
import {auth, db} from '../config/firebase';
import { ref, onValue, set, update } from 'firebase/database';
import React, { useState, useEffect } from "react";
import {Row, Col} from 'react-bootstrap';
import NavBar from "../components/NavBar";
import '../styles/Profile.css';


function Profile({username}) {
    let navigate = useNavigate();
    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [key, setKey] = useState('')
    const [exp, setExp] = useState('')
    const [uploadProfileSelected, setuploadProfileSelected] = useState(false)


    const handleBackButton = () => {
        navigate(`/PrepUp/${username}/browse`);
    }
    const databaseURL = "https://prepup-41491-default-rtdb.firebaseio.com/";

    const upload = () => {
        setuploadProfileSelected(true)
        // if (image == null) {
        // console.log('is null');
        // return;
        // }
        // const dict = {
        //     pfp: image
        // }
        // const keyArray = Array.from(key);
        // const userId = keyArray[0];
        // fetch(`${databaseURL}/${username}/${userId}/.json`, {
        //     method: "PATCH",
        //     body: JSON.stringify(dict)
        // }).then((response) => {
        //     if (response.status !== 200) {
        //         console.log(' status flop in upload')
        //     } 
        //     else {
        //         console.log('image sent to data basse')
        //         console.log('image: ', image)
        //         displayPicture();
        //         return;
        //     }
        // })
    }

    const updatePfp = async () => {
        console.log("in update pfp")
        const keyArray = Array.from(key);
        const userId = keyArray[0].toString();
        const userRef = ref(db,`${username}/${userId}`);

        console.log('UID:', userId)
        console.log('userRef: ', userRef)
        await update(userRef, {pfp: image }) .then(() => {
            console.log('pfp updated successfully');
            // setExp(level);
          })
          .catch((error) => {
            console.error('Error updating experience level:', error);
          });
    }

    const putExp = async (level) => {
        const keyArray = Array.from(key);
        const userId = keyArray[0].toString();
        const userRef = ref(db,`${username}/${userId}`);

        console.log('UID:', userId)
        console.log('userRef: ', userRef)
        await update(userRef, {exp: level }) .then(() => {
            console.log('Experience level updated successfully');
            setExp(level);
          })
          .catch((error) => {
            console.error('Error updating experience level:', error);
          });
    }


    const getName = () => {
        console.log('username: ', username)
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
                console.log('response : ', response)
                console.log('datapoints : ', dataPoints)
                console.log('keys : ', keys)


                const fetchedName = dataPoints[0]['name'];
                console.log('fetched Name: ', fetchedName)
                setName(fetchedName)
            } else {
                console.log('response :' , response)
                console.log('response null flop')
            }
        }) 

    }

    const getExp = () => {
        fetch(`${databaseURL}/${username}/.json`)
        .then((response) => {
            if (response.status == 200) {
                return response.json();
            } else {
                console.log(' get exp status flop')
            }
        })
        .then((response) => {
            if (response) {
                const keys = Object.keys(response);
                const dataPoints = keys
                    .map((k) => response[k]);

                const fetchedExp = dataPoints[0]['exp'];
                console.log('fetched EXP lvl: ', fetchedExp)
                setExp(fetchedExp)
            } else {
                console.log('response :' , response)
                console.log('response null flop')
            }
        }) 

    }

    const displayPicture = () => {
        fetch(`${databaseURL}/${username}/.json`)
        .then((response) => {
            if (response.status == 200) {
                return response.json();
            } else {
                console.log(' retrieve photo status flop')
            }
        })
        .then((response) => {
            if (response) {
                const keys = Object.keys(response);
                const dataPoints = keys
                    .map((k) => response[k]);

                const fetchedPfp = dataPoints[0]['pfp'];
                console.log('fetched pfp: ', fetchedPfp)
                setImage(fetchedPfp)
            } else {
                console.log('response :' , response)
                console.log('response null flop')
            }
        }) 

    }


    useEffect(() => {    
        getName();
        displayPicture();
        getExp();
    }, []);

    return (
        <div className='profile-page'>
            <NavBar username={username} setMyRecipes={false} setMyCollections={false} 
            setUserProfile={true}/>
            <button className="back-button" onClick={handleBackButton} id='profile'>Back to Browse</button>
            <div className='profile-container'>
            <Row>
                <Col xs={5} id='user-img'>
                    
                    <h1 className="profile-name">{name}</h1>
                    <div className="container">
                        <div className="profile-pic" >
                            <div>
                            <img class="pic-resize" src={image} alt={name} Profile picture/>
                            </div>
                        </div>
                    </div>

                    <button className='upload-picture-btn' onClick={upload}>
                            Upload Profile Picture
                    </button>

                    {uploadProfileSelected ? 
                        <div className='upload-picture'>
                            <div className="modal-close-button">
                                 <button className="modal-close" onClick={() => setuploadProfileSelected(false)}>x</button>
                            </div>
                           <input type='file'className='file-upload' onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))}></input> 
                           {/* <button onClick={updatePfp}>Save Changes</button> */}
                        </div> 
                        : ''
                    }
                </Col>

                <Col xs={7} id='user-info'>
                    <div className="exp-lvl-container">
                        <div className="profile-setting">
                            <p className="setting-header">Experience level</p>
                            <div className="setting">
                                {exp}
                            </div>
                        </div>
                    </div>
                    <button type="submit" className='exp-btn' onClick={() => { putExp('Novice') }}>Novice</button>
                    <button type="submit" className='exp-btn' onClick={() => { putExp('Advanced') }}>Advanced</button>
                    <button type="submit" className='exp-btn' onClick={() => { putExp('Expert') }}>Expert</button>
                </Col>          
            </Row>

            </div>
            
        </div>
    
            
    )
}

export default Profile;

// {recipeLoaded && recipe.length > 0 &&

// }