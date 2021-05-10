require("dotenv").config();

const express = require('express');
const cors = require('cors');
const request = require('request');

//HELPERS
const { handleError } = require("./helpers/error");

//CONNECT DB
const connectDB = require("./config/db");
connectDB();

//CONFIG
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());


app.get('/', (req, res) => res.send('API running'));

// Define Routes
//---API
app.use('/api',require('./route/api/scan.api') );
app.use('/api/report',require('./route/api/report.api') );

//---ADMIN
app.use('/admin/service',require('./route/admin/service.admin') );

// HANDLE ERROR
app.use((err, req, res, next) => {
    handleError(err, res);
  });

//FOR DEVELOPMENT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
