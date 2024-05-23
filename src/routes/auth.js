const express = require('express');
const AuthController = require('../controllers/AuthController');
const router = express.Router()

router.get('/', AuthController.test)

module.exports = router;