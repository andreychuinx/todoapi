module.exports = function (req) {
  if(req.decoded.role === 'admin'){
    return {}
  }else {
    return {
      createdBy : req.decoded.userId,
      new : true
    }
  }
}