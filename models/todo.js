const mongoose = require('mongoose')
const Schema = mongoose.Schema;

var todoSchema = new Schema({
  name : {
    type : String,
    required : true
  },
  taskId : {
    type : Schema.Types.ObjectId,
    required : true,
    ref : 'Task'
  },
  assignUsers : [{
    type : Schema.Types.ObjectId,
    required : true
    ref : 'User'
  }],
  description : {
    type : String,
    required : true
  },
  statusCompleted : {
    type : String,
    required : true, 
    default : 'unCompleted'
  },
  createdBy : {
    type : Schema.Types.ObjectId,
    ref : 'User'
  },
  updatedBy : {
    type : Schema.Types.ObjectId,
    ref : 'User'
  }
}, {timestamps : {}})

module.exports = mongoose.model('Todo', todoSchema)
