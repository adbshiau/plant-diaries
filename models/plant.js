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

const plantSchema = new Schema(
  {
    // plant profile
    userOwns: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    image: String,
    commonName: String,
    scientificName: String,
    adoptionDate: String,
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
    humanSafe: {
        type: Boolean,
    },
    petSafe: {
        type: Boolean,
    },
    // plant care
    light: {
      type: String,
      enum: ["full sun", "part sun", "part shade", "full shade"],
    },
    water: String,
    idealTemp: Number,
    humidity: Number,
    soil: String,
    fertilizer: String,
    propagation: {
        type: String,
        enum: ['seeds', 'bulbs', 'food scraps', 'cuttings', 'layering', 'grafting']
    },
    notes: [noteSchema]
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Plant", plantSchema);
