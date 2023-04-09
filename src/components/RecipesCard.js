import React from "react";
import Card from "react-bootstrap/Card"
import '../styles/Cards.css'
import { useNavigate } from 'react-router-dom'
import { Button } from "react-bootstrap";
import { faAlignCenter } from "@fortawesome/free-solid-svg-icons";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';
import axios from 'axios';


function RecipesCard( {title, imgURL, username, mealId}) {
    let navigate = useNavigate();

    const [recipe, setRecipe] = useState();
    const getRecipe = () => {
        setRecipe()

        axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(response => {
            console.log(response.data.meals)
            setRecipe(response.data.meals);
        })

    }

    const navToRecipePage = async() => {
        await getRecipe()
        navigate(`/${username}/RecipePage`, {username: username, recipe: recipe});
    }

    const navToWorkingCollections = async() => {
        await getRecipe()
        navigate(`/PrepUp/${username}/WorkingCollections`, {username: username});
    }

    const navToSavedCollections = async() => {
        await getRecipe()
        navigate(`/PrepUp/${username}/SavedCollections`, {username: username});
    }

    const navToLikedRecipes = async() => {
        await getRecipe()
        navigate(`/PrepUp/${username}/LikedRecipes`, {username: username});
    }

    return(
        <>
            {/* <Card className='recipe-card' onClick={props.navTo}> */}
            {/* <Card className='recipe-card'>
                <Row>
                    <Col sm={4} md={4}>
                        <img className='recipe-card-img' variant='left' onClick={navToRecipePage} src={imgURL}  />
                    </Col>
                    <Col sm={8} md={8}>
                        <Row className='p-4'>
                            <p className="recipe-card-title">{title}</p>
                        </Row>
                        <Row>
                            <div>
                                <Button className="recipe-card-button" onClick={navToWorkingCollections} variant='warning'>Add to Queue</Button>
                                <Button className="recipe-card-button" onClick={navToSavedCollections} variant='warning'>Add to collection</Button>
                                <Button className="recipe-card-button" onClick={navToLikedRecipes} variant='warning'>Add to Liked Recipes</Button>
                            </div>
                        </Row>
                    </Col>
                </Row>
            </Card> */}

            <Card className='recipe-card'>
                <Row>
                    <img className="recipe-card-img" variant='left' onClick={navToRecipePage} src={imgURL}  />
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
   
    
    )
};

export default RecipesCard