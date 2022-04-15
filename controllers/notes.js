const { redirect } = require("express/lib/response");
const Plant = require("../models/plant");

module.exports = {
  create,
  delete: deleteNote,
  edit,
  update,
};

// handle new note form being submitted
function create(req, res) {
  Plant.findById(req.params.id, function (err, plantDoc) {
    // add user-centric info
    req.body.userId = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
    // add note (req.body) to the plantDoc
    plantDoc.notes.push(req.body);
    plantDoc.save(function (err) {
      console.log(plantDoc, " <- plantDoc");
      res.redirect(`/plants/${plantDoc._id}`);
    });
  });
}

// delete specified note
function deleteNote(req, res) {
  Plant.findOne(
    { "notes._id": req.params.id, "notes.userId": req.user.id },
    function (err, plantDoc) {
      if (!plantDoc || err) return res.redirect(`/plants/${plantDoc._id}`);
      plantDoc.notes.remove(req.params.id);
      plantDoc.save(function (err) {
        res.redirect(`/plants/${plantDoc._id}`);
      });
    }
  );
}

// return view (form) to edit contents of a note
function edit(req, res) {
  Plant.findOne(
    { "notes._id": req.params.id, "notes.userId": req.user.id },
    function (err, plantDoc) {
        const note = plantDoc.notes.id(req.params.id);
      if (!plantDoc || err) return res.redirect(`/plants/${plantDoc._id}`);
      res.render("notes/edit", {
        title: "Edit Note",
        plant: plantDoc,
        note
      });
    }
  );
}

// update specified note
function update(req, res) {
  // "dot" syntax to query on the property of the notes subdoc
  Plant.findOne({ "notes._id": req.params.id }, function (err, plantDoc) {
    // find the note subdoc using the id method on Mongoose arrays
    const noteSubdoc = plantDoc.notes.id(req.params.id);
    // ensure note was created by logged in user
    if (!noteSubdoc.userId.equals(req.user.id))
      return res.redirect(`/plants/${plants._id}`);
    // update the content of the note
    noteSubdoc.content = req.body.content;
    console.log(noteSubdoc);
    // save the updated plant note
    plantDoc.save(function (err) {
      // redirect to the plant's show view
      res.redirect(`/plants/${plantDoc._id}`);
    });
  });
}
