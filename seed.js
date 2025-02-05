const mongoose = require("mongoose");
const DailyPlanModel = require("./Model/DailyPlan");
const sampleData = require("./SampleData");
const UserProgress=require("./Model/UserProgress")
const User=require("./Model/User")

const seedDatabase = async () => {
  try {
    // Connect to the database
    await mongoose.connect("mongodb://localhost:27017/RaisingSuperstars", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");

    // Remove existing data
    await User.deleteMany({});
    await DailyPlanModel.deleteMany({});
    await UserProgress.deleteMany({});
    console.log("Cleared existing data");

    const users = await User.insertMany([
      { name: "Abby" },
      { name: "Bob" },
      { name: "Charlie" },
      
    ]);
    console.log("Users seeded:", users);

    const dailyPlan = new DailyPlanModel({
      days: sampleData.days,
      plans: sampleData.plans,
    });

    await dailyPlan.save();
    console.log("Daily plans seeded");

    // 🔹 4. Initialize UserProgress (empty)
    console.log("User progress will be tracked dynamically when users update their plans");


    // Close the connection
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();