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
    // general information
    userOwns: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    image: String,
    commonName: String,
    scientificName: String,
    adoptionDate: Date,
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
    toxicity: {
      type: String,
      enum: ["human safe", "pet safe"],
    },
    // plant care details
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
