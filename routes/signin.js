const express = require('express');
const router = express.Router();
const SignIn = require('../controllers/signin')
const fbSignIn = require('../middlewares/fb')

router.post('/', SignIn.goSignIn)
router.post('/signinfb', fbSignIn, SignIn.goSignInFB )
module.exports = router