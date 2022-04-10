const express = require('express');
const router = express.Router();
const plantsCtrl = require('../controllers/plants');
const isLoggedIn = require('../config/auth');

// localhost:3000/plants
router.get('/', isLoggedIn, plantsCtrl.index);

// localhost:3000/plants/new
router.get('/new', isLoggedIn, plantsCtrl.new);

// localhost:3000/plants
router.post('/', isLoggedIn, plantsCtrl.create);

// localhost:3000/plants/:id
router.get('/:id', isLoggedIn, plantsCtrl.show);

module.exports = router;