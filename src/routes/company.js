const express = require('express');
const CompanyController = require('../controllers/CompanyController');
const { verifyTokenForAdmin, verifyTokenForAdminCompany } = require('../middlewares/authentication');
const router = express.Router()

router.post('/createCompany', verifyTokenForAdminCompany, CompanyController.createCompany)

module.exports = router;