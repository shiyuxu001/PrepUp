import Card from "react-bootstrap/Card"
import '../styles/Cards.css'
import { useNavigate} from 'react-router-dom'
import React, { useState, useEffect } from "react";

import { Button } from "react-bootstrap";
import { faAlignCenter } from "@fortawesome/free-solid-svg-icons";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import QueueIcon from '../components/queue-svgrepo-com.svg';
// import AlbumIcon from '../components/albums-outline.svg'
import CollectionIcon from '../components/collection-tag-svgrepo-com.svg';
import LikeIcon from '../components/like-svgrepo-com.svg';
import LikeIcon2 from '../components/heart-outline.svg';





function RecipesCard( {title, imgURL, username, mealId}) {
    let navigate = useNavigate();
    const [liked, setLiked] = useState()
    const [key, setKey] = useState('')
    

    console.log('recipe name :', title)

    const databaseURL = "https://prepup-41491-default-rtdb.firebaseio.com/";


    const navToRecipePage = () => {
        navigate(`/PrepUp/${username}/recipePage/${mealId}`, {username: username, mealId: mealId});
    }

    const navToWorkingCollections = (e) => {
        e.stopPropagation();
        navigate(`/PrepUp/${username}/workingCollection`, {username: username});
    }

    const navToSavedCollections = (e) => {
        e.stopPropagation();
        navigate(`/PrepUp/${username}/savedCollections`, {username: username});
    }

    const navToLikedRecipes = (e) => {
        e.stopPropagation();
        console.log('liked button clicked')
        addToLiked();
        // alert(title + 'added to your liked recipes!')
        // navigate(`/PrepUp/${username}/likedRecipes`, {username: username});
    }

    
    const getLiked = () => {
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
                const fetchedLiked = dataPoints[0]['likedRecipes'];
                console.log('fetched liked recipes: ', fetchedLiked)
                setLiked(fetchedLiked)
            } else {
                console.log('response :' , response)
                console.log('response null flop')
            }
        }) 
    }

    const addToLiked = () => {
        const likedRep = liked + ' ' + mealId

        if(liked.includes(mealId.toString())){
            console.log('id already in working collection')
          }else{
      
            const likedRep = liked + ' ' + mealId
            console.log('adding new recipe to wc')
            const dict = {
                likedRecipes: likedRep
            }
            fetch(`${databaseURL}/${username}/${key}/.json`, {
                method: "PATCH",
                body: JSON.stringify(dict)
            }).then((response) => {
                if (response) {
                  if (response.status !== 200) {
                    alert("Unable to add recipe to liked reciped!")
                    console.log(' status flop in upload')
                } 
                else {
                    console.log('updated Liked Recipes: ', likedRep)
                    return;
                  }
                } else {
                  alert("Unable to add recipe to liked reciped!")
                }
      
            })
      
          }
    }

    // const addToLiked = () => {
    //     const likedRep = liked + ' ' + mealId
    //     console.log('adding to liked')
    //     const dict = {
    //         likedRecipes: likedRep
    //     }
    //     fetch(`${databaseURL}/${username}/${key}/.json`, {
    //         method: "PATCH",
    //         body: JSON.stringify(dict)
    //     }).then((response) => {
    //         if (response) {
    //             if (response.status !== 200) {
    //                 console.log(' status flop in upload')
    //                 alert("Unable to add recipe to liked reciped!")
    //             } 
    //             else {
    //                 console.log('updated Liked Recipes: ', likedRep)
    //                 return;
    //             }
    //         } else {
    //             alert("Unable to add recipe to liked reciped!")
    //         }

    //     })
    // }

    // const removeLiked = () => {

    // }

    useEffect(() => {    
        getLiked();
    }, []);

    return(
        <>
    <Card className='recipe-card text-center'  onClick={navToRecipePage}>
        <Row noGutters>
            <Col sm={4} md={4}>
                <img className='recipe-card-img' variant='left' src={imgURL} alt={title} title={title}/>
            </Col>
            <Col className="recipe-card-info" sm={8} md={8}>
                <Row>
                    <h2 className="recipe-card-title">{title}</h2>
                </Row>
                <Row className="recipe-card-button-container">
                    <Col xs={4}>
                        <Button className="recipe-card-button" onClick={navToWorkingCollections} variant='outline-light'>
                        <img className="recipe-icon" src={QueueIcon} onClick={navToWorkingCollections} style={{ width: '100%' }}/>
                        </Button>
                    </Col>
                    <Col xs={4}>
                        <Button className="recipe-card-button" onClick={navToSavedCollections} variant='outline-light'>
                            <img className="recipe-icon" src={CollectionIcon} />
                        </Button>
                    </Col>
                    <Col xs={4}>
                        <Button className="recipe-card-button" onClick={navToLikedRecipes} variant='outline-light'>
                            <img className="recipe-icon" src={LikeIcon2} />
                                                    
                            {/* <ion-icon name="heart-outline" aria-label="Liked Recipies"></ion-icon> */}
                        </Button>
                    </Col>
                </Row>
            </Col>
        </Row>
    </Card>
</>
        // <>
        //     <Card className='recipe-card' onClick={navToRecipePage}>
        //         <Row>
        //             <img className="new-recipe-card-img" variant='left' src={imgURL} alt={title} title={title} />
        //             <p className="recipe-card-title">{title}</p>
        //             <Col>
        //                 <Row>
        //                     {/* <div className="recipe-card-button-container"> */}
        //                         <Col xs={4}>
        //                             <Button className="recipe-card-button" onClick={navToWorkingCollections} variant='outline-light'>
        //                             <img className="recipe-icon" src={QueueIcon} onClick={navToWorkingCollections}/>
        //                             </Button>
        //                         </Col>
        //                         <Col xs={4}>
        //                             <Button className="recipe-card-button" onClick={navToSavedCollections} variant='outline-light'>
        //                             <img className="recipe-icon" src={CollectionIcon} />
        //                             </Button>
        //                         </Col>
        //                         <Col xs={4}>
        //                         <Button className="recipe-card-button" onClick={navToLikedRecipes} variant='outline-light'>
        //                             <img className="recipe-icon-heart" src={LikeIcon2} />
                                    
        //                             {/* <ion-icon name="heart-outline" aria-label="Liked Recipies"></ion-icon> */}
        //                         </Button>
        //                         </Col>
                                
        //                     {/* </div> */}
        //                 </Row>
        //             </Col>
        //         </Row>
        //     </Card>
        // </>
   
    
    );
};

export default RecipesCard;