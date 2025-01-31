const mongoose = require("mongoose");

const planSchema = new mongoose.Schema({
  category: { type: String, required: true },
  activity: { type: String, required: true },
  frequency: { type: String, required: true },
  time: { type: String, required: true },
  completed: { type: [Boolean], required: true }, // Array of booleans to track completion
});

const dailyPlanSchema = new mongoose.Schema({
  days: { type: [String], required: true }, // Array of days
  plans: { type: [planSchema], required: true }, // Nested array of plans
});

// we create the model
const DailyPlan = mongoose.model("DailyPlan", dailyPlanSchema);

module.exports = DailyPlan;
