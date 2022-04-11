const { redirect } = require("express/lib/response");
const Plant = require("../models/plant");

module.exports = {
  create,
  delete: deleteNote
};

function create(req, res) {
  Plant.findById(req.params.id, function (err, plantDoc) {
    // add user-centric info
    req.body.userId = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
    // add note (req.body) to the plantDoc
    plantDoc.notes.push(req.body);
    plantDoc.save(function(err) {
        console.log(plantDoc, ' <- plantDoc')
        res.redirect(`/plants/${plantDoc._id}`);
    })
  });
}


function deleteNote(req, res) {
    Plant.findOne(
        {'notes._id': req.params.id, 'notes.userId': req.user.id},
        function(err, plantDoc) {
            if(!plantDoc || err) return res.redirect(`/plants/${plantDoc._id}`);
            plantDoc.notes.remove(req.params.id);
            plantDoc.save(function(err) {
                res.redirect(`/plants/${plantDoc._id}`);
            });
        });
}