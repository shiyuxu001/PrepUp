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




function RecipesCard(props){
    let navigate = useNavigate();

    const[recipe,setRecipe]=useState();
    const getRecipe= ()=>{
        setRecipe()
        axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${props.mealId}`)
        .then(response => {
            console.log(response.data.meals)
            setRecipe(response.data.meals);
        })

    }

    const navToRecipePage = async() => {
        await getRecipe()
        navigate(`/${props.username}/RecipePage`, {username: props.username, recipe: recipe});
    }

    const navToWorkingCollections = async() => {
        await getRecipe()
        navigate(`/${props.username}/WorkingCollections`, {username: props.username});
    }

    const navToSavedCollections = async() => {
        await getRecipe()
        navigate(`/${props.username}/SavedCollections`, {username: props.username});
    }

    const navToLikedRecipes = async() => {
        await getRecipe()
        navigate(`/${props.username}/LikedRecipes`, {username: props.username});
    }

    return(
        <>
            <Card className = 'recipe-card' onClick = {props.navTo}>
                <Row className='p-4'>
                    <Card.Title><h2>{props.title}</h2></Card.Title>
                </Row>
                <Row>
                    <Col sm={4} md={4}>
                        <img className = 'recipe-card-img' variant='left' onClick={navToRecipePage} src={props.imgURL}  />
                    </Col>
                    <Col sm={8} md={8}>
                        <Card.Body>
                            <Card.Text>{props.text}</Card.Text>
                            <div className="d-flex justify-content-end" >
                                <Button onClick={navToWorkingCollections} variant='warning'>Add to Queue</Button>
                                <Button onClick={navToSavedCollections} variant='warning'>Add to collection</Button>
                                <Button onClick={navToLikedRecipes} variant='warning'>Add to Liked Recipes</Button>
                            </div>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
        </>
   
    
    )
};
export default RecipesCard