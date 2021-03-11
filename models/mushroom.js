require('dotenv').config();
const mongoose = require('mongoose');
const mongodb = require('mongodb');
const Schema = mongoose.Schema;

const mushroomSchema = new Schema({
    species: String,
    description: String, 
    age: { type: Date, default: Date.now },
    path: String
})

const Mushroom = mongoose.model('Mushroom', mushroomSchema);

module.exports = Mushroom;