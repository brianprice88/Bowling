import React from 'React'

var Pins = (props) => {

    var rollBall = () => { // get the value of the roll, stop the spinner and let the parent component know, then stop/restart the random # generator with updated # of pins
        var roll = document.getElementById('spinner').innerHTML;
        props.rollScore(roll);
        clearInterval(start);
        start;
    }

    var randomNumberGenerator = () => { // pick a random number of pins from 0 to number of pins left, and display that in the spinner
        var randomNumber = Math.floor(Math.random() * props.pinsRemaining + 1);
        if (document.getElementById('spinner')) {
        document.getElementById('spinner').innerHTML = randomNumber
        }
    }
   var start = setInterval(randomNumberGenerator, 200) // keep changing the number in the spinner

    return (
        <div className='row' style={{marginLeft: '200px'}}>
            <button onClick={() => rollBall()} className="btn btn-primary" style={{ height: '200px', width: '200px'}}>
                <span id='spinner' style={{ width: "3rem", height: "3rem" }} className="spinner-border spinner-border-sm"></span>
                        Click to knock over pins!
                    </button>
            <div>
            </div>
            <div className='row' style={{marginLeft: '100px'}}>
                {Array.from(Array(props.pinsRemaining)).map((pin, index) => <i className="pin" key={index}></i>)}
            </div>
        </div>
    )
}

export default Pins