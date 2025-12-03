const mongoose = require("mongoose");

const taskModel = new mongoose.Schema(
  {
    title: {
      type: String,
      reuire: true,
    },
    description: {
      type: String,
    },
    priority: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH"],
      require: true,
    },
    dueDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);


export const task = mongoose.model('Task', taskModel)