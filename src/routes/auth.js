const express = require('express');
const AuthController = require('../controllers/AuthController');
const router = express.Router()

router.post('/createAdmin', AuthController.createAccoutAdmin)

module.exports = router;