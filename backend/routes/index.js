const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const {loginValidation, registerValidation} = require("../middleware/validation");
const {authenticateUser} = require("../middleware/authentication");



router.post('/login', loginValidation, userController.login );

router.post('/register', registerValidation, userController.register);

router.post('/logout', authenticateUser, userController.logout);


module.exports = router;
