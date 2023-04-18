import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import "../styles/Login.css";
import logo from "../components/LeafName.png"

function Login( {passUser, passName} ) {
    const [signup, setSignUp] = useState(true);
    const [loginSuccess, setLoginSuccess] = useState(true);
    const navigate = useNavigate();

    // sign up credentials
    const [name, setName] = useState('');
    const [newUser, setNewUser] = useState('');
    const [newPass, setNewPass] = useState('');

    // log in credentials
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [postResult, setPostResult] = useState(null);
    const databaseURL = "https://prepup-41491-default-rtdb.firebaseio.com/";

    // sign up credentials
    const handleNameChange = (e) => {
        setName(e.target.value);
        console.log(e.target.value);
    }

    const handleSignUpUserChange = (e) => {
        setNewUser(e.target.value);
        console.log("New Username: " + e.target.value);
    }

    const handleSignUpPassChange = (e) => {
        setNewPass(e.target.value);
        console.log("New Password: " + e.target.value);
    }

    const handleSignUpSubmit = () => {
        sendSignUpData();
        passName(name);
        passUser(newUser);
        navigate(`/PrepUp/${newUser}/browse`)
    }

    // login credentials
    const handleUserChange = (e) => {
        setUsername(e.target.value);
        console.log("Username: " + e.target.value);
    }

    const handlePassChange = (e) => {
        setPassword(e.target.value);
        console.log("Password: " + e.target.value);
    }

    // save signup credentials
    const sendSignUpData = () => {
        setName('');
        setNewUser('');
        setNewPass('');

        const dict = {
            name: name,
            user: newUser,
            pass: newPass,
            exp: '---',
            pfp: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNf6W5dEJPZgmwcADVOhWIou-2xCrRbjHWSg&usqp=CAU',
            likedRecipes: '',
            wc: ''
            
        }



        return fetch(`${databaseURL}/${newUser}/.json`, {
            method: "POST",
            body: JSON.stringify(dict)
        }).then((response) => {
            if (response.status !== 200) {
                setPostResult("Oops! Something unexpected happened: " + response.statusText);
            } 
            else {
                setPostResult(null);
                return;
            }
        })
    }

    // check login credentials
    const checkLoginData = () => {
        console.log("I got into checkLoginData()");

        const dict = {
            user: username,
            pass: password
        }

        fetch(`${databaseURL}/${username}/.json`)
        .then((response) => {
            if (response.status !== 200) {
                // setDataRetrieveResult("Cannot fetch your bucket list items at this time: " + response.statusText);
                setLoginSuccess(false);
                console.log("Login status failed: " + response.status);
            } else {
                // setDataRetrieveResult(null);
                setLoginSuccess(true);
                console.log("Login successful");
                return response.json();
            }
        })
        .then((response) => {
            if (response) {
                const keys = Object.keys(response);
                const dataPoints = keys
                    .map((k) => response[k]);
                const fetchedPass = dataPoints[0]['pass'];
                const fetchedName = dataPoints[0]['name'];
                if (fetchedPass === password) {
                    setLoginSuccess(true);
                    setName(fetchedName);
                    passUser(username);
                    passName(fetchedName);
                    navigate(`/PrepUp/${username}/browse`);
                } else {
                    setLoginSuccess(false);
                }
            } else {
                setLoginSuccess(false);
            }
        })
    }

    const handleRedirect = () => {
        setSignUp(!signup);
        setNewUser('');
        setNewPass('');
        setUsername('');
        setPassword('');
    }
    
    

    return (
        <div className="login-body w-full h-full">
           <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
<script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script> 
            <div className="wrapper">
                <div className="form-box login-signup">
                    
                     {signup ? 
                        <div>
                            <img className='logo' src={logo} alt="PrepUp" />
                            <h3>Sign Up</h3>
                            
                            <div className="input-container">
                                <span className='icon'><ion-icon name="person-outline"></ion-icon></span>
                                <input className="input" type="text" placeholder="Name" onChange={handleNameChange}/>
                            </div>
                            <div className="input-container">
                                <span className='icon'><ion-icon name="mail-outline"></ion-icon></span>
                                <input className="input" type="text" placeholder="Create username" onChange={handleSignUpUserChange}/>
                            </div>
                            <div className="input-container">
                                <span className='icon'><ion-icon name="lock-closed-outline"></ion-icon></span>
                                <input className="input" type="password" placeholder="Create password" onChange={handleSignUpPassChange}/>
                            </div>
                            <div className="login-signup">
                                <p>Already have an Account? <button className="link-button" onClick={handleRedirect}>Log in</button></p>
                            </div>
                            <div className="button-container">
                                <input className="submit-button" type="submit" onClick={handleSignUpSubmit} />
                            </div>
                        </div>
                    :   <div>
                            <img className='logo' src={logo} alt="PrepUp" />
                            <h3>Log In</h3>
                            
                            {loginSuccess ? ''
                            :
                                <div className="invalid-login-container">
                                    <p className="invalid-login">Username or password is invalid</p>
                                </div>
                            }
                            <div className="input-container">
                                <span className='icon'><ion-icon name="mail-outline"></ion-icon></span>
                                <input className="input" type="text" placeholder="Username" onChange={handleUserChange}/>
                            </div>
                            <div className="input-container">
                                <span className='icon'><ion-icon name="lock-closed-outline"></ion-icon></span>
                                <input className="input" type="password" placeholder="Password" onChange={handlePassChange}/>
                            </div>
                            <div className="login-signup">
                                <p>Don't have an Account? <button className="link-button" onClick={handleRedirect}>Sign Up!</button></p>
                            </div>
                            <div className="button-container">
                                <input className="submit-button" type="submit" onClick={() => checkLoginData()}/>
                            </div>
                        </div>
                    }
                    </div>
                </div>
        </div>
        
        
    )
}

export default Login;