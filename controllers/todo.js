const express = require('express');
const router = express.Router();
const TodoModel = require('../models/todo')
const HttpStatus = require('http-status-codes')
const authorization = require('../helpers/authorization')
const ObjectID = require('mongodb').ObjectID;

class TodoController {
  static get(req, res) {
    let whereTodos = {
      ...authorization(req)
    }
    TodoModel.find({$or : [whereTodos, {assignUsers : {_id : req.decoded.userId}}]})
      .populate('taskId')
      .populate('assignUsers')
      .populate('createdBy')
      .populate('updatedBy')
      .exec()
      .then(result => {
        res.status(HttpStatus.OK).json({
          messages: "Data Todos",
          data: result
        })
      })
      .catch(err => {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          messages: "Data Todos Error Server",
          data: err,
          error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)
        })
      })
  }

  static getSingle(req, res) {
    let whereTodos = {
      ...authorization(req)
    }
    whereTodos.assignUsers = {$elemMatch : req.decoded.userId}
    TodoModel.findById(req.params.id, {}, {$or : [whereTodos] })
      .populate('taskId')
      .populate('assignUsers')
      .populate('createdBy')
      .populate('updatedBy')
      .exec()
      .then(result => {
        res.status(HttpStatus.OK).json({
          messages: "Data Single Todo",
          data: result
        })
      })
      .catch(err => {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          messages: "Data Todo Error",
          data: err,
          error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)
        })
      })
  }

  static create(req, res) {
    let { name, taskId, assignUsers, description } = req.body
    let dataTodo = new TodoModel({
      name,
      taskId,
      assignUsers,
      description,
      createdBy: req.decoded.userId,
      updatedBy: req.decoded.userId
    })
    dataTodo.save()
      .then(result => {
        return result
          .populate('taskId')
          .populate('assignUsers')
          .populate('createdBy')
          .populate('updatedBy')
          .execPopulate()
        
      })
      .then(result =>{
        res.status(HttpStatus.OK).json({
          messages: "Todos Created",
          data: result
        })
      })
      .catch(err => {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          messages: "Data Todos Error Server",
          data: err,
          error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)
        })
      })
  }

  static update(req, res) {
    let options = {
      ...authorization(req)
    }
    options.new = true
    let { name, taskId, assignUsers, statusCompleted, description } = req.body
    TodoModel.findByIdAndUpdate(req.params.id, {
      name,
      taskId,
      assignUsers,
      description,
      statusCompleted,
      updatedBy: req.decoded.userId
    }, options)
      .populate('taskId')
      .populate('assignUsers')
      .populate('createdBy')
      .populate('updatedBy')
      .exec()
      .then(result => {
        res.status(HttpStatus.OK).json({
          messages: "Todo Updated",
          data: result
        })
      })
      .catch(err => {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          messages: "Update Todo Error Server",
          data: err,
          error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)
        })
      })
  }

  static destroy(req, res) {
    TodoModel.findByIdAndRemove(req.params.id, authorization(req))
      .then(result => {
        res.status(HttpStatus.OK).json({
          messages: "Todo Deleted",
          data: result
        })
      })
  }
}

module.exports = TodoController
