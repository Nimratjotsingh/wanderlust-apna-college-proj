const mongoose = require('mongoose');
require('dotenv').config();
require('../db.js');


const listing = require('../models/listing.js');


let sampleListing = new listing({
    title: "My New  Villa",
    description: "By the beach.",
    price: 1200,
    location: "Calungute, Goa",
    country: "India"
})

sampleListing.save().then((res)=>{console.log(res)}).catch((e)=>{
    console.log(e)
});


