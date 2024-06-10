const express = require('express');
const CompanyController = require('../controllers/CompanyController');
const router = express.Router()

router.post('/createCompany', CompanyController.createCompany)

module.exports = router;