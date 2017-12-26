const mongoose = require('mongoose')
const Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/todo', {useMongoClient: true})
mongoose.Promise = global.Promise;

var todoSchema = new Schema({
  name : String,
  taskId : {
    type : Schema.Types.ObjectId,
    ref : 'Task'
  },
  userId : [{
    type : Schema.Types.ObjectId,
    ref : 'User'
  }],
  description : String,
  statusCompleted : {
    type : Number,
    default : 0
  }
}, {timestamps : {}})

module.exports = mongoose.model('Todo', todoSchema)