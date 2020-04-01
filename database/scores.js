const mongoose = require('mongoose');

const mongoUri = 'mongodb://localhost/bowling'

mongoose.connect(mongoUri, { useNewUrlParser: true });

const bowlingSchema = new mongoose.Schema({
    name: { type: String},
    score: { type: Number}
})

module.exports = mongoose.model('Bowling', bowlingSchema);
