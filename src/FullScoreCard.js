import React, { useState } from 'react'
import './FullScoreCard.css'
import Round from './Round.js'
import { Button } from '@material-ui/core'

export default function FullScoreCard(props) {
    const [rounds, setRounds] = useState(props.rounds)

    //console.log(props)
    return (
        <div className="fullscorecard">
            <div className="fullscorecard__container">
                <div className="fullscorecard__names">
                    {/* <br/> */}
                    <div className="fullscorecard__nameA">{props.fighterA}</div>
                    <br />
                    <div className="fullscorecard__nameB">{props.fighterB}</div>
                </div>
                <div className="fullscorecard__rounds">
                {
                rounds.map((round, index) => (
                    index == rounds.length ? 
                    <Round 
                        thisRound={'T'}
                        fighterA={props.fighterA}
                        fighterB={props.fighterB}
                        fighterAScore={props.fighterATotal}
                        fighterBScore={props.fighterBTotal}
                    />
                    :
                    <Round 
                        thisRound={index+1}
                        fighterA={props.fighterA}
                        fighterB={props.fighterB}
                        fighterAScore={round.fighterAScore}
                        fighterBScore={round.fighterBScore}
                        notes={round.roundNotes}
                    />
                ))
                
                 
                }
                 <Round 
                        thisRound={'T'}
                        fighterA={props.fighterA}
                        fighterB={props.fighterB}
                        fighterAScore={props.fighterATotal}
                        fighterBScore={props.fighterBTotal}
                    />
                
            </div>
            </div>
            
            <div className="fullscorecard__delete">
                {/* <Button
                    color="secondary"
                    variant="contained"
                    fullWidth="50px"
                    size="small"
                >
                    DELETE
                </Button> */}
                
            </div>
        </div>
        
        
    )
}
