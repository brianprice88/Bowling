import React from 'React';

var FinalScore = (props) => {
    const userScore = props.userScore;
    const highScore = props.highScore;
    return (
        <div className='container-fluid p-3 my-3'>
            <button style={{ marginLeft: '35%', marginTop: '20px' }} type="button" className="btn btn-primary" data-toggle="modal" data-target="#myModal">
                View your score
</button>
            <div className="modal" id="myModal">
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h4 className="modal-title">You scored {userScore}!</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>

                        <div className="modal-body">
                            {userScore >= highScore ? <h4>Congratulations on getting the high score!</h4> : <h4>Good job, but you can still do better!</h4>}
                        </div>

                        <div className="modal-footer">
                            <button onClick={props.startGame} type="button" className="btn btn-danger" data-dismiss="modal">Start a new game</button>
                            <button onClick={props.changePlayer} type="button" className="btn btn-danger" data-dismiss="modal">New player?</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default FinalScore