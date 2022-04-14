const express = require('express');
const router = express.Router();
const plantsCtrl = require('../controllers/plants');
const isLoggedIn = require('../config/auth');
const multer = require('multer');
const convert = require('heic-convert');

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



// localhost:3000/plants
router.get('/', isLoggedIn, plantsCtrl.index);

// localhost:3000/plants/new
router.get('/new', isLoggedIn, plantsCtrl.new);

// localhost:3000/plants
router.post('/', isLoggedIn, upload.single('image'), plantsCtrl.create);

// localhost:3000/plants/:id
router.get('/:id', isLoggedIn, plantsCtrl.show);

// localhost:3000/plants/:id/edit
router.get('/:id/edit', isLoggedIn, plantsCtrl.edit);

// localhost: 3000/plants/:id
router.put('/:id', isLoggedIn, upload.single('image'), plantsCtrl.update);

// localhost:3000/plants/:id
router.delete('/:id', isLoggedIn, plantsCtrl.delete);

module.exports = router;