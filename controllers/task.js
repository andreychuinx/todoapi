const express = require('express');
const router = express.Router();
const TaskModel = require('../models/task')
const HttpStatus = require('http-status-codes')
const ObjectID = require('mongodb').ObjectID;

class TaskController {
  static get(req, res) {
    TaskModel.find()
    .populate('userId')
    .exec()
      .then(result => {
        res.status(HttpStatus.OK).json({
          messages: "Data Tasks",
          data: result
        })
      })
      .catch(err => {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          messages: "Data Tasks Error Server",
          data: err,
          error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)
        })
      })
  }

  static getSingle(req, res) {
    TaskModel.findById(req.params.id)
    .populate('userId')
    .exec()
      .then(result => {
        res.status(HttpStatus.OK).json({
          messages: "Data Single Task",
          data: result
        })
      })
      .catch(err => {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          messages: "Data Task Error",
          data: err,
          error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)
        })
      })
  }

  static getTaskUser(req, res){
    console.log(req.decoded.userId)
    TaskModel.find({userId : req.decoded.userId})
    .populate('userId')
    .exec()
    .then(result => {
      res.status(HttpStatus.OK).json({
        messages : "Data Task User",
        data : result
      })
    })
    .catch(err =>{
      console.log(err)
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        messages: "Data Task Error",
        data: err,
        error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)
      })
    })
  }

  static create(req, res) {
    let { name, userId, description } = req.body
    let dataTask = new TaskModel({
      name,
      userId,
      description
    })
    dataTask.save()
      .then(result => {
        res.status(HttpStatus.OK).json({
          messages: "Tasks Created",
          data: result
        })
      })
      .catch(err => {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          messages: "Data Tasks Error Server",
          data: err,
          error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)
        })
      })
  }

  static update(req, res) {
    let { name, description } = req.body
    TaskModel.findByIdAndUpdate(req.params.id, { name, description })
      .then(result => {
        res.status(HttpStatus.OK).json({
          messages: "Task Updated",
          data: result
        })
      })
      .catch(err => {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          messages: "Update Task Error Server",
          data: err,
          error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)
        })
      })
  }

  static destroy(req, res) {
    TaskModel.findByIdAndRemove(req.params.id)
      .then(result => {
        res.status(HttpStatus.OK).json({
          messages: "Task Deleted",
          data: result
        })
      })
  }
}

module.exports = TaskController