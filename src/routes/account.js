const express = require('express');
const AccountController = require('../controllers/AccountController');
const { verifyTokenForAdmin, verifyTokenForAdminCompany } = require('../middlewares/authentication');
const upload = require('../middlewares/uploadFile');
const router = express.Router()

router.post('/resetPassword', verifyTokenForAdminCompany, AccountController.resetPasswordAdminCompany)
router.post('/createByExcel', verifyTokenForAdminCompany, upload.single('file'), AccountController.createAccountWithExcel)

module.exports = router;