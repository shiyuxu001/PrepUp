import Card from "react-bootstrap/Card"
import '../styles/Cards.css'
import { useNavigate} from 'react-router-dom'
import React, { useState, useEffect } from "react";

import { Button } from "react-bootstrap";
import { faAlignCenter } from "@fortawesome/free-solid-svg-icons";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';




function RecipesCard( {title, imgURL, username, mealId}) {
    let navigate = useNavigate();
    const [liked, setLiked] = useState()
    const [key, setKey] = useState('')

    console.log('recipe name :', title)

    const databaseURL = "https://prepup-41491-default-rtdb.firebaseio.com/";


    const navToRecipePage = () => {
        navigate(`/PrepUp/${username}/recipePage/${mealId}`, {username: username, mealId: mealId});
    }

    const navToWorkingCollections = () => {
        navigate(`/PrepUp/${username}/workingCollection`, {username: username});
    }

    const navToSavedCollections = () => {
        navigate(`/PrepUp/${username}/savedCollections`, {username: username});
    }

    const navToLikedRecipes = () => {
        console.log('liked button clicked')
        addToLiked();
        navigate(`/PrepUp/${username}/likedRecipes`, {username: username});
    }

    const getLiked = () => {
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
                const fetchedLiked = dataPoints[0]['likedRecipes'];
                console.log('fetched liked recipes: ', fetchedLiked)
                setLiked(fetchedLiked)
            } else {
                console.log('response :' , response)
                console.log('response null flop')
            }
        }) 
    }

    const addToLiked = () => {
        const likedRep = liked + ' ' + mealId
        console.log('adding to liked')
        const dict = {
            likedRecipes: likedRep
        }
        fetch(`${databaseURL}/${username}/${key}/.json`, {
            method: "PATCH",
            body: JSON.stringify(dict)
        }).then((response) => {
            if (response.status !== 200) {
                console.log(' status flop in upload')
            } 
            else {
                console.log('updated Liked Recipes: ', likedRep)
                return;
            }
        })
    }
    useEffect(() => {    
        getLiked();
    }, []);

    return(
        <>
 
            <Card className='recipe-card' onClick={navToRecipePage}>
                <Row>
                    <img className="recipe-card-img" variant='left' src={imgURL}  />
                    <p className="recipe-card-title">{title}</p>
                    <Col sm={8} md={8}>
                        <Row>
                            <div className="recipe-card-button-container">
                                <Button className="recipe-card-button" onClick={navToWorkingCollections} variant='warning'>Add to Queue</Button>
                                <Button className="recipe-card-button" onClick={navToSavedCollections} variant='warning'>Add to collection</Button>
                                <Button className="recipe-card-button" onClick={navToLikedRecipes} variant='warning'>Add to Liked Recipes</Button>
                            </div>
                        </Row>
                    </Col>
                </Row>
            </Card>
        </>
   
    
    );
};

export default RecipesCard;