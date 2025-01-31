const express= require('express')
//const dailyPlans=require("../SampleData") //import the sample data 
const DailyPlanModel=require("../Model/Schema") 

const updateProgressStatus=async(req,res)=>{
    try {
        const day = req.params.day;

         // Fetch the daily plans document
        const dailyPlans = await DailyPlanModel.findOne();
        if (!dailyPlans) {
        return res.status(404).json({ message: "No plans found" });
        }

        // Find the index of the day
        const dayIndex = dailyPlans.days.indexOf(day);

        if (dayIndex === -1) {
            return res.status(404).json({ message: 'Day not found' });
        }

        //  const {error}=validate(req.body)
        //     if(error)return res.status(400).send(error.details[0].message)
           
        const { category, activity } = req.body; //Expected data should be like { category: 'Athleticism', activity: 'Advanced Mobility exercises' }

        if (!category || !activity) {
            return res.status(400).json({ message: 'Missing category or activity' });
        }

        const planIndex = dailyPlans.plans.findIndex(plan => plan.category === category && plan.activity === activity);

        if (planIndex === -1) {
            return res.status(404).json({ message: 'Plan not found' });
        }

        dailyPlans.plans[planIndex].completed[dayIndex] = true;
       
        // Save the updated document back to the database
        await dailyPlans.save();

        res.json({ message: 'Plan updated successfully', updatedPlan: dailyPlans.plans[planIndex] });

      } catch (error) {
        res.status(500).json({ error: "Error fetching plans",message:error.message });
      }
}
module.exports= updateProgressStatus