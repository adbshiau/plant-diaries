const { redirect } = require('express/lib/response');
const Plant = require('../models/plant');

module.exports = {
    index,
    new: newPlant,
    create
}

function index(req, res) {
    // console.log(req.user, ' <- req.user');
    Plant.find({}, function(err, plantDocs) {
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
    const plant = new Plant(req.body);
    plant.save(function(err) {
        if (err) return res.redirect('plants/new');
        console.log(plant, ' <- plant created')
        res.redirect(`/plants/${plant._id}`);
    })
}