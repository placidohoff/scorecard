import React, { useState, useEffect } from 'react'
import './MakeNewFight.css'
import Button from '@material-ui/core/Button';
import firebase from 'firebase'
import { db } from './firebase.js'
import { useHistory } from 'react-router-dom'
import ScoreFight from './ScoreFight.js'
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';
import TextField from '@material-ui/core/TextField';
import { useStateValue } from './StateProvider.js'
import { Link } from 'react-router-dom'

export default function MakeNewFight(props) {
    const [fighterA, setFighterA] = useState(' ')
    const [fighterB, setFighterB] = useState(' ')    
    const [numberOfRounds, setNumberOfRounds] = useState(1)    
    const [weightClass, setWeightClass] = useState(200)    
    const [extraNotes, setExtraNotes] = useState('')  
    const [isFightMade, setIsFightMade] = useState(false)

    const [user, dispatch] = useStateValue()
    const [username, setUsername] = useState(props.user.split('@'))

    const history = useHistory();
    //const isFightMade = false;

    const makeFight = e => {
        if(fighterA == '' || fighterA == ' ' || fighterB == '' ||fighterB == ' ' || numberOfRounds == '' || weightClass == '')
            alert('Must fill out all input fields')
        else{
            // db.collection('fights').add({
            //     fighterA: fighterA,
            //     fighterB: fighterB,
            //     numberOfRounds: numberOfRounds,
            //     weightClass: weightClass,
            //     extraNotes: extraNotes,
            //     timestamp: firebase.firestore.FieldValue.serverTimestamp()
            //   })

            //history.push('/scorefight')
            setIsFightMade(true)
        }
    }

    const logout = e => {
        //alert('Hello')
        dispatch({
            type: 'LOGOUT'
        })
        history.push('/')
    }

    useEffect(() => {
        if(user !== ''){
            console.log(user)
            //history.push('/')
            //console.log(props.user)
            // dispatch({
            //     type: 'LOGIN',
            //     user: props.user
            // })

            //console.log("YOOOOOOOOOOO ", user)
            //const username = user.user.split('@')
            if(user !== ''){
            setUsername(
                user.user.split('@')
            )
            }
            console.log(user.user)
            //alert(props.user)
            //setUser
            //console.log(user.user)
            //alert(user.user.email)
        }else{
            history.push('/')
        }
    }, [])

    useEffect(() => {
        console.log(user)
        if(user !== ''){
            setUsername(
                user.user.split('@')
            )
        }
        else{
            //setUsername('Guest')
            history.push('/')
        }
    }, [user])

    useEffect(() => {
        if(numberOfRounds > 15)
            setNumberOfRounds(15)
        if(numberOfRounds < 1)
            setNumberOfRounds(1)
        
    }, [numberOfRounds])

    // useEffect(() => {
    //     alert(username)
    //     // setUsername(
    //     //         props.user.split('@')
    //     //     )
    // },[user])

    //console.log(fighterA, '', fighterB)

    return (
        
        <div className="makeNewFight">
        {
        isFightMade ?
         <ScoreFight 
            fighterA={fighterA}
            fighterB={fighterB}
            numberOfRounds={numberOfRounds}
            weightClass={weightClass}
            extraNotes={extraNotes}
            user={user.user}
         />
             :
            <div className="newFight__isFightMadeFalse">
                {
                     
                        user === "" ?
                            <div className='newfight__welcome'>
                                
                                <div className="welcome__welcome">Welcome <span className="welcome__username">Guest</span></div>
                                
                                <Link to="/scores">
                
                                    {/* <span className="newfight__seeCards">Click here to see your scorecards</span> */}
                
                                </Link>
                                <div 
                                    onClick={logout}
                                    className="newfight__logout"
                                    >
                                        Logout
                                </div>
                            </div>
                        :
                        <div>

                            <div className="welcome__welcome">Welcome <span className="welcome__username">{username[0]}</span></div>
                            <Link to="/scores">
                
                                    <span className="newfight__seeCards">Click here to see your scorecards</span>
                
                                </Link>
                            <Link to="/">
                            <div className="newfight__logout"
                                onClick={e => {dispatch({type: 'LOGOUT'})}}
                            >
                                Click Here to Logout
                            </div>
                            </Link>

                            
                        </div>
                
                }
            <div className="newfight__container">

                <div className="newfight__fighterNames">
                <div className="newfight__field">
                    <div>
                    <TextField 
                        required
                        id="outlined-required"
                        label="Red Corner"
                        variant="outlined"
                        className="newFight__red"
                        value={fighterA}
                        onChange={e => setFighterA(e.target.value)}
                    />
                    </div>

                    <span className="newfight__versus">VS</span>
                    <div>
                    <TextField 
                        required
                        id="outlined-required"
                        label="Blue Corner"
                        variant="outlined"
                        className="newFight__blue"
                        value={fighterB}
                        onChange={e => setFighterB(e.target.value)}
                    />
                    </div>
                    </div>
                </div>

                <div className="newfight__field">
                    <div className="newfight__roundsContainer">
                        <TextField 
                            required
                            id="outlined-required"
                            label="Rounds"
                            variant="outlined"
                            type="number"
                            size="small"
                            rows="10"
                            min="1"
                            max="20"
                            className="newfight__rounds"
                            value={numberOfRounds}
                            onChange={e => setNumberOfRounds(parseInt(e.target.value))}
                        />
                        <div className="newfight__roundsUpDown">
                            <div className="newfight__roundsUp"
                                onClick={e => {setNumberOfRounds(numberOfRounds+1)}}
                            >
                                +
                            </div>
                            <div className="newfight__roundsDown"
                                onClick={e => {setNumberOfRounds(numberOfRounds-1)}}

                            >
                                -
                            </div>
                        </div>
                    </div>

                </div>

                <div className="newfight__field">
                    
                    <TextField 
                        id="outlined-required"
                        label="Weightclass"
                        variant="outlined"
                        type="number"
                        className="newfight__weight"
                        value={weightClass}
                        onChange={e => setWeightClass(e.target.value)}
                    />
                </div>

                <div className="newfight__field">
                    <TextField
                        className="newFight__input"
                        id="filled-textarea"
                        label="Extra Notes"
                        //placeholder="Placeholder"
                        multiline
                        rows="5"
                        variant="filled"
                        value={extraNotes}
                        onChange={event => setExtraNotes(event.target.value)}
                    />

                </div>
                
                <div className="newfight__button">
            <Button
                
                variant="contained"
                color="primary"
                fullWidth="100px"
                onClick={makeFight}
            >
                Make Fight
            </Button>
            </div>
            
            </div>
        
        </div>
        }
        
        </div>
    )
}

