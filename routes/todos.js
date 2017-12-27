const express = require('express');
const router = express.Router();
const Todo = require('../controllers/todo')
const authentication = require('../middlewares/authentication')
const authUser = require('../middlewares/authUser')
const authAdmin = require('../middlewares/authAdmin')

router.get('/',authentication, Todo.get)
router.get('/:id', authentication, Todo.getSingle)
router.post('/', authentication, Todo.create)
router.put('/:id', authentication, Todo.update)
router.delete('/:id', authentication, Todo.destroy)

module.exports = router