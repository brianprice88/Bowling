import React from 'React';
import Pins from './pins.jsx'

class Scorecard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            frame: 1,
            roll: 1,
            totalScore: 0,
            pinsRemaining: 10,
            madeStrike: 0,
            madeSpare: false
        }
        this.rollScore = this.rollScore.bind(this);
        this.frameScore = this.frameScore.bind(this);
    }

    rollScore(score) { // fill in the current frame/roll based on the player's score
        var frame = this.state.frame;
        score = parseInt(score)
        if (this.state.roll === 1 && score === 10) { // for a strike...
            document.getElementById(`frame${frame}roll2`).innerHTML = 'X';
            if (!this.state.madeStrike && !this.state.madeSpare) { // if no previous strike or spare, just note this was a strike
                this.setState({
                    frame: frame + 1,
                    roll: 1,
                    pinsRemaining: 10,
                    madeStrike: 1
                })
            } else if (this.state.madeSpare) { // if a previous spare, then previous frame is scored a 20 and add a strike
                var prevFrame = this.state.totalScore + 20;
                document.getElementById(`score${frame - 1}`).innerHTML = prevFrame;
                this.setState({
                    frame: frame + 1,
                    roll: 1,
                    pinsRemaining: 10,
                    madeStrike: madeStrike + 1,
                    madeSpare: false
                })
            } else if (this.state.madeStrike) { // if previous roll or two were strikes:
                if (this.state.madeStrike === 1) { // if two straight strikes, note that for the next roll
                    this.setState({
                        frame: frame + 1,
                        roll: 1,
                        pinsRemaining: 10,
                        madeStrike: 2,
                        madeSpare: false
                    })
                } else if (this.state.madeStrike === 2) { // if three straight strikes, then two strikes ago scores a 30
                    var threeFramesAgo = parseInt(document.getElementById(`score${frame - 3}`).innerHTML);
                    document.getElementById(`score${frame - 2}`).innerHTML = threeFramesAgo + 30;
                    this.setState({
                        frame: frame + 1,
                        roll: 1,
                        pinsRemaining: 10,
                        madeStrike: 3,
                        madeSpare: false
                    })
                }
            }
            if (this.state.frame === 10) { // if this is the 10th frame, just score it a 10 and exit the game
                var newtotalScore = this.state.totalScore + 10;
                this.setState({
                    frame: 1,
                    roll: 1,
                    pinsRemaining: 10,
                    totalScore: 0,
                    madeSpare: false,
                    madeStrike: 0
                }, () => this.props.endGame(newtotalScore))
            };
        } else if (this.state.roll === 1 && score !== 10) { // for first roll non-strike: add that score to card, move to roll 2, adjust pins remaining
            document.getElementById(`frame${frame}roll1`).innerHTML = score
            var newPinsRemaining = this.state.pinsRemaining - score;
            this.setState({
                roll: 2,
                pinsRemaining: newPinsRemaining
            })
        } else if (this.state.roll === 2) { // for second roll, add that score to card then get frame score
            document.getElementById(`frame${frame}roll2`).innerHTML = score
            this.frameScore();
        }
    }

    frameScore() { // record the frame score based on the two previous rolls
        var frame = this.state.frame;
        var roll1 = parseInt(document.getElementById(`frame${frame}roll1`).innerHTML);
        var roll2 = parseInt(document.getElementById(`frame${frame}roll2`).innerHTML);
        var totalScore = this.state.totalScore;

        if (frame !== 10) { // if this isn't the last frame, we will move to the next frame after getting frame score
            if (roll1 + roll2 === 10) { // if it's a spare, fill in the slash and note spare for the next frame
                document.getElementById(`frame${frame}roll2`).innerHTML = '/';
                if (this.state.madeStrike === 1) { // if prev roll was a strike then that gets a score of 20
                    var prevFrame = document.getElementById(`score${frame - 2}`).innerHTML;
                    document.getElementById(`score${frame - 1}`).innerHTML = prevFrame + 20
                }
                this.setState({
                    frame: frame + 1,
                    roll: 1,
                    pinsRemaining: 10,
                    madeSpare: true,
                    madeStrike: 0
                })
            } else { // if not a spare...
                if (this.state.madeStrike === 1) { // previous frame was a strike, then previous frame is 10 + both rolls from this time
                    var prevFrame = totalScore + 10 + roll1 + roll2;
                    document.getElementById(`score${frame - 1}`).innerHTML = prevFrame;
                    var newtotalScore = roll1 + roll2 + prevFrame;
                    document.getElementById(`score${frame}`).innerHTML = newtotalScore;
                }
                else if (this.state.madeSpare) { // the previous frame was a spare, then previous frame is 10 + roll1 from this frame
                    var prevFrame = totalScore + 10 + roll1;
                    document.getElementById(`score${frame - 1}`).innerHTML = prevFrame;
                    var newtotalScore = roll1 + roll2 + prevFrame;
                    document.getElementById(`score${frame}`).innerHTML = newtotalScore;
                } else { // if prev frame wasn't spare and neither are these:
                    var newtotalScore = roll1 + roll2 + totalScore;
                    document.getElementById(`score${frame}`).innerHTML = newtotalScore;
                }
                this.setState({
                    frame: frame + 1,
                    roll: 1,
                    totalScore: newtotalScore,
                    pinsRemaining: 10,
                    madeSpare: false,
                    madeStrike: 0
                })
            }
        }
        else if (frame === 10) { // if this is the last frame, we end the game after calculating frame score
            if (roll1 + roll2 === 10) { // if it's a spare then give it a score of 10, though in reality this would be 11th frame
                document.getElementById(`frame${frame}roll2`).innerHTML = '/';
                var newtotalScore = this.state.totalScore + 10;
                this.setState({
                    frame: 1,
                    roll: 1,
                    pinsRemaining: 10,
                    totalScore: 0,
                    madeSpare: false,
                    madeStrike: 0
                }, () => this.props.endGame(newtotalScore))
            } else { // if not a spare, treat it like other frames but end game / reset after:
                if (this.state.madeStrike === 1) { // previous frame was a strike, then previous frame is 10 + both rolls from this time
                    var prevFrame = totalScore + 10 + roll1 + roll2;
                    document.getElementById(`score${frame - 1}`).innerHTML = prevFrame;
                    var newtotalScore = roll1 + roll2 + prevFrame;
                    document.getElementById(`score${frame}`).innerHTML = newtotalScore;
                }
                else if (this.state.madeSpare) { // if the previous frame was a spare, then previous frame is 10 + roll1 from this frame
                    var prevFrame = totalScore + 10 + roll1;
                    document.getElementById(`score${frame - 1}`).innerHTML = prevFrame;
                    var newtotalScore = roll1 + roll2 + prevFrame;
                    document.getElementById(`score${frame}`).innerHTML = newtotalScore;
                } else { // if prev frame wasn't spare:
                    var newtotalScore = roll1 + roll2 + totalScore;
                    document.getElementById(`score${frame}`).innerHTML = newtotalScore;
                }
                this.setState({
                    frame: 1,
                    roll: 1,
                    pinsRemaining: 10,
                    totalScore: 0,
                    madeSpare: false,
                    madeStrike: 0
                }, () => this.props.endGame(newtotalScore))
            };
        }
    }

    render() {
        return (
            <div className='container'>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th onClick={() => this.rollScore(4)}>Player</th>
                            <th colSpan='6'>1</th>
                            <th colSpan='6'>2</th>
                            <th colSpan='6'>3</th>
                            <th colSpan='6'>4</th>
                            <th colSpan='6'>5</th>
                            <th colSpan='6'>6</th>
                            <th colSpan='6'>7</th>
                            <th colSpan='6'>8</th>
                            <th colSpan='6'>9</th>
                            <th colSpan='6'>10</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ fontSize: '20px', fontStyle: 'italic', color: 'red' }} rowSpan='6'>{this.props.player}</td>
                            <td id="frame1roll1" colSpan='3'></td>
                            <td id="frame1roll2" colSpan='3'></td>
                            <td id="frame2roll1" colSpan='3'></td>
                            <td id="frame2roll2" colSpan='3'></td>
                            <td id="frame3roll1" colSpan='3'></td>
                            <td id="frame3roll2" colSpan='3'></td>
                            <td id="frame4roll1" colSpan='3'></td>
                            <td id="frame4roll2" colSpan='3'></td>
                            <td id="frame5roll1" colSpan='3'></td>
                            <td id="frame5roll2" colSpan='3'></td>
                            <td id="frame6roll1" colSpan='3'></td>
                            <td id="frame6roll2" colSpan='3'></td>
                            <td id="frame7roll1" colSpan='3'></td>
                            <td id="frame7roll2" colSpan='3'></td>
                            <td id="frame8roll1" colSpan='3'></td>
                            <td id="frame8roll2" colSpan='3'></td>
                            <td id="frame9roll1" colSpan='3'></td>
                            <td id="frame9roll2" colSpan='3'></td>
                            <td id="frame10roll1" colSpan='3'></td>
                            <td id="frame10roll2" colSpan='3'></td>
                        </tr>
                        <tr>
                            <td colSpan='6' id="score1"></td>
                            <td colSpan='6' id="score2"></td>
                            <td colSpan='6' id="score3"></td>
                            <td colSpan='6' id="score4"></td>
                            <td colSpan='6' id="score5"></td>
                            <td colSpan='6' id="score6"></td>
                            <td colSpan='6' id="score7"></td>
                            <td colSpan='6' id="score8"></td>
                            <td colSpan='6' id="score9"></td>
                            <td colSpan='6' id="score10"></td>
                        </tr>
                    </tbody>
                </table>
                <Pins pinsRemaining={this.state.pinsRemaining} rollScore={this.rollScore} />
            </div>
        )
    }
}

export default Scorecard