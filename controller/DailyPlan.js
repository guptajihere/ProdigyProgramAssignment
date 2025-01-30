const express= require('express')
const dailyPlans=require("../SampleData") //import the sample data 

const getPlans=async(req,res)=>{
    try {
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
        const dayIndex = dailyPlans.days.indexOf(day);
      
        if (dayIndex === -1) {
          return res.status(404).json({ message: 'Day not found' });
        }
      
        const dayPlan = dailyPlans.plans.map(plan => ({
          ...plan,
          completed: plan.completed[dayIndex] // Show completion for that day
        }));
      
        res.json(dayPlan);
    }
    catch(error) {
        res.status(500).json({ error: "Error fetching specific day's plans" });
      }
}

module.exports={getPlans, dayPlan}