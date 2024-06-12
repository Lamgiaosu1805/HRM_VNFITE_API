const express = require('express');
const CompanyController = require('../controllers/CompanyController');
const { verifyTokenForAdmin } = require('../middlewares/authentication');
const router = express.Router()

router.post('/createCompany', verifyTokenForAdmin, CompanyController.createCompany)

module.exports = router;