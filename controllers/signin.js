const express = require('express');
const router = express.Router();
const UserModel = require('../models/user')
const HttpStatus = require('http-status-codes')
const jwt = require('jsonwebtoken')
const ObjectID = require('mongodb').ObjectID;

class SignInController {
  static goSignIn(req, res) {
    UserModel.findOne({'email' : req.body.email})
      .then(result => {
        if(!result){
          res.status(HttpStatus.NON_AUTHORITATIVE_INFORMATION).send({
            messages : "Email Not Found",
            error : HttpStatus.getStatusText(HttpStatus.NON_AUTHORITATIVE_INFORMATION)
          })
        }else{
          result.comparePassword(req.body.password)
          .then(isMatch =>{
            if(isMatch){
              
              let objPayLoad = {
                userId : result.id,
                email : result.email,
                role : result.role
              }
              jwt.sign(objPayLoad, process.env.SECRET_KEY, (err, token) =>{
                if(err) return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                  messages : HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR),
                  data : err
                })
                res.status(HttpStatus.OK).json({
                  messages : "Signin",
                  data : {
                    token : token
                  }
                })
              })
            }else{
              res.status(HttpStatus.FORBIDDEN).send({
                error : HttpStatus.getStatusText(HttpStatus.FORBIDDEN)
              })
            }
          })
          .catch(err =>{
            console.log(err)
          })
        }
      })
      .catch(err => {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          messages: "Data Users Error Server",
          data: err,
          error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)
        })
      })
  }

}

module.exports = SignInController