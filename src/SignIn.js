import React, { useState, useEffect } from 'react'
import './SignIn.css'
import { auth } from './firebase.js'
import { useHistory } from 'react-router-dom'
import { useStateValue } from './StateProvider.js'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'

export default function SignIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [user, dispatch] = useStateValue()

    const history = useHistory()

    const signIn = e => {
        e.preventDefault();
        if(email == '' || password == ''){
            alert("Please fill out both fields")
        }else{

        auth    
            .signInWithEmailAndPassword(email, password)
            .then(auth => {
                dispatch({
                    type: 'LOGIN',
                    user: email
                })
                history.push('/newfight')
            })
            .catch(
                error => alert(error.message)
            )
        
        }

    }

    const signUp = e => {
        e.preventDefault();

        if(email == '' || password == ''){
            alert("Please fill out both fields")
        }
        else{

        auth
            .createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                console.log(auth)
                if(auth){
                    history.push('/newfight')
                }
            })
            .catch(
                error => alert(error.message)
            )
        }

    }

    const skip = e => {
        //alert('yo')
        history.push('/newfight')
    }

    useEffect(() => {
        dispatch({
            type: 'LOGOUT'
        })
    }, [])

    return (
        <div className="signin">
            <h1>Sign-In</h1>
            <form>
                <TextField 
                    id="outlined-helperText"
                    label="email"
                    type="email"
                    varient="outlined"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                {/* <h5>Email</h5>
                <input 
                    type="text"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    
                /> */}
                <br />
                <TextField 
                    id="outlined-helperText"
                    label="password"
                    type="password"
                    varient="outlined"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                {/* <h5>Password</h5>
                <input 
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    
                /> */}
                <br />
                <div className="signin__buttons">
                    {/* <button className="signin__signInButton"
                        onClick={signIn}>Sign In</button>
                    <button className="signin__signUpButton"
                         onClick={signUp}>Sign Up</button> */}
                         <div className="signin__signInButton">
                         <Button
                            variant="contained"
                            color="primary"
                            fullWidth="100px"
                            onClick={signIn}
                         >
                             Sign In

                         </Button>
                         </div>
                         <div className="signin__signUpButton">
                         <Button
                            variant="contained"
                            color="primary"
                            fullWidth="100px"
                            onClick={signUp}
                         >
                             Sign Up

                         </Button>
                         </div>
                         
                         {/* <div 
                            className="signin__skip"
                            onClick={skip}
                         >
                             SKIP
                         </div> */}
                         
                </div>

            </form>

            
            
        </div>
    )
}
