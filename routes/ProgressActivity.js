const express= require('express')
const updateProgressStatus=require("../controller/ProgressActivity");

const router= express.Router()

router.put('/day/:day/complete',updateProgressStatus)

module.exports = router;