const express = require('express');
//const bodyParser = require('body-parser');
//const mongoose = require('mongoose');
const cors = require('cors');

const plansRoute = require('./routes/DailyPlan');
const progressRoute = require('./routes/ProgressActivity');

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/plans', plansRoute);
app.use('/api/progress', progressRoute);

app.listen(3000,()=>console.log("port is running on your 3000 number"))