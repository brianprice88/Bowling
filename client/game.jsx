import React from 'react'
import HighScores from './components/highScores.jsx';
import Navbar from './components/navbar.jsx';
import Play from './components/play.jsx';
import Error from './components/error.jsx';
import {Route, Switch } from 'react-router-dom';


function Game () {
    return (
        <main className = 'container-fluid'>
            <Navbar />
            <Switch>
            <Route path='/' exact component={Play} />
              <Route path='/highscores' component={HighScores}/>
              <Route component={Error} />
            </Switch>
        </main>
    )
}

export default Game