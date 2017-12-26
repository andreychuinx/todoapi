const express = require('express');
const router = express.Router();
const User = require('../controllers/user')
const authentication = require('../middlewares/authentication')
const authUser = require('../middlewares/authUser')
const authAdmin = require('../middlewares/authAdmin')

router.get('/', authentication, authAdmin, User.get)
router.get('/:id', authentication, authUser, User.getSingle)
router.post('/', authentication, authAdmin, User.create)
router.put('/:id', authentication, authUser, User.update)
router.delete('/:id', authentication, authAdmin, User.destroy)

module.exports = router