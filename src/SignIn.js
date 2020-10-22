import React, { useState } from 'react'
import './SignIn.css'
import { auth } from './firebase.js'
import { useHistory } from 'react-router-dom'

export default function SignIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const history = useHistory()

    const signIn = e => {
        e.preventDefault();
        auth    
            .signInWithEmailAndPassword(email, password)
            .then(auth => {
                history.push('/newfight')
            })
            .catch(
                error => alert(error.message)
            )

    }

    const signUp = e => {
        e.preventDefault();

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

    return (
        <div className="signin">
            <h1>Sign-In</h1>
            <form>
                <h5>Email</h5>
                <input 
                    type="text"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    
                />
                <br />
                <h5>Password</h5>
                <input 
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    
                />
                <br />
                <button className="signin__signInButton"
                    onClick={signIn}>Sign In</button>
                <button className="signin__signUpButton"
            onClick={signUp}>Sign Up</button>

            </form>

            
            
        </div>
    )
}
