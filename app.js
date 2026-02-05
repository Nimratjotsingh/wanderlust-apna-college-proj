const express = require('express');
const app = express();
const port = 8080;
require('dotenv').config();
require('./db');

app.listen(port,()=>{
    console.log(`App is listening on port ${port}`);
})