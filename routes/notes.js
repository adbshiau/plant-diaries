const express = require('express');
const router = express.Router();
const notesCtrl = require('../controllers/notes');
const isLoggedIn = require('../config/auth');

// localhost:3000/plants/:id/notes
router.post('/plants/:id/notes', isLoggedIn, notesCtrl.create);

// localhost:3000/notes/:id
router.delete('/notes/:id', isLoggedIn, notesCtrl.delete);

// localhost:3000/plants/:id/notes
router.get('/notes/:id/edit', isLoggedIn, notesCtrl.edit);

// localhost:3000/notes/:id
router.put('/notes/:id', isLoggedIn, notesCtrl.update);

module.exports = router;