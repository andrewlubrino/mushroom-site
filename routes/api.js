var express = require('express');
var router = express.Router();
const Mushroom = require('../models/mushroom.js');
const path = require('path');
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));

router.get('/', (req, res) => {
    const mushroom = Mushroom.find({}, (err, docs) => {
        res.send(docs)
    });
})

router.get('/image/:image', (req, res) => {
    res.sendFile(path.join(__dirname, '../uploads', req.params.image))
})

router.get('/user', (req, res) => {
    if(req.isAuthenticated()){
        return res.send(req.user);
    } else {
        return res.send(false)
    }
    
})

module.exports = router;