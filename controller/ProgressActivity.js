const express= require('express')
const DailyPlanModel=require("../Model/DailyPlan") 
const UserProgress = require("../Model/UserProgress");
const updateProgressStatus=async(req,res)=>{
    try {
        const {userId,planId,day} = req.body;
        if (!userId || !planId || !day) {
          return res.status(400).json({ message: "Missing required fields" });
        }    
         // Check if progress exists for this user, plan, and day
   
         let progress = await UserProgress.findOne({ userId, planId, day });

    if (!progress) {
      progress = new UserProgress({ userId, planId, day, completed: true });
    } else {
      progress.completed = true;
    }

    await progress.save();
    res.json({ message: "Progress updated successfully", progress });
  } catch (error) {
        res.status(500).json({ error: "Error fetching plans",message:error.message });
      }
}
module.exports= updateProgressStatus