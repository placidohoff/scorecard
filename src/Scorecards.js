import React, { useEffect, useState } from 'react'
import './Scorecards.css'
import {db} from './firebase.js'
import FullScoreCard from './FullScoreCard.js'
import { useStateValue } from './StateProvider.js'
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom'


export default function Scorecards() {
    const [scorecards, setScorecards] = useState([])
    const [filteredCards, setFilteredCards] = useState([])
    const [myScorecards, setMyScorecards] = useState([]);
    const [user, dispatch] = useStateValue();
    const [username, setUsername] = useState(user.user.split('@'));
    const history = useHistory();

    useEffect(() => {
        db.collection('scorecards')
        .orderBy("timestamp", "asc")
        .onSnapshot(snapshot => {
          setScorecards(snapshot.docs.map(doc => (
            { 
                scorecard: doc.data(),
                id: doc.id
                
            }
              
              )
              
              ))
        })

        setUsername(user.user.split('@'))
        console.log(username)
      }, [])
      //console.log(scorecards)
    return (
        <div className="scorecards">
            <div className="scorecards__welcome">Here are your scorecards, <span className="scorecards__username"> {username[0]}</span></div>
            {
                
                    scorecards.map(scorecard => (
                        scorecard.scorecard.user === user.user?
                        
                            <div className="scorecards__container">
                                <div>
                                <FullScoreCard 
                                    rounds={scorecard.scorecard.scoreCard}
                                    fighterA={scorecard.scorecard.fighterA}
                                    fighterB={scorecard.scorecard.fighterB}
                                    fighterATotal={scorecard.scorecard.fighterATotal}
                                    fighterBTotal={scorecard.scorecard.fighterBTotal}
                                    key={scorecard.scorecard.fighterA,' ',scorecard.scorecard.fighterB}
                                />
                                {
                                    myScorecards.length === 0?
                                        setMyScorecards(['We have at least on fight saved'])
                                    :
                                    <></>
                                
                                }
                                </div>
                                <div 
                                    className="scorecards__button"
                                    onClick={e => {db.collection('scorecards').doc(scorecard.id).delete()}}>
                                    <Button
                                        color="secondary"
                                        variant="contained"
                                        fullWidth="20px"
                                        size="small"
                                    >
                                        DELETE
                                    </Button>
                                </div>
                            </div>
                            
                        :
                        <div></div>
                       
                    ))
                    
                // :
                // <div>(You have no saved fights as of yet)</div>
            }
            {
                myScorecards.length === 0 ?
                <div className="scorecards__noFightsSaved">( You don't have any fights saved as of right now )</div>
                :
                <></>
            }

            <div className="scorecards__bottomButtons">
                <div className="scorecards__anotherFight">
                    {
                        myScorecards.length !== 0 ?
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={e => {history.push('/newfight')}}
                        >
                            Score another fight
                        </Button>
                        :
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={e => {history.push('/newfight')}}
                        >
                            Score & Save Your First fight
                        </Button>

                    }
                </div>
                <div className="scorecards__logout">
                <Button
                    color="primary"
                    variant="contained"
                    onClick={e => {history.push('/')}}
                >
                    LOGOUT
                </Button>
            </div>
            </div>
        </div>
    )
}
