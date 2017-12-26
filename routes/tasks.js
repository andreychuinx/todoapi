const express = require('express');
const router = express.Router();
const Task = require('../controllers/task')
const authentication = require('../middlewares/authentication')
const authUser = require('../middlewares/authUser')
const authAdmin = require('../middlewares/authAdmin')

router.get('/',authentication, authAdmin, Task.get)
router.get('/:id', authentication, authUser, Task.getSingle)
router.get('/usertask/list', authentication, Task.getTaskUser)
router.post('/', authentication, Task.create)
router.put('/:id', authentication, authUser, Task.update)
router.delete('/:id', authentication, authUser, Task.destroy)

module.exports = router