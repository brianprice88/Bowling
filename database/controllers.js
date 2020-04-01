const Bowling = require('./scores.js')
const controllers = {
    addScore: (req, res) => {
        const { name, score } = req.body;
        return Bowling.create({ name, score })
            // return the high score to see if new score beats it
            .then(result => Bowling.find({}).sort({ score: -1 }).limit(1))
            .then(data => res.status(200).send(data))
            .catch(err => res.status(400).send(err))
    },
    getScores: (req, res) => {
        return Bowling.find({}).sort({ score: -1 }).limit(10)
            .then(data => res.status(200).send(data))
            .catch(err => res.status(400).send(err))
    }
}


module.exports = controllers;