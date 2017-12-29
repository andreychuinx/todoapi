const FB = require('fb')
const HttpStatus = require('http-status-codes')
const facebook = new FB.Facebook({
  appId : process.env.FB_APP_ID,
  appSecret : process.env.FB_SECRET_APP
})

module.exports = function (req, res, next) {
  console.log(req.body)
  facebook
  .api('me', {
    fields : ['id','name','email'],
    access_token : req.body.access_token
  })
  .then( response =>{
    req.fbUser = response
    next()
  })
  .catch(err => {
    next(HttpStatus.INTERNAL_SERVER_ERROR)
  })
  
}