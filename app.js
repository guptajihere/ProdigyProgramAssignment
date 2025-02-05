const express = require('express');
//const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const plansRoute = require('./routes/DailyPlan');
const progressRoute = require('./routes/ProgressActivity');

const app = express();
app.use(express.json()); // parses incoming json requests
app.use(cors());

mongoose
  .connect('mongodb://localhost:27017/RaisingSuperstars', {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('DB Connection Error:', err));

// Routes
app.use('/api/plans', plansRoute);
app.use('/api/progress', progressRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>console.log("port is running on your 3000 number"))