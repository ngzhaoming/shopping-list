const express = require('express');
const mongoose = require('mongoose');

//Take request and take data from the body
const bodyParser = require('body-parser');

const items = require('./routes/api/items');

const app = express();

//Bodyparser Middleware
app.use(bodyParser.json());

//DB config connect using the js file that contains all the keys
const db = require('./config/keys').mongoURI;

//Connect to Mongo using a promise
mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));

//Use Routes to divert any request to the item api
app.use('/api/items', items);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));