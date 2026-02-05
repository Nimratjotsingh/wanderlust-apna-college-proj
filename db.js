const mongoose = require('mongoose');

module.exports = mongoose.connect(process.env.DB_URL).then(()=>{
    console.log('Connected to DB');
}).catch((e)=>{
    console.log('Error connecting to DB: ' + e);
})