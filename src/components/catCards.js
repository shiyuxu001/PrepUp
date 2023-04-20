import React from "react";
import Card from "react-bootstrap/Card"
import '../styles/Cards.css'
import { useNavigate} from 'react-router-dom'
import { Button } from "react-bootstrap";
import { faAlignCenter } from "@fortawesome/free-solid-svg-icons";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function CatCards({categoryName, imgURL, username}) {
    let navigate = useNavigate();

    const navToCategoryPage = () => {
        navigate(`/PrepUp/${username}/categoryPage/${categoryName}`);
    }

    return (
        <div className="category-card-container">
            <Card className="category-card" onClick = {navToCategoryPage}>                
                <Row noGutters>
                    <Col sm={4} md={4}>
                        <img className='recipe-card-img' variant='bottom' src={imgURL} alt={categoryName} title={categoryName}/>
                    </Col>
                    <Col className="category-title" sm={8} md={8}>
                        <h2>{categoryName}</h2>
                    </Col>
                </Row>
            </Card>     
        </div>
   
    
    )
};
export default CatCards;