import React, { useState, useEffect } from 'react'
import './MakeNewFight.css'
import { Button } from '@material-ui/core';
import firebase from 'firebase'
import { db } from './firebase.js'
import { useHistory } from 'react-router-dom'
import ScoreFight from './ScoreFight.js'
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';
import TextField from '@material-ui/core/TextField';
import { useStateValue } from './StateProvider.js'
import { Link } from 'react-router-dom'

export default function MakeNewFight(props) {
    const [fighterA, setFighterA] = useState('')
    const [fighterB, setFighterB] = useState('')    
    const [numberOfRounds, setNumberOfRounds] = useState('')    
    const [weightClass, setWeightClass] = useState('')    
    const [extraNotes, setExtraNotes] = useState('')  
    const [isFightMade, setIsFightMade] = useState(false)

    const [user, dispatch] = useStateValue()

    const history = useHistory();
    //const isFightMade = false;

    const makeFight = e => {
        if(fighterA == '' || fighterB == '' || numberOfRounds == '' || weightClass == '')
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

    useEffect(() => {
        if(user){
            console.log(props.user)
            dispatch({
                type: 'LOGIN',
                user: props.user
            })

            console.log("YOOOOOOOOOOO ", user)
            //setUser
            //console.log(user.user)
            //alert(user.user.email)
        }else{
            history.push('/')
        }
    }, [])

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
            user={props.user}
         />
             :
            <div className="newFight__isFightMadeFalse">
            <div>
                <label>Fighter A: </label>
                <input
                    value={fighterA}
                    onChange={event => setFighterA(event.target.value)}
                />
            </div>

            <div>
                <label>Fighter B: </label>
                <input
                    value={fighterB}
                    onChange={event => setFighterB(event.target.value)}
                />
            </div>

            <div>
                <label>Number of Rounds: </label>
                <input 
                    value={numberOfRounds}
                    onChange={event => setNumberOfRounds(parseInt(event.target.value))}
                />
            </div>

            <div>
                <label>Weight Class: </label>
                <input 
                    value={weightClass}
                    onChange={event => setWeightClass(event.target.value)}
                />
            </div>

            <div>
                <label>Extra Notes: </label>
                {/* <input 
                    value={extraNotes}
                    onChange={event => setExtraNotes(event.target.value)}
                /> */}
                 <TextField
                    id="filled-textarea"
                    // label="Multiline Placeholder"
                    //placeholder="Placeholder"
                    multiline
                    variant="filled"
                    value={extraNotes}
                    onChange={event => setExtraNotes(event.target.value)}
                />

            </div>
            <Button
                onClick={makeFight}
            >
                Make Fight
            </Button>
        </div>
        }
        {
            user  && !isFightMade?
        <div>
            <span>Welcome {user.user   }</span><br />
            <Link to="/scores">

                <span>Click here to see your scorecards</span>

            </Link>
        </div>
        :
        <div></div>
        }
        </div>
    )
}

