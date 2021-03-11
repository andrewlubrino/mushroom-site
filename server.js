const express = require('express');
const app = express();
const User = require('./models/user');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const mongoose = require('mongoose');
const api = require('./routes/api.js');
const users = require('./routes/users.js');
const posts = require('./routes/posts.js');
const flash = require('flash');
const bodyParser = require('body-parser');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true}).catch(err => console.log(err));

app.use(express.static(path.join(__dirname, "client", "build")))
app.use(express.static(path.join(__dirname, "views")))

app.use(bodyParser.urlencoded({ extended: false }));


const sessionOptions = {secret: process.env.SECRET, resave: false, saveUnitialized: false}
app.use(session(sessionOptions))
app.use(flash());

app.use(passport.initialize())
app.use(passport.session(sessionOptions));
passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use('/api', api);
app.use('/users', users);
app.use('/', posts);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"))
})

app.listen(3000, () => {
    console.log("listening on 3000!")
})