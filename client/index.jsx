import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Game from './game.jsx'

ReactDOM.render(
    <BrowserRouter>
        <Game />
    </BrowserRouter>, 
    document.getElementById('app')
)