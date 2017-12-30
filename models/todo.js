const mongoose = require('mongoose')
const Schema = mongoose.Schema;

var todoSchema = new Schema({
  name : String,
  taskId : {
    type : Schema.Types.ObjectId,
    ref : 'Task'
  },
  assignUsers : [{
    type : Schema.Types.ObjectId,
    ref : 'User'
  }],
  description : String,
  statusCompleted : {
    type : String,
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
