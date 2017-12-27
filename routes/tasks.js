const express = require('express');
const router = express.Router();
const Task = require('../controllers/task')
const authentication = require('../middlewares/authentication')
const authUser = require('../middlewares/authUser')
const authAdmin = require('../middlewares/authAdmin')

router.get('/',authentication, Task.get)
router.get('/:id', authentication, Task.getSingle)
router.get('/:id/todos', authentication, Task.getTodos)
router.post('/', authentication, Task.create)
router.put('/:id', authentication, Task.update)
router.delete('/:id', authentication, Task.destroy)

module.exports = router