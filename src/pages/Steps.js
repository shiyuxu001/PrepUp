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
import posts from "../static/sim_steps.json";



function Steps( {username}) {
    // const [posts, setPosts] = useState({}) //list of posts, 
    //each post is recipe obj with list of name, instrs, and time dicts
    const [loading, setLoading] = useState(false)
    const [checked, setChecked] = useState(0)
    const colors = ['danger', 'secondary', 'warning', 'info']

    const colors2 = {"Skillet Apple Pork Chops with Sweet Potatoes & Zucchini": 'warning',
                     "Key Lime Pie": "success"}

    const [wc, setWC] = useState([]) //list of meal ids
    const [arr, setArr] = useState([])
    const [postsLoaded, setPostsLoaded] = useState(false)

    const [key, setKey] = useState('')

    const databaseURL = "https://prepup-41491-default-rtdb.firebaseio.com/";


    let navigate = useNavigate();

    let colorIndex = 0
    let stepIndex = 1
    let numRecipes = 0

    const handleClick = () => {
        setChecked(checked+1)
        console.log('steps checked: ' + checked)

       
        
    }

    const navToSuccess = () => {
        navigate(`/PrepUp/${username}/success`);
    }

    const getWC = () => {
        fetch(`${databaseURL}/${username}/.json`)
          .then((response) => {
              if (response.status == 200) {
                  return response.json();
              } else {
                  console.log(' status flop')
              }
          })
          .then((response) => {
              if (response) {
                  const keys = Object.keys(response);
                  setKey(keys);
                  const dataPoints = keys
                      .map((k) => response[k]);
                  const fetched = dataPoints[0]['wc'];
                  console.log('fetched working collection: ', fetched)
                  setWC(fetched.split(';'))
              } else {
                  console.log('response :' , response)
                  console.log('response null flop')
              }
          }) 
      }


    const handlePosts = ()=>{
        // console.log('inside handlePosts', posts)

        // const maxNum = Object.keys(posts).length
        // console.log('maxNum',maxNum)

        // console.log("posts again",posts)
        // for(let j in posts){
        //     // let temp = posts[curRec][indices[curRec]]
        //     // indices[curRec] ++
        //     // finalOrder.push(temp)
        //     // curRec = (curRec + 1 ) % maxNum
        //     // console.log('added step: ', temp)
        //     console.log('j:', j)
        //     console.log('hi hi hi')
        //     console.log('post at j', posts[j])
        //     posts[j].map((index, post) => (
        //         <StepsCard key={index} mins = {post.time} text = {post['instr']} name={post['insName']} color={colors[j]} />
        //         // <div>hi</div>
        //     ))
        //     console.log('mapped', j)
        // }
        console.log(posts)
        
    }



    // useEffect(() => {

    //     console.log('hiiiii in stepss rn')
    //     getWC()

    //     let all_ins = {}
    //     let newArr = []

    //     wc.forEach(function(id) {
    //         console.log('id:' + id)
    //         axios.get('https://www.themealdb.com/api/json/v1/1/lookup.php?i='+ id)
    //             .then(response =>{

    //                 if (response.status == 200) {
    //                     console.log(response.data)
    //                     newArr.push(response.data['meals'][0])  
    //                     // console.log('here 1',newArr[3])
    //                     let inName = response.data['meals'][0]['strMeal']
    //                     let insSplit = response.data['meals'][0]['strInstructions']
    //                                     .split('\r\n')
                    
    //                     const regex = /\d+\s*minutes\b/; // fix so it returns just the number
    //                     let stepsList = [];
    //                     for(let k of insSplit){
    //                         if(k != ''){
    //                             // console.log(i)
    //                             const match = regex.exec(k);
    //                             let num = 0;
    //                             if (match) {
    //                                 const new_regex = /\d+\b/
    //                                 // Returns the first match (i.e., the number)
    //                                 // 0 indicates no minute measurement
    //                                 num = new_regex.exec(match[0])[0]; 
    //                             }
    //                             console.log(num)
    //                             const dict = {
    //                                 time: Number(num), 
    //                                 instr: k,
    //                                 insName: inName
    //                             }
    //                             stepsList.push(dict)

    //                         }
    //                     }
    //                     all_ins[numRecipes] = stepsList
    //                     numRecipes++
    //                     console.log('all_ins so far: ', all_ins)


    //                 } else {
    //                     console.log('status flop')
    //                 }
    //             }
    //             )
    //             .catch(err => {
    //                 console.log(err, "failed get")
    //             })
    //         }
            
    //     )

    //     setPosts(all_ins)
    //     console.log('posts inside useEffect:',posts)
    //     console.log('setting loading in useEffect: original loading is ' + loading)
    //     console.log('loading in useEffect is now '+ loading.toString())
    //     setLoading(false)

        
    // }, []);


    // //only after posts updated
    // useEffect (()=>{
    //     if(!loading){
    //         console.log('callback func')
    //         console.log('rip',posts)
    //         console.log('ummm', posts['0'])
    //         setPostsLoaded(true)
    //     }
        
        
    // }, [posts])

    
   

    

    // myInstr.meals[0]['strInstructions']
    return(!loading ?
        <div className="all">
            {console.log('loading inside return top rn is '+ loading)}
            <NavBar />
            <h2 style={{ color: "#545454", alignContent:'left' }}>Steps</h2>
            <br/>
            
            {posts && console.log('checking 1',posts)}
           
            {/* {!loading && postsLoaded && posts != {} && wc.length != 0 ? handlePosts() : <></>} */}
            {posts['steps'].map((post)=> (
                <div style={{color:'white'}}>            
                    <StepsCard  stepNum ={stepIndex} mins = {post.time} text = {post['instr']} name={post['insName']} color={colors2[post['insName']]} />
                    {stepIndex+=1 }
                    {console.log(colors2[post['insName']])}
                </div>
            ))}

            {/* {posts && posts[1] && posts[1].map((post) =>
                
            )} */}
            {/* TODO: figure out how to click on card/checkbox, once all steps completed, ssend to success page? */}
            {/* TODO: figure out progress bar */}
            {/* TODO: add key for recipes and colors? */}
            <button className="floating-button" onClick={navToSuccess}> Done!</button>
        </div> : <>
        {console.log('loading in bottom of else is ' + loading)}
        loading...
        </>
        
        
    )
}

export default Steps;