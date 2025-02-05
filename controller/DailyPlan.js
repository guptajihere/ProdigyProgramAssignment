const express= require('express')
const DailyPlanModel=require("../Model/DailyPlan") 
const UserProgress = require("../Model/UserProgress");

const getPlans=async(req,res)=>{
    try {
      const dailyPlans = await DailyPlanModel.findOne(); // Fetch the daily plans from MongoDB
      if (!dailyPlans) {
        return res.status(404).json({ message: "No plans found" });
      }
        res.json({
          week: "14-21",
          dailyPlans,
        });
      } catch (error) {
        res.status(500).json({ error: "Error fetching plans" });
      }
}

const dayPlan=async (req,res)=>{
    try{

        const { userId } = req.query; // Get userId from request
        const day = req.params.day;
        const dailyPlans = await DailyPlanModel.findOne(); // Fetch the daily plans from MongoDB
        if (!dailyPlans) {
          return res.status(404).json({ message: "No plans found" });
        }
        const dayIndex = dailyPlans.days.indexOf(day);
      
        if (dayIndex === -1) {
          return res.status(404).json({ message: 'Day not found' });
        }
        const userProgress = await UserProgress.find({ userId, day });

      
        const dayPlan = dailyPlans.plans.map((plan) => {
          const isCompleted = userProgress.some(
            (progress) => progress.planId.toString() === plan._id.toString()
          );
          return {
            ...plan._doc, // to get the actual data 
            completed: isCompleted,
          };
        });
      
        res.json(dayPlan);
    }
    catch(error) {
        res.status(500).json({ error: "Error fetching specific day's plans" });
      }
}

module.exports={getPlans, dayPlan}