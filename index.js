const express = require('express');
const app = express();
require('dotenv').config();

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/database.js');
const path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', express.static(path.join(__dirname, 'assets')));

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(expressLayouts);

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use('/', require('./routes/index'));

const port = process.env.PORT || 8000;
app.listen(port, (error) => {
    if (error) {
        console.error(error);
    }
    console.log('Server Started & Listening on  ' + port);
});
