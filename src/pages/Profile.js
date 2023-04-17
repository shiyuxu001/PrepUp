import { useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from "react";
import '../styles/Profile.css';


function Profile({username}) {
    let navigate = useNavigate();
    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [key, setKey] = useState('')
    const [exp, setExp] = useState('')


    const handleBackButton = () => {
        navigate(`/PrepUp/${username}/browse`);
    }
    const databaseURL = "https://prepup-41491-default-rtdb.firebaseio.com/";

    const upload = () => {
        if (image == null) {
        console.log('is null');
        return;
        }
        const dict = {
            pfp: image
        }
        fetch(`${databaseURL}/${username}/${key}/.json`, {
            method: "PATCH",
            body: JSON.stringify(dict)
        }).then((response) => {
            if (response.status !== 200) {
                console.log(' status flop in upload')
            } 
            else {
                console.log('image sent to data basse')
                console.log('image: ', image)
                displayPicture();
                return;
            }
        })
    }

    const putExp = (level) => {
        console.log('key value: ', key)
        const dict = {
            exp: level
        }
        fetch(`${databaseURL}/${username}/${key}/.json`, {
            method: "PATCH",
            body: JSON.stringify(dict)
        }).then((response) => {
            if (response.status !== 200) {
                console.log(' status flop in upload')
            } 
            else {
                setExp(level)
                console.log('experience level:  ', level)
                return;
            }
        })
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
        <div>
            <button className="back-button" onClick={handleBackButton}>Back</button>
            <div className="container">
                <div className="profile-pic" >
                </div>
                <div>
                    <img src={image} alt={name} Profile picture/>
                 </div>
            </div>

            <input type='file' onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))}></input>

            <button onClick={upload}>
                    Upload Profile Picture
            </button>

          
            <h1 className="profile-name">{name}</h1>
            <div className="container">
                <div className="profile-setting">
                    <p className="setting-header">Experience level</p>
                    <div className="setting">
                        {exp}
                    </div>

                </div>
            </div>
            <button type="submit" onClick={() => { putExp('Novice') }}>Novice</button>
            <button type="submit" onClick={() => { putExp('Advanced') }}>Advanced</button>
            <button type="submit" onClick={() => { putExp('Expert') }}>Expert</button>
        </div>
    )
}

export default Profile;

// {recipeLoaded && recipe.length > 0 &&

// }