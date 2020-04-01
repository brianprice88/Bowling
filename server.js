const express = require ('express')
const PORT = process.env.PORT || 3000
const app = express();

const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path')
const controllers = require('./database/controllers.js')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/getScores', controllers.getScores);
app.post('/addScore', controllers.addScore);

app.listen(PORT, () => console.log(`listening on port ${PORT}`));