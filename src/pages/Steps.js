// import { useState } from 'react';
// // import '../styles/WorkingCollection.css';
import React from "react";
import NavBar from "../components/NavBar";
import StepsCard from "../components/StepsCard";
import "../styles/Steps.css"



function Steps() {
    return(
        <>
            <NavBar />
            <h2 style={{ color: "#545454", alignContent:'left' }}>Steps</h2>
            <br/>
            <StepsCard text='hello' color='info' />
            <StepsCard text='these' color='danger' />
            <StepsCard text='are' color='secondary' />
            <StepsCard text='the' color='warning' />
            <StepsCard text='steps' color='info' />
            {/* TODO: figure out how to click on card/checkbox, once all steps completed, ssend to success page? */}
            
        </>
        
        //make scrollable
        // map elementts in json to steps component
        //
    )
}

export default Steps;