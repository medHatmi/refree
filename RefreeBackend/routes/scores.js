const express = require("express");
const {
  saveScores,
  scores,
  updateScore,
  deleteScore
} = require("../controllers/scores.js");
const {
    verifyToken
  } = require("../utils/verifyToken.js");

const router = express.Router();

router.post("/saveScore",verifyToken ,saveScores);
router.get("/scores",verifyToken ,scores);
router.put("/updateScore",verifyToken ,updateScore);
router.delete("/delete/:id",verifyToken ,deleteScore);

module.exports = router;
