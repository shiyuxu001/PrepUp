import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import "../styles/Login.css";

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
            pass: newPass
        }

        return fetch(`${databaseURL}/${newUser}/.json`, {
            method: "POST",
            body: JSON.stringify(dict)
        }).then((response) => {
            if (response.status !== 200) {
                setPostResult("Oops! Something unexpected happened: " + response.statusText);
            } else {
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
        <div>

            {signup ? 
                <div>
                    <h1>Sign Up</h1>
                    <div className="input-container">
                        <button className="redirect" onClick={handleRedirect}>Already have an account?</button>
                    </div>
                    <div className="input-container">
                        <input className="input" type="text" placeholder="Name" onChange={handleNameChange}/>
                    </div>
                    <div className="input-container">
                        <input className="input" type="text" placeholder="Create username" onChange={handleSignUpUserChange}/>
                    </div>
                    <div className="input-container">
                        <input className="input" type="text" placeholder="Create password" onChange={handleSignUpPassChange}/>
                    </div>
                    <div className="input-container">
                        <input className="submit-button" type="submit" onClick={handleSignUpSubmit} />
                    </div>
                </div>
            :   <div>
                    <h1>Login</h1>
                    <div className="input-container">
                        <button className="redirect" onClick={handleRedirect}>Don't have an account yet? Let's sign you up!</button>
                    </div>
                    {loginSuccess ? ''
                    :
                        <div className="invalid-login-container">
                            <p className="invalid-login">Username or password is invalid</p>
                        </div>
                    }
                    <div className="input-container">
                        <input className="input" type="text" placeholder="Username" onChange={handleUserChange}/>
                    </div>
                    <div className="input-container">
                        <input className="input" type="text" placeholder="Password" onChange={handlePassChange}/>
                    </div>
                    <div className="input-container">
                        <input className="submit-button" type="submit" onClick={() => checkLoginData()}/>
                    </div>
                </div>
            }
        </div>
    )
}

export default Login;