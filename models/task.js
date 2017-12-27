const mongoose = require('mongoose')
const Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/todo', {useMongoClient: true})
mongoose.Promise = global.Promise;

var taskSchema = new Schema({
  name : String,
  
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
},{ timestamps: {} })

module.exports = mongoose.model('Task', taskSchema)