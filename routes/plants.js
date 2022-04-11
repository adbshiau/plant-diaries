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

// localhost:3000/plants/:id/edit
router.get('/:id/edit', isLoggedIn, plantsCtrl.edit);

// localhost: 3000/plants/:id
router.put('/:id', isLoggedIn, plantsCtrl.update);

// localhost:3000/plants/:id
router.delete('/:id', isLoggedIn, plantsCtrl.delete);

module.exports = router;