const mongoose = require('mongoose');
const mongoURI ="mongodb+srv://amit:amit@cluster0.0sdqs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

const connectToMongo = ()=>{
    mongoose.connect(mongoURI , ()=>{
        console.log("connected to mongo succesfully");
    })
}

module.exports = connectToMongo;