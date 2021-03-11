var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const User = require('../models/user.js');
const path = require('path');
const passport = require('passport');

router.use(bodyParser.urlencoded({ extended: false }));

router.route('/register')
   .get((req, res) => {
       res.sendFile(path.join(__dirname, "../views", "register-form.html"))
   })
   .post(async (req, res) => {
       try{
            const {email, username, password} = req.body;
            const user = new User({email, username})
            const newUser = await User.register(user, password);
            req.flash('success', 'Success! You will be redirected back to the home page...');
            res.redirect('/');
       } catch(e){
            req.flash('error', e.message);
            res.redirect('register')
       }
   })

router.route('/login')
    .get((req, res) =>{
       res.sendFile(path.join(__dirname, "../views", "login-form.html"))
   })
    .post(passport.authenticate('local'), (req, res, next) => {
        console.log(req.user)
        res.redirect('/')
    });

router.get('/logout', (req, res) =>{
    req.logout();
    res.redirect('/')
})

module.exports = router;