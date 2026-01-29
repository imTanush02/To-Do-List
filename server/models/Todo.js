const mongoose = require("mongoose");

const todoSchema = mongoose.Schema(
  {
    board: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Board",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      required: true,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  },
);

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
