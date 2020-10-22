import React, { useEffect, useState } from 'react';
import './App.css';
import MakeNewFight from './MakeNewFight.js';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import ScoreFight from './ScoreFight.js'
import Scorecards from './Scorecards.js'
import SignIn from './SignIn.js'

import { auth } from './firebase.js'
import { useStateValue } from './StateProvider.js'


function App() {

  const [{}, dispatch] = useStateValue();
  const [user, setUser] = useState('')

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      console.log('THE USER IS >>>>', authUser.email);

      if(authUser){
        dispatch({
          type: 'LOGIN',
          user: authUser.email
        })
        //setUser(authUser.email)
      }else{
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  }, [])

  return (
    <Router>
      <div className="app">
        <Switch>

        <Route path="/test">
           <h1>Test</h1>
        </Route>

        <Route path="/scorefight">
           <ScoreFight />
        </Route>

        <Route path="/scores">
           <Scorecards />
        </Route>

        <Route path="/newfight">
          <MakeNewFight 
            user={user}
          />
        </Route>

          <Route path="/">
           <SignIn />
         </Route>

          
      </Switch>
      </div>
    </Router>
  );
}

export default App;
