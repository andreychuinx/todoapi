const authAdmin = require('./authAdmin')
const HttpStatus = require('http-status-codes')
module.exports = function (req, res, next) {
  if(req.params.id === req.decoded.userId){
    next()
  }else{
    authAdmin(req, res, next)
  }
}