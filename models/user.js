const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')
mongoose.connect('mongodb://localhost:27017/todo', {useMongoClient: true})
mongoose.Promise = global.Promise;

var userSchema = new Schema({
  name : String,
  email : String,
  password : String,
  role : {
    type : String,
    default : 'user'
  },
  created_date : {
    type :Date,
    default : Date.now
  }
})

userSchema.pre('save', function (next) {
  bcrypt.hash(this.password, 10)
  .then(hash =>{
    this.password = hash
    next()
  })
  .catch(err => next(err))
})

userSchema.methods.comparePassword = function (passInput) {
  return new Promise((resolve, reject) =>{
    console.log(this)
    bcrypt.compare(passInput,this.password)
    .then(isMatch =>{
      resolve(isMatch)
    })
    .catch(err =>{
      reject(err)
    })
  })
  
}

module.exports = mongoose.model('User', userSchema)