const mongoose = require('mongoose');
require('dotenv').config();
require('../db.js');
const {data} = require('./db-bulk-data.js')

const listing = require('../models/listing.js');

const initDb = async ()=>{
    await listing.deleteMany({});
    let newData = data.map((obj)=>({...obj,owner:'699d6014ff8ea7305dd960e1'}))
    listing.insertMany(newData).then((res)=>{console.log(res)}).catch((e)=>{
        console.log(e);
    })
}

initDb();

