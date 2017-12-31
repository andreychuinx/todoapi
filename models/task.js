const mongoose = require('mongoose')
const Schema = mongoose.Schema;

var taskSchema = new Schema({
  name : {
    type : String,
    required : true
  },
  
  description : {
    type : String,
    required : true
  },
  statusCompleted : {
    type : String,
    default : 'unCompleted',
  },
  createdBy : {
    type : Schema.Types.ObjectId,
    ref : 'User'
  },
  updatedBy : {
    type : Schema.Types.ObjectId,
    ref : 'User'
  }
},{ timestamps: {} })

module.exports = mongoose.model('Task', taskSchema)
