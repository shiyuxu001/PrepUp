import {auth, db} from '../config/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, fetchSignInMethodsForEmail} from 'firebase/auth';
import { getDatabase, ref, set, push, child } from 'firebase/database';
import React, { useState, useEffect } from "react";
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
    const [newUserEmail, setNewUserEmail] = useState('');
    const [newPass, setNewPass] = useState('');
    const [validSignUp, setValidSignUp] = useState(true);
    const [signUpError, setSignUpError] = useState('')

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

    const handleSignUpEmailChange = (e) => {
        setNewUserEmail(e.target.value)
        console.log("New Email: " + e.target.value);
    }

    const handleSignUpPassChange = (e) => {
        setNewPass(e.target.value);
        console.log("New Password: " + e.target.value);
    }

    const checkUsernameExists = async (username) => {
        const response = await fetch(`${databaseURL}/${username}/.json`);
        const data = await response.json();
        return data !== null; // Returns true if the data is not null (i.e., username exists)
    }

    const handleSignUpSubmit = () => {
        signIn();
        // sendSignUpData();
        passName(name);
        passUser(newUser);
        setName('');
        setNewUser('');
        setNewPass('');
        setSignUpError('');
        setNewUserEmail('');
        // navigate(`/PrepUp/${newUser}/browse`)
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


    const signIn = async () => {
            try {
                const methods = await fetchSignInMethodsForEmail(auth, newUserEmail);
                console.log("METHODS LENGTH: ", methods.length)
                if (methods.length === 0) {
                    const usernameExists = await checkUsernameExists(newUser);
                    if (usernameExists) {
                        setSignUpError(`Username "${newUser}" is taken.\nPlease choose a different username.`);
                        setValidSignUp(false)
                        return;
                      } else {
                        // User does not exist, create a new account
                        const { user } = await createUserWithEmailAndPassword(auth, newUserEmail, newPass);
                        const userId = user.uid;
                        console.log("NEW USER: ", newUser);
                        // Create a reference to the Realtime Database root
                        const dbRef = ref(db);

                        // Create a new user branch
                        const newUserRef = child(dbRef, newUser);

                        // Set some initial data for the new user
                        const initialData = {
                            placeholder: "dummy data",
                        };

                        set(newUserRef, initialData)
                        .then(() => {
                            console.log("New user branch created successfully");
                            
                            // Now create a reference to the new user branch and set its data
                            const userRef = child(newUserRef, userId);
                            
                            // Set data for the new user
                            set(userRef, {
                                name: name,
                                user: newUser,
                                pass: newPass,
                                exp: '---',
                                pfp: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNf6W5dEJPZgmwcADVOhWIou-2xCrRbjHWSg&usqp=CAU',
                                likedRecipes: '',
                                wc: ''
                            });
                            navigate(`/PrepUp/${newUser}/browse`)

                        })
                        .catch((error) => {
                            console.error("Error creating new user branch:", error);
                        });
                    }
                    
                } else {
                    // User already exists, show an error message
                    console.log("User already exists");
                    setSignUpError("User already exists with this email.")
                    setValidSignUp(false)
                }
                return;
            } catch (error) {
                setValidSignUp(false)
                if (error.code === "auth/weak-password") {
                    setSignUpError("Password should be at least 6 characters.")
                } else if (error.code === "auth/invalid-email"){
                    setSignUpError(`Invalid email: ${newUser}`)
                } else if (error.code === "auth/missing-password") {
                    setSignUpError("Please enter your password")
                }
                else {
                    setSignUpError(error.message)
                }
                console.log(error);
                return;
            }
    };

    // save signup credentials
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
<script noModule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script> 
            <div className="wrapper">
                <div className="form-box login-signup">
                    
                     {signup ? 
                        <div>
                            <img className='logo' src={logo} alt="PrepUp" />
                            <h3>Sign Up</h3>
                            {validSignUp ? ''
                            :
                                <div className="invalid-login-container">
                                    <p className="invalid-login">{signUpError}</p>
                                </div>
                            } 
                            <div className="input-container">
                                <span className='icon'><ion-icon name="mail-outline"></ion-icon></span>
                                <input className="input" type="text" placeholder="Email" onChange={handleSignUpEmailChange} value={newUserEmail}/>
                            </div>
                            <div className="input-container">
                                <span className='icon'><ion-icon name="people-outline"></ion-icon></span>
                                <input className="input" type="text" placeholder="Create username" onChange={handleSignUpUserChange} value={newUser}/>
                            </div>
                            <div className="input-container">
                                <span className='icon'><ion-icon name="person-outline"></ion-icon></span>
                                <input className="input" type="text" placeholder="Your Name" onChange={handleNameChange} value={name}/>
                            </div>
                           
                            <div className="input-container">
                                <span className='icon'><ion-icon name="lock-closed-outline"></ion-icon></span>
                                <input className="input" type="password" placeholder="Create password" onChange={handleSignUpPassChange} value={newPass}/>
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