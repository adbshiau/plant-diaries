const Plant = require('../models/plant');

module.exports = {
    index,
    new: newPlant
}

function index(req, res) {
    console.log(req.user, ' <- req.user');
    Plant.find({}, function(err, plantDocs) {
        res.render('plants/index', {
            plantDocs,
            title: "All Plants"
        });
    })
}

function newPlant(req, res) {
    res.render('plants/new', {
        title: 'Add New Plant'
    });
}