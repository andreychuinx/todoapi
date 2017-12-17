const express = require('express');
const router = express.Router();
const Task = require('../controllers/task')
const authentication = require('../middlewares/authentication')

router.get('/',authentication, Task.get)
router.get('/:id', authentication, Task.getSingle)
router.post('/', authentication, Task.create)
router.put('/:id', authentication, Task.update)
router.delete('/:id', authentication, Task.destroy)

module.exports = router