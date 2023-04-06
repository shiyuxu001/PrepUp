import React from "react";
import Card from "react-bootstrap/Card"
import '../styles/Cards.css'
import { useNavigate } from 'react-router-dom'
import { Button } from "react-bootstrap";
import { faAlignCenter } from "@fortawesome/free-solid-svg-icons";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function RecipesCard(props){
    let navigate = useNavigate();

    const navToRecipePage = () => {
        navigate(`/${props.username}/RecipePage`);
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
                                <Button variant='warning'>Add to Queue</Button>
                                <Button variant='warning'>Add to collection</Button>
                                <Button variant='warning'>Save</Button>
                            </div>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
        </>
   
    
    )
};
export default RecipesCard