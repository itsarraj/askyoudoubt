const express = require('express');
const app = express();
require('dotenv').config();

const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');

const expressLayouts = require('express-ejs-layouts');
const db = require('./config/database.js');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportLocal = require('./config/passport-local-strategy.js');
const MongoStore = require('connect-mongo');

const path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/', express.static(path.join(__dirname, 'assets')));

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(expressLayouts);

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use(
    session({
        name: 'askyourdoubt',
        secret: process.env.SESSION_COOKIE_KEY,
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: 10 * 60 * 1000, // 10 minutes
        },
        store: MongoStore.create(
            {
                mongoUrl: process.env.MONGO_URL,
                mongooseConnection: db,
                autoRemove: 'disabled',
            },
            function (err) {
                console.log(err || 'connect-mongodb', err.message);
            }
        ),
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use('/', require('./routes/index.js'));

const port = process.env.PORT || 8000;
app.listen(port, (error) => {
    if (error) {
        console.error(error);
    }
    console.log('[ Server Started & Listening on ' + port + ' ] ');
});
