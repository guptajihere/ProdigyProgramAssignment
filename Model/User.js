const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  //email: { type: String, required: true, unique: true },
  //role: { type: String, enum: ["coach", "athlete"], required: true },
  //password: { type: String, required: true }, // Hash this before saving
});

const User = mongoose.model("User", userSchema);

module.exports = User;