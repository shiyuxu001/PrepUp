// import { useState } from 'react';
// // import '../styles/WorkingCollection.css';
import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import StepsCard from "../components/StepsCard";
import "../styles/Steps.css";
import { useNavigate } from 'react-router-dom'
import '../styles/Browse.css';
import axios from "axios";
// fake recipe
// import myInstr from "../static/fake_instructions.json";



function Steps( {username}) {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [checked, setChecked] = useState(0)
    const colors = ['danger', 'secondary', 'warning', 'info']

    let navigate = useNavigate();

    let ids=[52959, 52944]
    let colorIndex = 0
    let stepIndex = 1

    const handleClick = () => {
        setChecked(checked+1)
        console.log('steps checked: ' + checked)
        
    }

    const navToSuccess = () => {
        navigate(`/PrepUp/${username}/success`);
    }

    useEffect(() => {
        console.log(posts[0])
        // This effect runs on mount and whenever count changes
        if(checked !== 0 && posts !== [] && checked === posts[0].size + posts[1].size-1){
            console.log('all checked, total = '+ checked) //this is so not right
            // nav to success page
        }
        
      }, [checked]);
   

    useEffect(() => {
        // setLoading(true)
        
        let myInstr={meals:[]}

        ids.forEach(function(id) {
            console.log('id:' + id)
            axios.get('https://www.themealdb.com/api/json/v1/1/lookup.php?i='+ id)
                .then(response =>{
                    // console.log(response.data)
                    myInstr['meals'].push(response.data['meals'][0])
                }
                    
                )
            })

            console.log('myinstr so fa:')
            console.log(myInstr)
        

        console.log('in useEffect, end')
        
        

        let instrs = [];
        console.log(myInstr['meals'])
        myInstr['meals'].forEach(function(i){
            console.log('i:')

            console.log(i)
            // console.log(ins)
            let inName = i['strMeal']
            let insSplit = i['strInstructions'].split('\r\n')
            // console.log(insSplit)
            const regex = /\d+\s*minutes\b/; // fix so it returns just the number
            let stepsList = [];
            for(let i of insSplit){
                if(i != ''){
                    // console.log(i)
                    const match = regex.exec(i);
                    let num = 0;
                    if (match) {
                        const new_regex = /\d+\b/
                        // Returns the first match (i.e., the number)
                        // 0 indicates no minute measurement
                        num = new_regex.exec(match[0])[0]; 
                    }
                    console.log(num)
                    const dict = {
                        time: Number(num), 
                        instr: i,
                        insName: inName
                    }
                    stepsList.push(dict)

                }
            }
            instrs.push(stepsList) //instrs: list of 2 list, eachh inner list: list of entries w instruction and time
            console.log(instrs)
            
        })
        setPosts(instrs)
        console.log(posts)
        console.log('setting loading in useEffect: original loading is ' + loading)
        setLoading(false)
        console.log('loading in useEffect is now '+ loading.toString())
        
    },[]);

    // myInstr.meals[0]['strInstructions']
    return(!loading ?
        <div className="all">
            {console.log('loading inside return top rn is '+ loading)}
            <NavBar />
            <h2 style={{ color: "#545454", alignContent:'left' }}>Steps</h2>
            <br/>
            {console.log('hii')}
            {console.log(posts)}
            {console.log(posts[0])}
            {/* {setLoading(true)} */}
            {posts && posts[0] && posts[0].map((post) =>
                <StepsCard 
                    stepNum = {stepIndex++}  
                    mins = {post['time']} 
                    text={post['instr']} 
                    color={colors[(colorIndex+=1)%4]}
                    // onClick = {handleClick}
                />
            )}
            
            {posts && posts[1] && posts[1].map((post) =>
                
                <StepsCard 
                    stepNum = {stepIndex++}  
                    mins = {post['time']} 
                    text={post['instr']} 
                    name={post['insName']}
                    color={colors[(colorIndex+=1)%4]}
                    // onClick = {handleClick}
                 />
            )}
            {/* TODO: figure out how to click on card/checkbox, once all steps completed, ssend to success page? */}
            {/* TODO: figure out progress bar */}
            {/* TODO: add key for recipes and colors? */}
            <button className="floating-button" onClick={navToSuccess}> Done!</button>
        </div> : <>
        {console.log('loading in bottom of else is ' + loading)}
        loading...
        </>
        
        //make scrollable
        // map elementts in json to steps component
        //
    )
}

export default Steps;