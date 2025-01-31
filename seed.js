const mongoose = require("mongoose");
const DailyPlan = require("./Model/Schema");
const sampleData = require("./SampleData");

const seedDatabase = async () => {
  try {
    // Connect to the database
    await mongoose.connect("mongodb://localhost:27017/RaisingSuperstars", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");

    // Remove existing data
    await DailyPlan.deleteMany({});
    console.log("Cleared existing data");

    // Insert the sample data
    await DailyPlan.create(sampleData);
    console.log("Database seeded successfully");

    // Close the connection
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();