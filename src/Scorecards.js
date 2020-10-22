import React, { useEffect, useState } from 'react'
import './Scorecards.css'
import {db} from './firebase.js'
import FullScoreCard from './FullScoreCard.js'
import { useStateValue } from './StateProvider.js'
import { Link } from 'react-router-dom';


export default function Scorecards() {
    const [scorecards, setScorecards] = useState([])
    const [filteredCards, setFilteredCards] = useState([])
    const [user, dispatch] = useStateValue();

    useEffect(() => {
        db.collection('scorecards')
        .orderBy("timestamp", "asc")
        .onSnapshot(snapshot => {
          setScorecards(snapshot.docs.map(doc => (
            { 
                scorecard: doc.data()
            }
              
              )
              
              ))
        })
        setFilteredCards(
            scorecards.filter(score => score.scorecard.user === user.user)
        )
        console.log(scorecards.filter(score => score.scorecard.user === user.user))

        if(user)
            console.log("Scorecards of ", user)
        else    
            console.log("YOOOOOOOOOOOOO")
      }, [])
      //console.log(scorecards)
    return (
        <div className="scorecards">
            SCORES {user.user}
            {
                
                scorecards.map(scorecard => (
                        scorecard.scorecard.user === user.user?
                        <FullScoreCard 
                            rounds={scorecard.scorecard.scoreCard}
                            fighterA={scorecard.scorecard.fighterA}
                            fighterB={scorecard.scorecard.fighterB}
                            fighterATotal={scorecard.scorecard.fighterATotal}
                            fighterBTotal={scorecard.scorecard.fighterBTotal}
                            key={scorecard.scorecard.fighterA,' ',scorecard.scorecard.fighterB}
                        />
                        :
                        <div></div>
                ))
            }

            <Link to="/newfight">
                <div>Click here to score a new fight</div>
            </Link>
        </div>
    )
}
