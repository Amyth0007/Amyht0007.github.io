const mongoose = require('mongoose');
const mongoURI ="mongodb+srv://Amit:Amit007@cluster0.hvyfo.mongodb.net/death_mote"

const connectToMongo = ()=>{
    mongoose.connect(mongoURI , ()=>{
        console.log("connected to mongo succesfully");
    })
}

module.exports = connectToMongo;