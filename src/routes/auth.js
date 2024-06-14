const express = require('express');
const AuthController = require('../controllers/AuthController');
const upload = require('../middlewares/uploadFile');
const router = express.Router()

// router.post('/createAdmin', AuthController.createAccoutAdmin)
router.post('/signIn', AuthController.signIn)
// router.post('/upload', upload.single('file'), AuthController.test)

module.exports = router;