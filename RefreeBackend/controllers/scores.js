const Score = require("../models/Score.js");
const { createError } = require("../utils/error.js");
require("dotenv").config();


exports.saveScores = async (req, res, next) => {
  const score = new Score({
    ref: req.body.ref,
    team1: req.body.team1,
    team2: req.body.team2,
    score1: req.body.score1,
    score2: req.body.score2,
  });
  
  score.save()
    .then((result) => {
      res.status(201).json({
        result: result,
        message: "Score saved successfully",
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
        message: "Error saving score",
      });
    });
  
};

exports.scores = async (req, res, next) =>{
  try {
    const scores = await Score.find().sort({_id: -1});
    res.status(200).json(scores);
  } catch (err) {
    next(err);
  }
}

exports.updateScore = async (req, res, next) => {
  const { id, team1, team2, score1, score2 } = req.body;

  try {
    const score = await Score.findOneAndUpdate(
      { _id: id },
      { team1: team1, team2: team2, score1: score1, score2: score2 },
      { new: true }
    );

    if (!score) {
      return res.status(404).json({ message: "Score not found" });
    }

    return res.status(200).json({
      message: "Score updated successfully",
      score: score,
    });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};


exports.deleteScore = async (req, res) => {
  const id = req.params.id;

  try {
    // find the score by ID and delete it
    const score = await Score.findByIdAndDelete(id);

    // check if score exists
    if (!score) {
      return res.status(404).send({ message: 'Score not found' });
    }

    res.send(score);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Server error' });
  }
};