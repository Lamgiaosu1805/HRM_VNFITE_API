const express = require('express');
const AccountController = require('../controllers/AccountController');
const { verifyTokenForAdmin } = require('../middlewares/authentication');
const router = express.Router()

router.post('/resetPassword', verifyTokenForAdmin, AccountController.resetPasswordAdminCompany)

module.exports = router;