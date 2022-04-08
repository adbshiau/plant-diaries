const express = require('express');
const router = express.Router();
const plantsCtrl = require('../controllers/plants');
const isLoggedIn = require('../config/auth');


router.get('/', plantsCtrl.index);
