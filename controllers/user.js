const express = require('express');
const router = express.Router();
const UserModel = require('../models/user')
const HttpStatus = require('http-status-codes')
const ObjectID = require('mongodb').ObjectID;

class UserController {
  static get(req, res) {
    UserModel.find()
      .then(result => {
        res.status(HttpStatus.OK).json({
          messages: "Data Users",
          data: result
        })
      })
      .catch(err => {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          messages: "Data Users Error Server",
          data: err,
          error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)
        })
      })
  }

  static getSingle(req, res) {
    UserModel.findById(req.params.id)
      .then(result => {
        res.status(HttpStatus.OK).json({
          messages: "Data Single User",
          data: result
        })
      })
      .catch(err => {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          messages: "Data User Error",
          data: err,
          error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)
        })
      })
  }

  static create(req, res) {
    console.log(req.decoded)
    let role = !req.headers.token ? "user" : req.body.role
    
    let objUser = {
      name : req.body.name,
      email : req.body.email,
      password : req.body.password,
      role : role,
    }
    let dataUser = new UserModel(objUser)
    dataUser.save()
      .then(result => {
        res.status(HttpStatus.OK).json({
          messages: "Users Created",
          data: result
        })
      })
      .catch(err => {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          messages: "Data Users Error Server",
          data: err,
          error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)
        })
      })
  }

  static update(req, res) {
    let { name, email, password, role } = req.body
    UserModel.findByIdAndUpdate(req.params.id, { name, email, password, role })
      .then(result => {
        res.status(HttpStatus.OK).json({
          messages: "User Updated",
          data: result
        })
      })
      .catch(err => {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          messages: "Update User Error Server",
          data: err,
          error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)
        })
      })
  }

  static destroy(req, res) {
    UserModel.findByIdAndRemove(req.params.id)
      .then(result => {
        res.status(HttpStatus.OK).json({
          messages: "User Deleted",
          data: result
        })
      })
  }
}

module.exports = UserController