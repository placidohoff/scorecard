import React from 'react';
import './Round.css';
import { Button } from '@material-ui/core';

export default function Round(props) {
    const showNotes = e => {
        alert(props.notes)
    }

    return (
        <div className="round">
            <div className="round__thisRound">{props.thisRound}</div>
            <div className="round__fighterAScore">{props.fighterAScore}</div>
            <div className="round__fighterBScore">{props.fighterBScore}</div>
            {
                props.notes ?
                <div
                    className="round__star"
                    onClick={showNotes}
                >
                    

                      *
                    
                </div>
                :
                <div></div>
            }
        </div>
    )
}
