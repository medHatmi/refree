const mongoose = require("mongoose");

const ScoreSchema = new mongoose.Schema(
  {
    ref: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    team1: {
      type: String,
      required: true,
    },
    team2: {
      type: String,
      required: true,
    },
    score1: {
      type: Number,
      required: true,
    },
    score2: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Score", ScoreSchema);
