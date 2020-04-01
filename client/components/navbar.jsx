import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
    const linkStyle = {
        margin: '0 auto',
        fontSize: '30px',
        fontWeight: 'bold',
    }
    return (
        <div className="navbar navbar-expand-sm bg-light justify-content-center">
            <Link to='/' style={linkStyle} >New Game</Link>
            <h1><span className="badge badge-secondary">Bowling!</span></h1>
            <Link to='/highscores' style={linkStyle}>High Scores</Link>
        </div>
    )
}

export default Navbar