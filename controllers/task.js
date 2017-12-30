const express = require('express');
const router = express.Router();
const TaskModel = require('../models/task')
const TodoModel = require('../models/todo')
const HttpStatus = require('http-status-codes')
const authorization = require('../helpers/authorization')
const ObjectID = require('mongodb').ObjectID;

class TaskController {
  static get(req, res) {
    TaskModel.find(authorization(req))
      .populate('createdBy')
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
    TaskModel.findById(req.params.id, {}, authorization(req))
      .populate('createdBy')
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

  static getTodos(req, res) {
    TaskModel.findById(req.params.id, {}, authorization(req))
      .then(result => {
        TodoModel.find({taskId : result._id})
          .populate('taskId')
          .populate('assignUsers')
          .populate('createdBy')
          .populate('updatedBy')
          .exec()
          .then(result => {
            res.status(HttpStatus.OK).json({
              messages: "Data Task Todos",
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
      })

  }

  static create(req, res) {
    let dataTask = new TaskModel({
      name: req.body.name,
      description: req.body.description,
      createdBy: req.decoded.userId,
      updatedBy: req.decoded.userId
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
    let { name, description, statusCompleted } = req.body
    let options = {
      ...authorization(req)
    }
    options.new = true
    TaskModel.findByIdAndUpdate(req.params.id, {
      name,
      description,
      statusCompleted,
      updatedBy: req.decoded.userId
    }, options)
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
    TodoModel.remove({taskId : req.params.id})
    .then(result =>{
      console.log(result)
      let options = {
        ...authorization(req)
      }
      options.new = true
      return TaskModel.findByIdAndRemove(req.params.id, options)
    })
    .then(result => {
      res.status(HttpStatus.OK).json({
        messages: "Task and Todos Deleted",
        data: result
      })
    })
    .catch(err =>{
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        messages : "Errr",
        data : err
      })
    })
    
  }
}

module.exports = TaskController
