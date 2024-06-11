const express = require('express');
const AccountController = require('../controllers/AccountController');
const router = express.Router()

router.post('/resetPassword', AccountController.resetPasswordAdminCompany)

module.exports = router;