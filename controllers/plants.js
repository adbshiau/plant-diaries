const { redirect } = require('express/lib/response');
const Plant = require('../models/plant');
const { promisify } = require('util');
const fs = require('fs');
const convert = require('heic-convert');

module.exports = {
    index,
    new: newPlant,
    create,
    show,
    edit,
    update,
    delete: deletePlant
}

// view all plants created by the user
function index(req, res) {
    Plant.find({userOwns: req.user._id}, function(err, plantDocs) {
        res.render('plants/index', {
            plants: plantDocs,
            title: "Your Plants"
        });
    })
}

// return view (form) to add new plant
function newPlant(req, res) {
    res.render('plants/new', {
        title: 'Add New Plant'
    });
}

// handle new plant form being submitted
function create(req, res) {
    req.body.humanSafe = !!req.body.humanSafe;
    req.body.petSafe = !!req.body.petSafe;
    // converts HEIC file to JPEG
    if (req.file.originalname.includes('.heic') || req.file.originalname.includes('.HEIC')) {
        heicToJpg(req.file);
        // renames filename to image.jpeg
        req.body.image = req.file.originalname.split('.heic').join('.jpeg');
    }
    else req.body.image = req.file.originalname;
    
    const plant = new Plant(req.body);
    plant.userOwns = req.user._id;
    plant.save(function(err) {
        if (err) return res.redirect('plants/new');
        res.redirect(`/plants/${plant._id}`);
    })
}

// view details of any plant
function show(req, res) {
    Plant.findOne({'_id': req.params.id}, function(err, plantDoc) {
        res.render('plants/show', {
            title: plantDoc.commonName,
            plant: plantDoc
        });
    });
}

// return view (form) to edit specified plant information
function edit(req, res) {
    Plant.findById((req.params.id), function(err, plantDoc) {
        if (err || !plantDoc) return res.redirect('/plants')
        res.render('plants/edit', {
            title: 'Edit Plant',
            plant: plantDoc
        });
    })
}

// handle edit plant form being submitted
function update(req, res) {
    req.body.humanSafe = !!req.body.humanSafe;
    req.body.petSafe = !!req.body.petSafe;
    // converts HEIC to JPEG
    if (req.file) {
        if (req.file.originalname.includes('.heic') || req.file.originalname.includes('.HEIC')) {
            heicToJpg(req.file);
            // renames filename to image.jpeg
            req.body.image = req.file.originalname.split('.heic').join('.jpeg');
        }
        else req.body.image = req.file.originalname;
    }
    Plant.findOneAndUpdate(
        {_id: req.params.id, userOwns: req.user._id},
        // update object with updated properties
        req.body,
        // options with new: true to make sure updated doc is returned
        {new: true},
        function(err, plantDoc) {
            if (err || !plantDoc) return res.redirect('/plants')
            res.redirect(`/plants/${plantDoc._id}`); 
        }
    )
}

function deletePlant(req, res) {
    Plant.findOneAndDelete(
        // ensure that plant was created by logged in user
        {_id: req.params.id, userOwns: req.user._id},
        function(err) {
            // deleted the plant, redirect to index
            res.redirect('/plants');
        }
    )
}

// converts HEIC images to JPEG
async function heicToJpg(file) {
    const inputBuffer = await promisify(fs.readFile)(file.path);
    const outputBuffer = await convert({
      buffer: inputBuffer, // the HEIC file buffer
      format: 'JPEG',      // output format
      quality: 1           // the jpeg compression quality, between 0 and 1
    });
    await promisify(fs.writeFile)(`${file.path}`.split('.heic').join('.jpeg'), outputBuffer);
};