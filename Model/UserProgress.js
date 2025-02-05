const mongoose = require("mongoose");

const userProgressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  planId: { type: mongoose.Schema.Types.ObjectId, ref: "DailyPlan", required: true },
  day: { type: String, required: true },
  completed: { type: Boolean, default: false },
},{ timestamps: true });

const UserProgress = mongoose.model("UserProgress", userProgressSchema);

module.exports = UserProgress;