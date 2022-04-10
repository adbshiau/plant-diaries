const { redirect } = require("express/lib/response");
const Plant = require("../models/plant");

module.exports = {
  create,
};

function create(req, res) {
  Plant.findById(req.params.id, function (err, plantDoc) {
    // add user-centric info
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    // add note (req.body) to the plantDoc
    plantDoc.notes.push(req.body);
    plantDoc.save(function(err) {
        console.log(plantDoc, ' <- plantDoc')
        res.redirect(`/plants/${plantDoc._id}`);
    })
  });
}
