import React, { useState, useEffect } from 'react'
import './ScoreFight.css'
import Round from './Round.js'
import  NumericInput from 'react-numeric-input'
import { Button } from '@material-ui/core';
import {db} from './firebase.js'
import firebase from 'firebase'
import { useHistory } from 'react-router-dom'
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';
import TextField from '@material-ui/core/TextField';
import { useStateValue } from './StateProvider.js'

export default function ScoreFight(props) {

    //const [emptyRounds, setEmptyRounds] = useState(1)
    

    const emptyRounds = [];

    const [rounds, setRounds] = useState(new Array(props.numberOfRounds));
    const [currentRound, setCurrentRound] = useState(1)
    const [previousRound, setPreviousRound] = useState(0)
    const [fighterARoundScore, setFighterARoundScore] = useState(10)
    const [fighterBRoundScore, setFighterBRoundScore] = useState(10)
    const [scores, setScores] = useState([])
    const [fighterATotal, setFighterATotal] = useState(0)
    const [fighterBTotal, setFighterBTotal] = useState(0)
    const [roundNotes, setRoundNotes] = useState('')

    const [user, dispatch] = useStateValue()

    const history = useHistory();

    const submitRound = () => {
        setScores([...scores, {fighterAScore:fighterARoundScore, fighterBScore:fighterBRoundScore, roundNotes: roundNotes}])
        setCurrentRound(previousRound + 2)
        setPreviousRound(currentRound -1)
        setFighterATotal(fighterATotal + fighterARoundScore)
        setFighterBTotal(fighterBTotal + fighterBRoundScore)
        setFighterARoundScore(10)
        setFighterBRoundScore(10)
        setRoundNotes('')
    }

    const saveScorecard = () => {
        db.collection('scorecards').add({
            fighterA: props.fighterA,
            fighterB: props.fighterB,
            scoreCard: scores,
            fighterATotal: fighterATotal,
            fighterBTotal: fighterBTotal,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            user: user.user
        })
        history.push('/scores')
    }

    for(let round of rounds){
        emptyRounds.push(0)
    }
    // const numberOfRounds = () => {
    //     for(let i = 0; i < props.numberOfRounds; i++){
    //         setRounds([...rounds], [])
    //     }
    // }

    //numberOfRounds();
    console.log(scores)

    useEffect(() => {
        console.log("SCORE THE FIGHT ", user.user)
    }, [])

    useEffect(() => {
        setPreviousRound(currentRound - 1)
    }, [currentRound])

    return (
        <div className="scorefight">
            <div className="scorefight__upper">
                <div className="scorefight__names">
                    <br />
                    <span>{props.fighterA}</span>
                    <br />
                    <span>{props.fighterB}</span>
                </div>
                <div className="scorefight__roundsContainer">
                    {
                        //emptyRounds > numRounds ? <h1>Stop</h1> : <h1>FIGHT</h1>
                        emptyRounds.map((round, index) => (
                            scores[index] ? 

                            <Round 
                                thisRound={index+1}
                                fighterA={props.fighterA}
                                fighterB={props.fighterB}
                                fighterAScore={scores[index].fighterAScore}
                                fighterBScore={scores[index].fighterBScore}
                                notes={scores[index].roundNotes}
                            /> 
                            
                            :
                            <Round 
                                thisRound={index+1}
                                fighterA={props.fighterA}
                                fighterB={props.fighterB}
                                fighterAScore={'-'}
                                fighterBScore={'-'}
                                //notes={scores[index].roundNotes}
                            />
                            
                        ))
                    }
                        {
                            scores[0]?
                            <Round 
                                thisRound={'T'}
                                fighterA={props.fighterA}
                                fighterB={props.fighterB}
                                fighterAScore={fighterATotal}
                                fighterBScore={fighterBTotal}
                            />
                            :
                            <Round 
                                thisRound={'T'}
                                fighterA={props.fighterA}
                                fighterB={props.fighterB}
                                fighterAScore={'-'}
                                fighterBScore={'-'}
                            />
                        }
                </div>
            </div>
            <div className="scorefight__lower">
                <div className="scorefight__lowerleft">
                {
                currentRound <= props.numberOfRounds ?
                    <div>
                    <div>Round {currentRound}</div> 
                    
                    <div>{props.fighterA}: 
                    <NumericInput 
                        min={5}
                        max={10}
                        value={fighterARoundScore}
                        onChange={valueAsNumber => setFighterARoundScore(valueAsNumber)}
                    />
                    </div>
                    <div>{props.fighterB}: 
                    <NumericInput 
                        min={5}
                        max={10}
                        value={fighterBRoundScore}
                        onChange={valueAsNumber => setFighterBRoundScore(valueAsNumber)}
                    />
                    </div>
                    <Button
                        onClick={submitRound}
                    >
                        Submit
                    
                    </Button>
                    </div>
                :
                
                <Button
                    onClick={saveScorecard}
                >
                    Save Scorecard
                </Button>
                
                }
                </div>
                <div className="scorefight__lowerright">
                <TextField
                    id="filled-textarea"
                    // label="Multiline Placeholder"
                    placeholder="Notes for this round.."
                    multiline
                    variant="filled"
                    value={roundNotes}
                    onChange={event => setRoundNotes(event.target.value)}
                />
                </div>
            </div>
        </div>
    )
}
