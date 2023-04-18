import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Container } from "react-bootstrap";
import NavBar from "../components/NavBar";
function Success( {username} ){
    const navigate = useNavigate();

    const handleBackToHome = () => {
        navigate(`/PrepUp/${username}/browse`);
    }

    return (
        <>
            <NavBar />
            <div className="page-container" style={{display: 'flex', backgroundColor: '#A7E4A5',justifyContent:'center',alignItems:'center', justifyContent: 'center', height:'70vh'}}>
                <div className="centered-div" style={{alignItems: 'center', justifyContent: 'center',top: '50%'}} >
                    <p style={{fontSize:'30px',fontFamily:'sans-serif', fontWeight:'bold'}}> Success! You've completed the recipes!</p>
                </div>
                
                <div>
                    
                </div>
                
            </div>
            <div style={{justifyContent:'center',alignItems:'center', justifyContent: 'center'}}>
                <button style={{marginTop: '40px', borderRadius:'3cm', scale:'1.4'}} onClick={handleBackToHome}>Back to Browse</button>
            </div>
            
        </>
        
        
    )
}

export default Success