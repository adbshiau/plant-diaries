const express = require('express');
const router = express.Router();
const notesCtrl = require('../controllers/notes');
const isLoggedIn = require('../config/auth');

// localhost:3000/plants/:id/notes
router.post('/plants/:id/notes', isLoggedIn, notesCtrl.create);

// localhost:3000/notes/:id
router.delete('/notes/:id', isLoggedIn, notesCtrl.delete);

// localhost:3000/notes/:id
router.get('/notes/:id', isLoggedIn, notesCtrl.edit);

module.exports = router;