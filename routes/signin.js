const express = require('express');
const router = express.Router();
const SignIn = require('../controllers/signin')

router.post('/', SignIn.goSignIn)
router.post('/signinfb', SignIn.goSignInFB )
module.exports = router