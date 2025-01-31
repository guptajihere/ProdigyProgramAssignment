const express= require('express')
const DailyPlanModel=require("../Model/Schema") 

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
        const day = req.params.day;
        const dailyPlans = await DailyPlanModel.findOne(); // Fetch the daily plans from MongoDB
        if (!dailyPlans) {
          return res.status(404).json({ message: "No plans found" });
        }
        const dayIndex = dailyPlans.days.indexOf(day);
      
        if (dayIndex === -1) {
          return res.status(404).json({ message: 'Day not found' });
        }
      
        const dayPlan = dailyPlans.plans.map(plan => ({
          ...plan._doc,
          completed: plan.completed[dayIndex] // Show completion for that day
        }));
      
        res.json(dayPlan);
    }
    catch(error) {
        res.status(500).json({ error: "Error fetching specific day's plans" });
      }
}

module.exports={getPlans, dayPlan}