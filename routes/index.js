const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home_controller.js');

// Get Homepage
router.get('/', homeController.homepage);
// router.use('/users', require('./userRoutes.js'));

module.exports = router;
