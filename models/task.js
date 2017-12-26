const mongoose = require('mongoose')
const Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/todo', {useMongoClient: true})
mongoose.Promise = global.Promise;

var taskSchema = new Schema({
  name : String,
  userId : {
    type : Schema.Types.ObjectId,
    ref : 'User'
  },
  description : String,
  statusCompleted : {
    type : String,
    default : 'unCompleted'
  }
},{ timestamps: {} })

module.exports = mongoose.model('Task', taskSchema)