const express = require('express');
const router = express.Router();
const searchCtrl = require('../controllers/search');
const isLoggedIn = require('../config/auth');
const multer = require('multer');

// tells multer where to save your files
const fileStorageEngine = multer.diskStorage({ 
	destination: (req, file, cb) => { 
		cb(null, './public/images'); 
	},
	filename: (req, file, cb) => {
    cb(null, file.originalname);
	},
});

const upload = multer({storage: fileStorageEngine}); 

// localhost:3000/search
router.get('/search', isLoggedIn, searchCtrl.search);

module.exports = router;