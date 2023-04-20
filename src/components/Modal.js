import React from "react";
import { useState } from "react";
import {Row, Col} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'

import '../styles/Modal.css'
import QueueIcon from '../components/queue-svgrepo-com.svg';
import CollectionIcon from '../components/collection-tag-svgrepo-com.svg';
import LikeIcon from '../components/like-svgrepo-com.svg';


function BodyContent (username) {


    return(
        <div className="app-description">
            <div className="section-header" id="help-section">
                <h4>About Us</h4>
            </div>
            <div className="section-content">
                <p>PrepUp is a meal prep app designed to make your time in the kitchen much easier. With this app, you'll have access to thousands of delicious recipes that you can browse through and interact with. Whether you're looking to save your favorite recipes for later or create a collection of recipes for a special occasion like Thanksgiving dinner, PrepUp has got you covered. The app even lets you queue up your desired recipes and generates a step-by-step guide for cooking them all together. With PrepUp, meal prep has never been more fun or hassle-free!</p>
            </div>

            <div className="section-header" id="help-section">
                <h4>Icons</h4>
            </div>
            <div className="section-body">
                <div id= 'icon-description'>
                <Row>
                    <Col id="icon-card">
                        <img className="recipe-icon" src={QueueIcon} alt="Queue Icon" title="Queue Icon" />
                            <div className="icon-card-container">
                                <p>The working queus is a collection of recipes you are creating a step-by-step guide for preparing your meal.</p>
                            </div>
                    </Col>

                    <Col id="icon-card">
                        {/* <img className="recipe-icon" src={CollectionIcon} alt="Collection Icon" title="Collection Icon"/> */}
                            <ion-icon name="bookmark-outline"></ion-icon>
                            <div className="icon-card-container">
                                <p>Save multiple recipes under a meal name (i.e. 30-Minute Meal, Thanksgiving). <p>Find your Meals under <span className="link-button" id="help-icon-page">My Collections</span>.</p> </p>
                           </div>
                    </Col>

                    <Col id="icon-card">
                        <ion-icon name="heart-outline" aria-label="Liked Recipies"></ion-icon>
                            <div className="icon-card-container">
                                <p>Like individual recipes to easily access them later.<p>Find your liked recipes under <span className="link-button" id="help-icon-page">My Recipes</span>.</p> 
                                </p>                        
                            </div>
                    </Col>
                </Row>
                </div>
            </div>

            
        </div>
    )
        
    
}

function Modal ({closeModal}) {
    const [openModal, setOpenModal] = useState(false)
    return(
        <div className="modal-background">
            <div className="modal-container">
                <div className="modal-close-button">
                    <button className="modal-close" onClick={() => closeModal(false)}>x</button>
                </div>
                
                <div className="title">
                    <h3>Help Page</h3>
                </div>
                <div className="body">
                    <BodyContent/>
                </div>
            </div>
        </div>

    )
}

export default Modal