import React, { useState } from 'react'
import './FullScoreCard.css'
import Round from './Round.js'

export default function FullScoreCard(props) {
    const [rounds, setRounds] = useState(props.rounds)

    //console.log(props)
    return (
        <div className="fullscorecard">
            
            <div className="fullscorecard__names">
                <br />
                <span>{props.fighterA}</span>
                <br />
                <span>{props.fighterB}</span>
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
    )
}
