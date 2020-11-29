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
import HorizontalScroll from 'react-scroll-horizontal'
import StickyBox from "react-sticky-box";
// import { FlatList } from 'react-native-gesture-handler';
// import ReactScrollbar from 'react-scrollbar-js';

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
        if(fighterARoundScore == 'winner' || fighterARoundScore == 'defeated'){
            
            console.log('hello')
            setCurrentRound(props.numberOfRounds + 1)
            setFighterATotal('-')
            setFighterBTotal('-')

        }
        else{
            setCurrentRound(previousRound + 2)
            setPreviousRound(currentRound -1)
            setFighterATotal(Number.parseInt(fighterATotal) + Number.parseInt(fighterARoundScore))
            setFighterBTotal(Number.parseInt(fighterBTotal) + Number.parseInt(fighterBRoundScore))
            setFighterARoundScore(10)
            setFighterBRoundScore(10)
            setRoundNotes('')
        }
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

    const doReturn = () => {
        history.push('/')   
    }

    const cancelFight = () => {
        
        //history.push('/newfight')
        window.location.reload();
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
    // console.log(scores)

    useEffect(() => {
        console.log("SCORE THE FIGHT ", user.user)
        console.log(props.numberOfRounds)
    }, [])

    useEffect(() => {
        setPreviousRound(currentRound - 1)
    }, [currentRound])

    useEffect(() => {
        if(fighterARoundScore > 10 ){
            setFighterARoundScore('winner')
            setFighterBRoundScore('defeated')
        }
        if(fighterARoundScore < 5){
            setFighterARoundScore('defeated')
            setFighterBRoundScore('winner')
        }
    }, [fighterARoundScore])

    useEffect(() => {
        if(fighterBRoundScore > 10 ){
            setFighterBRoundScore('winner')
            setFighterARoundScore('defeated')
        }
        if(fighterBRoundScore < 5){
            setFighterBRoundScore('defeated')
            setFighterARoundScore('winner')
        }
    }, [fighterBRoundScore])

    return (
        <div className="scorefight">
            {/* <StickyBox> */}
            <div className="scorefight__upper">
                
                <div className="scorefight__upperContainer">
                    <div className="scorefight__names">
                        <br />
                        <div className="scorefight__fighterName">{props.fighterA}</div>
                        {/* <br /> */}
                        <div className="scorefight__fighterName">{props.fighterB}</div>
                    </div>
                    <div className="scorefight__roundsContainer">
                
                
          
                    
                    {

                    emptyRounds.map((round, index) => (
                        scores[index] ? 
                            <li
                            style={{
                                display: "inline-block",
                                margin: "20px"
                              }}
                            >
                            <Round 
                                thisRound={index+1}
                                fighterA={props.fighterA}
                                fighterB={props.fighterB}
                                fighterAScore={scores[index].fighterAScore}
                                fighterBScore={scores[index].fighterBScore}
                                notes={scores[index].roundNotes}

                                
                            /> 
                            </li>
                            
                            :
                            <li
                            style={{
                                display: "inline-block",
                                margin: "20px"
                              }}
                            >
                            <Round 
                                thisRound={index+1}
                                fighterA={props.fighterA}
                                fighterB={props.fighterB}
                                fighterAScore={'-'}
                                fighterBScore={'-'}

                                style={{
                                    display: "inline-block",
                                    margin: "20px"
                                  }}
                                //notes={scores[index].roundNotes}
                            />
                            </li>
                            
                        ))
                    }
                        {
                            scores[0]?
                            <li
                            style={{
                                display: "inline-block",
                                margin: "20px"
                              }}
                            >
                            <Round 
                                thisRound={'T'}
                                fighterA={props.fighterA}
                                fighterB={props.fighterB}
                                fighterAScore={fighterATotal}
                                fighterBScore={fighterBTotal}

                                style={{
                                    display: "inline-block",
                                    margin: "20px"
                                  }}
                            />
                            </li>
                            :
                            <li
                            style={{
                                display: "inline-block",
                                margin: "20px"
                              }}
                            >
                            <Round 
                                thisRound={'T'}
                                fighterA={props.fighterA}
                                fighterB={props.fighterB}
                                fighterAScore={'-'}
                                fighterBScore={'-'}

                                style={{
                                    display: "inline-block",
                                    margin: "20px"
                                  }}
                            />
                            </li>
                        }
                        
                </div>
                </div> 
                
            </div>
            
            {/* </ReactScrollbar> */}
            <div className="scorefight__lower">
                <div className="scorefight__lowerleft">
                {
                currentRound <= props.numberOfRounds ?
                    <div>
                    <div className="scorefight__roundLabel">Round {currentRound}</div> 
                    
                    <div className="scorefight__fighterContainer">
                        <div className="scorefight__fighterLabel">{props.fighterA}: </div>
                        
                        <div className="scorefight__scoreContainer">
                            <div className="scorefight__fighterScoreBox"
        >
                                <TextField 
                                    id="outlined-required"
                                    // label="Weightclass"
                                    variant="outlined"
                                    type="string"
                                    height="10px"
                                    value={fighterARoundScore}
                                    onChange={e => setFighterARoundScore(e.target.value)}
                                    max="10"
                                    InputProps={{readOnly:true}}
                                    color='primary'
                                />
                            </div>
                            <div className="scorefight__scoreUpDown">
                                <div
                                    className="scorefight__scoreUp"
                                    onClick={e => {
                                        if(fighterARoundScore == 'winner'){
                                            //setFighterARoundScore(fighterARoundScore+1)
                                        }
                                        else if(fighterARoundScore == 'defeated'){
                                            setFighterARoundScore(5)
                                            setFighterBRoundScore(10)
                                        }
                                        else{
                                            setFighterARoundScore(fighterARoundScore+1)
                                        }
                                    }}
                                >
                                    +
                                </div>
                                <div
                                    className="scorefight__scoreDown"
                                    onClick={e => {
                                        if(fighterARoundScore == 'defeated'){

                                        }
                                        else if(fighterARoundScore == 'winner'){
                                            setFighterARoundScore(10)
                                            setFighterBRoundScore(9)
                                        }
                                        else
                                            setFighterARoundScore(fighterARoundScore-1)
                                    
                                    }}
                                >
                                    -
                                </div>
                            </div>
                        </div>
                    </div>

                    

                    <div className="scorefight__fighterContainer">
                        <div className="scorefight__fighterLabel">{props.fighterB}: </div>
                            <div className="scorefight__scoreContainer">
                                <div className="scorefight__fighterScoreBox">
                            

                                    <TextField 
                                        id="outlined-required"
                                        // label="Weightclass"
                                        variant="outlined"
                                        type="number"
                                        height="10px"
                                        value={fighterBRoundScore}
                                        onChange={e => setFighterBRoundScore(e.target.value)}
                                        type="string"
                                        InputProps={{readOnly:true}}
                                    />
                                </div>
                                    <div className="scorefight__scoreUpDown">
                                        <div
                                            className="scorefight__scoreUp"
                                            onClick={e => {
                                                if(fighterBRoundScore == 'winner'){
                                                    //console.log('hgjgjhgkg')
                                                    //setFighterBRoundScore(fighterBRoundScore+1)
                                                }
                                                else if(fighterBRoundScore == 'defeated'){
                                                    //console.log('OKKKK')
                                                    setFighterBRoundScore(5)
                                                    setFighterARoundScore(10)
                                                }
                                                else{
                                                    //console.log('gjgjgjg')
                                                    //if(fighterBRoundScore !== 'defeated')    
                                                        setFighterBRoundScore(fighterBRoundScore+1)
                                                    //else
                                                        //setFighterBRoundScore('5')
                                                }
                                            
                                            }}
                                        >
                                            +
                                        </div>
                                        <div
                                            className="scorefight__scoreDown"
                                            onClick={e => {
                                                if(fighterBRoundScore == 'defeated'){
                                                    //setFighterBRoundScore(fighterBRoundScore-1)
                                                }
                                                else if(fighterBRoundScore == 'winner'){
                                                    setFighterBRoundScore(10)
                                                    setFighterARoundScore(9)
                                                }
                                                else
                                                    setFighterBRoundScore(fighterBRoundScore-1)
                                            }}
                                        >
                                            -
                                        </div>
                                    </div>
                                {/* </div> */}
                            
                            </div>
                    </div>
                    <div className="scorefight__notes">
                        <TextField
                        id="filled-textarea"
                        className="scorefight__notes"
                        rows="5"
                        // label="Multiline Placeholder"
                        placeholder="Notes for this round.."
                        multiline
                        variant="filled"
                        value={roundNotes}
                        onChange={event => setRoundNotes(event.target.value)}
                    />
                    </div>
                    <div className="scorefight__submit">
                    <Button
                        onClick={submitRound}
                        variant="contained"
                        color="primary"
                        // fullWidth="40px"
                    >
                        Submit
                    </Button>
                    </div>
                    <div className="scorefight__submit">
                    <Button
                        onClick={cancelFight}
                        variant="contained"
                        color="secondary"
                        // fullWidth="40px"
                    >
                        Cancel
                    </Button>
                    </div>
                    </div>
                :
                
                user !== '' ?
                <>
                    <div className="scorefight__saveCard">
                    <Button
                        onClick={saveScorecard}
                        variant="contained"
                        color="primary"
                    >
                        Save Scorecard
                    </Button>
                    </div>
                    <div className="scorefight__return">
                    <Button
                        onClick={doReturn}
                        variant="contained"
                        color="primary"
                    >
                       Return
                    </Button>
                    </div>
                </>
                :
                <div>
                <div>Login to save Scorecard</div>
                <div>Return to Main</div>
                </div>
                
                
                }
                </div>
                <div className="scorefight__lowerright">
                {/* <TextField
                    id="filled-textarea"
                    // label="Multiline Placeholder"
                    placeholder="Notes for this round.."
                    multiline
                    variant="filled"
                    value={roundNotes}
                    onChange={event => setRoundNotes(event.target.value)}
                /> */}
                </div>
            </div>
        </div>
    )
}
