const express= require('express')
//const dailyPlans=require("../SampleData") //import the sample data 
const { getPlans, dayPlan } = require("../controller/DailyPlan");

const router= express.Router()

router.get('/',getPlans)
router.get('/day/:day', dayPlan)

module.exports = router;