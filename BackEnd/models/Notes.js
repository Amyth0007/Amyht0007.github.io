const mongoose = require('mongoose');
const { Schema} = mongoose;
const notesschema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true,
        
    },
    tag:{
        type: String, 
        default: "general"
    },
    date:{
        type: Date,
        default: Date.now
    }
  });

  const Notes = mongoose.model('notes' , notesschema);
  module.exports = Notes;