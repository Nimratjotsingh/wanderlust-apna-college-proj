const mongoose = require('mongoose');
const { type } = require('os');

const defaultImg = "https://img.freepik.com/premium-photo/abstract-blur-defocused-hotel-lobby-interior-background-vintage-filter_875825-64135.jpg?semt=ais_hybrid&w=740&q=80";

const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image:{
        url: {
            type: String,
            default: defaultImg,
            set: (v) => v === '' ? defaultImg : v
        },
        filename: String
    },
    price:{
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("listing",listingSchema);