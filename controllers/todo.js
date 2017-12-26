const express = require('express');
const router = express.Router();
const TodoModel = require('../models/todo')
const HttpStatus = require('http-status-codes')
const ObjectID = require('mongodb').ObjectID;

class TodoController {
  static get(req, res) {
    TodoModel.find()
      .populate('taskId')
      .populate('userId')
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
    TodoModel.findById(req.params.id)
      .populate('taskId')
      .populate('userId')
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

  static getTodoUser(req, res) {
    console.log(req.decoded.userId)
    TodoModel.find({
      userId: {
        $in: [req.decoded.userId]
      }
    })
      .populate('taskId')
      .populate('userId')
      .exec()
      .then(result => {
        res.status(HttpStatus.OK).json({
          messages: "Data Todo User",
          data: result
        })
      })
      .catch(err => {
        console.log(err)
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          messages: "Data Todo Error",
          data: err,
          error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)
        })
      })
  }

  static create(req, res) {
    let { name, taskId, userId, description } = req.body
    let dataTodo = new TodoModel({
      name,
      taskId,
      userId,
      description
    })
    dataTodo.save()
      .then(result => {
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
    let { name, userId, description } = req.body
    TodoModel.findByIdAndUpdate(req.params.id, { name, userId, description })
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
    TodoModel.findByIdAndRemove(req.params.id)
      .then(result => {
        res.status(HttpStatus.OK).json({
          messages: "Todo Deleted",
          data: result
        })
      })
  }
}

module.exports = TodoController