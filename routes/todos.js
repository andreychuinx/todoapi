const express = require('express');
const router = express.Router();
const Todo = require('../controllers/todo')
const authentication = require('../middlewares/authentication')
const authUser = require('../middlewares/authUser')
const authAdmin = require('../middlewares/authAdmin')

router.get('/',authentication, authAdmin, Todo.get)
router.get('/:id', authentication, authUser, Todo.getSingle)
router.get('/usertodo/list', authentication, Todo.getTodoUser)
router.post('/', authentication, Todo.create)
router.put('/:id', authentication, authUser, Todo.update)
router.delete('/:id', authentication, authUser, Todo.destroy)

module.exports = router