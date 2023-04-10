import React from "react";
import Card from "react-bootstrap/Card"
import '../styles/Cards.css'
import { useNavigate} from 'react-router-dom'
import { Button } from "react-bootstrap";
import { faAlignCenter } from "@fortawesome/free-solid-svg-icons";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';




function RecipesCard( {title, imgURL, username, mealId}) {
    let navigate = useNavigate();


    const navToRecipePage = () => {
        navigate(`/PrepUp/${username}/RecipePage/${mealId}`, {username: username, mealId: mealId});
    }

    const navToWorkingCollections = () => {
        navigate(`/PrepUp/${username}/WorkingCollections`, {username: username});
    }

    const navToSavedCollections = () => {
        navigate(`/PrepUp/${username}/SavedCollections`, {username: username});
    }

    const navToLikedRecipes = () => {
        navigate(`/PrepUp/${username}/LikedRecipes`, {username: username});
    }

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