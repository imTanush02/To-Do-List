const express = require("express");
const Board = require("../models/Board");
const { protect } = require("../middleware/auth");
const router = express.Router();

router.get("/", protect, async (req, res) => {
  const boards = await Board.find({ user: req.user._id });
  res.json(boards);
});

router.post("/", protect, async (req, res) => {
  const { name, description } = req.body;
  const board = new Board({
    user: req.user._id,
    name,
    description,
  });
  const createdBoard = await board.save();
  res.status(201).json(createdBoard);
});

router.put("/:id", protect, async (req, res) => {
  const { name, description } = req.body;
  const board = await Board.findById(req.params.id);

  if (board) {
    if (board.user.toString() !== req.user._id.toString()) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }
    board.name = name || board.name;
    board.description = description || board.description;
    const updatedBoard = await board.save();
    res.json(updatedBoard);
  } else {
    res.status(404).json({ message: "Board not found" });
  }
});

router.delete("/:id", protect, async (req, res) => {
  const board = await Board.findById(req.params.id);

  if (board) {
    if (board.user.toString() !== req.user._id.toString()) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }
    await board.deleteOne();
    res.json({ message: "Board removed" });
  } else {
    res.status(404).json({ message: "Board not found" });
  }
});

module.exports = router;
