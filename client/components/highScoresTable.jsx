import React from 'React';

var HighScoresTable = (props) => {
    const scores = props.scores.map(score => [score.name, score.score]);
    return (
        <div className = 'container'>
        <div className='table-responsive'>
            <table className='table table-bordered'>
                <thead className='thead-dark'>
                    <tr>
                        <th>Name</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {scores.length > 0 ? scores.map((score, index) => <tr key={index}><td>{score[0]}</td><td>{score[1]}</td></tr>) : null}
                </tbody>
            </table>
        </div>
        </div>
    )
}



export default HighScoresTable