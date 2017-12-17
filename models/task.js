const mongoose = require('mongoose')
const Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/todo', {useMongoClient: true})
mongoose.Promise = global.Promise;

var taskSchema = new Schema({
  name : String,
  description : String,
  date : {
    type :Date,
    default : Date.now
  },
  statusCompleted : {
    type : Number,
    default : 0
  }
})

module.exports = mongoose.model('Task', taskSchema)