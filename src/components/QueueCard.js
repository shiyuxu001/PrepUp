import Card from "react-bootstrap/Card"
import '../styles/Cards.css'
import React, { useState, useEffect } from "react";

import { Button } from "react-bootstrap";
import { faAlignCenter } from "@fortawesome/free-solid-svg-icons";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';




const QueueCard= (props) => {

    return(
        <>
 
            <Card className='queue-card'>
                <Row>
                    <img  variant='left' src={props.imgURL}  />
                    <h2 >{props.title}</h2>
                    <Col sm={8} md={8}>
                        <Row>
                            <div className="recipe-card-button-container">
                                {console.log('hi there')}
                            </div>
                        </Row>
                    </Col>
                </Row>
            </Card>
        </>
   
    
    );
};

export default QueueCard;