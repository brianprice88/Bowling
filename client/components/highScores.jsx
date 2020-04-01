import React from 'React';
import Axios from 'axios';
import HighScoresTable from './highScoresTable.jsx'

export default class highScores extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            scores: [],
        }
        this.getScores = this.getScores.bind(this);
    }

    getScores() {
        Axios.get('/getScores')
            .then(data => this.setState({ scores: data.data }))
            .catch(err => console.log(err))
    }

    componentDidMount() {
        this.getScores();
    }
    render() {
        return (
            <div className='container-fluid'>
                <div className='row' style={{marginTop: '20px', marginLeft: '145px'}}>
                    <i className="col" className="fa fa-trophy" style={{ marginRight: '75px', marginLeft: '75px', fontSize: "48px", color: "gold" }}></i>
                    <i className="col" className="fa fa-trophy" style={{ marginRight: '75px', marginLeft: '75px', fontSize: "48px", color: "gold" }}></i>
                    <i className="col" className="fa fa-trophy" style={{ marginRight: '75px', marginLeft: '75px', fontSize: "48px", color: "gold" }}></i>
                    <i className="col" className="fa fa-trophy" style={{ marginRight: '75px', marginLeft: '75px', fontSize: "48px", color: "gold" }}></i>
                    <i className="col" className="fa fa-trophy" style={{ marginRight: '75px', marginLeft: '75px', fontSize: "48px", color: "gold" }}></i>
                </div>
                <div className="jumbotron text-center">
                    <HighScoresTable scores={this.state.scores} />
                </div>
            </div>
        )
    }
}
