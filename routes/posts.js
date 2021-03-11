var express = require('express');
var router = express.Router();
const multer = require('multer');
const upload = multer({dest: './uploads/'});
const Mushroom = require('../models/mushroom.js');
const mongoose = require('mongoose');
const mongodb = require('mongodb');
const bodyParser = require('body-parser');
const fs = require('fs')
const path = require('path')

router.use(bodyParser.urlencoded({ extended: false }));

router.post('/photoupload', upload.single('mushroom'), async function (req, res) {
    if(!req.isAuthenticated()){
        fs.unlinkSync(path.join(__dirname, "../uploads", req.file.filename))
        res.redirect('/users/login')
    }else{
        upload.single('mushroom');
        var mushroom = new Mushroom();
        mushroom.species = req.body.species;
        mushroom.description = req.body.description;
        mushroom.path = req.file.filename;
        mushroom.save()
        res.redirect("/")
    }
})

module.exports = router;