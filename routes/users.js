const express = require('express');
const router = express.Router();
const User = require('../controllers/user')
const authentication = require('../middlewares/authentication')
const authUser = require('../middlewares/authUser')
const authAdmin = require('../middlewares/authAdmin')

router.get('/', authentication, User.get)
router.get('/:id', authentication, User.getSingle)
router.post('/', authentication, User.create)
router.put('/:id', authentication, User.update)
router.delete('/:id', authentication, User.destroy)

module.exports = router