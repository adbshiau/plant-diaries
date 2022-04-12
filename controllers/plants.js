const { redirect } = require('express/lib/response');
const Plant = require('../models/plant');

module.exports = {
    index,
    new: newPlant,
    create,
    show,
    edit,
    update,
    delete: deletePlant
}

function index(req, res) {
    // console.log(req.user, ' <- req.user');
    Plant.find({userOwns: req.user._id}, function(err, plantDocs) {
        res.render('plants/index', {
            plants: plantDocs,
            title: "All Plants"
        });
    })
}

function newPlant(req, res) {
    res.render('plants/new', {
        title: 'Add New Plant'
    });
}

function create(req, res) {
    req.body.humanSafe = !!req.body.humanSafe;
    req.body.petSafe = !!req.body.petSafe;
    req.body.image = req.file.originalname;
    const plant = new Plant(req.body);
    plant.userOwns = req.user._id;
    plant.save(function(err) {
        if (err) return res.redirect('plants/new');
        console.log(plant, ' <- plant created')
        console.log(req.file, ' <- req.file')
        res.redirect(`/plants/${plant._id}`);
    })
}

function show(req, res) {
    Plant.findById((req.params.id), function(err, plantDoc) {
        res.render('plants/show', {
            title: plantDoc.commonName, 
            plant: plantDoc
        });
    })
}

function edit(req, res) {
    Plant.findById((req.params.id), function(err, plantDoc) {
        if (err || !plantDoc) return res.redirect('/plants')
        
        plantDoc.adoptionDate.toString()
        // plantDoc.adoptionDate.split('T')
        console.log(plantDoc.adoptionDate)
        res.render('plants/edit', {
            title: 'Edit Plant',
            plant: plantDoc
        });
    })
}

function update(req, res) {
    Plant.findOneAndUpdate(
        {_id: req.params.id, userOwns: req.user._id},
        // update object with updated properties
        req.body,
        // options with new: true to make sure updated doc is returned
        {new: true},
        function(err, plantDoc) {
            console.log(plantDoc)
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