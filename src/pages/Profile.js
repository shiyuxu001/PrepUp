import { useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from "react";
import '../styles/Profile.css';


function Profile({username}) {
    let navigate = useNavigate();
    const [name, setName] = useState('')

    const handleBackButton = () => {
        navigate("/PrepUp");
    }
    const databaseURL = "https://prepup-41491-default-rtdb.firebaseio.com/";


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

    useEffect(() => {    
        getName();
    }, []);

    return (
        <div>
            <button className="back-button" onClick={handleBackButton}>Back</button>
            <div className="container">
                <div className="profile-pic" >
                </div>
            </div>

          
            <h1 className="profile-name">{name}</h1>
            <div className="container">
                <div className="profile-setting">
                    <p className="setting-header">Experience level</p>
                    <div className="setting">

                    </div>
                </div>
            </div>
            <div className="container">
                <div className="profile-setting">
                    <p className="setting-header">Experience level</p>
                    <div className="setting">
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;

// {recipeLoaded && recipe.length > 0 &&

// }