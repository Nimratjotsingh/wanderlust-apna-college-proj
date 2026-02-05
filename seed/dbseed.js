const mongoose = require('mongoose');
require('dotenv').config();
require('../db.js');
const {data} = require('./db-bulk-data.js')

const listing = require('../models/listing.js');

listing.insertMany(data).then((res)=>{console.log(res)}).catch((e)=>{
    console.log(e);
})

