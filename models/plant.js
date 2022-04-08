const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteSchema = new Schema(
  {
    content: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    userName: String,
    userAvatar: String,
  },
  {
    timestamps: true,
  }
);

const plantSchema = new Schema({
  commonName: String,
  location: {
    type: String,
    enum: [
      "office",
      "hall",
      "kitchen",
      "bathroom",
      "terrace",
      "porch",
      "balcony",
      "living room",
      "patio",
      "bedroom",
    ],
  },
  light: {
    type: String,
    enum: ["full sun", "part sun", "part shade", "full shade"],
  },
  userOwns: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  notes: [noteSchema],
});

module.exports = mongoose.model("Plant", plantSchema);
