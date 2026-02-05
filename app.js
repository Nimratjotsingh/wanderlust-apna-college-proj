const express = require('express');
const app = express();
const port = 8080;
const methodOverride = require('method-override');
require('dotenv').config();
require('./db');

app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"))

app.use(require('./routes/normalRoutes'));


app.listen(port,()=>{
    console.log(`App is listening on port ${port}`);
})