const express = require("express");
const Todo = require("../models/Todo");
const Board = require("../models/Board");
const { protect } = require("../middleware/auth");
const router = express.Router();

router.get("/:boardId", protect, async (req, res) => {
  const todos = await Todo.find({ board: req.params.boardId });
  res.json(todos);
});

router.post("/", protect, async (req, res) => {
  const { boardId, title, description, status } = req.body;
  const board = await Board.findById(boardId);

  if (board) {
    if (board.user.toString() !== req.user._id.toString()) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }
    const todo = new Todo({
      board: boardId,
      title,
      description,
      status,
    });
    const createdTodo = await todo.save();
    res.status(201).json(createdTodo);
  } else {
    res.status(404).json({ message: "Board not found" });
  }
});

router.put("/:id", protect, async (req, res) => {
  const { title, description, status } = req.body;
  const todo = await Todo.findById(req.params.id);

  if (todo) {
    const board = await Board.findById(todo.board);
    if (board.user.toString() !== req.user._id.toString()) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }
    todo.title = title || todo.title;
    todo.description = description || todo.description;
    todo.status = status || todo.status;
    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
});

router.delete("/:id", protect, async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (todo) {
    const board = await Board.findById(todo.board);
    if (board.user.toString() !== req.user._id.toString()) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }
    await todo.deleteOne();
    res.json({ message: "Todo removed" });
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
});

module.exports = router;
