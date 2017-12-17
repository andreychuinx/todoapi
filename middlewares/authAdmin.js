const HttpStatus = require('http-status-codes')
module.exports = function (req, res, next) {
  if(req.decoded.role === 'admin'){
    next()
  }else{
    res.status(HttpStatus.FORBIDDEN).send({
      error : HttpStatus.getStatusText(HttpStatus.FORBIDDEN)
    })
  }
  
}