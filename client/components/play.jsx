import React from 'React';
import Axios from 'Axios';
import FinalScore from './finalScore.jsx';
import Scorecard from './scorecard.jsx';

export default class Play extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isPlaying: false,
            player: '',
            score: 0,
            highScore: 0,
            endGame: false,
        }
        this.startGame = this.startGame.bind(this);
        this.endGame = this.endGame.bind(this);
        this.changePlayer = this.changePlayer.bind(this);
    }

    changePlayer() { // if player changes their name after finishing one game, reset everything
        this.setState({
            player: '',
            score: 0,
            isPlaying: false,
            endGame: false
        })
    }

    startGame(e) { // start the game once user provides their name, or starting a new game after finishing one.  Also clear the scorecard markup
        e.preventDefault();
        this.setState({
            score: 0,
            isPlaying: true,
            endGame: false,
        }, function() {
            for (var i = 1; i <= 10; i++) {
                document.getElementById(`frame${i}roll1`).innerHTML = '';
                document.getElementById(`frame${i}roll2`).innerHTML = '';
                document.getElementById(`score${i}`).innerHTML = '';
            }         
        })
    }

    endGame(score) { // clear the board, end the game, record the score and retrieve the current high score
        const name = this.state.player;
        Axios.post('/addScore', { name, score })
            .then(res => { this.setState({ score: score, highScore: res.data[0].score || 0, endGame: true }) })
            .catch(err => console.error(err))
    }
    render() {
        return (
            <div className='container-fluid p-3 my-3'>
                {!this.state.isPlaying ? // form for user to enter name
                <div className='container'>
                    <div className="loader">
                    <div className="ball-gradient"></div>
                    <div className="ball">
                        <div className="hole"></div>
                        <div className="hole"></div>
                        <div className="hole"></div>
                    </div>
                    </div>
                    <form style={{marginLeft: '35%', marginTop: '20px'}} className='form-inline' onSubmit={this.startGame}>
                        <input required onChange={(e) => this.setState({ player: e.target.value })} type='text' placeholder='Enter your name' className='form-control' />
                        <button type="submit" className="btn btn-primary">Start game</button>
                    </form>
                    </div>
                    : // once user enters name, show the scorecard
                    <div className = 'container-fluid'>
                    <Scorecard player={this.state.player} endGame = {this.endGame} />
                    </div>
                }
                {this.state.endGame ? // show final score if game is over
                    <FinalScore changePlayer={this.changePlayer} startGame={this.startGame} userScore={this.state.score} highScore={this.state.highScore} />
                    : null
                }
            </div>
        )
    }
}