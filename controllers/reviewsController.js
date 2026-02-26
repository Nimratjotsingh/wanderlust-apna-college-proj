const listing = require("../models/listing")
const reviews = require("../models/reviews")

exports.reviewReq = async(req,res)=>{
    try{
        const listingData = await listing.findById(req.params.id);
        if(!listingData){
            res.render("error.ejs",{message: "Listing not found"});
        }
        const newReview = new reviews(req.body.review);
        listingData.reviews.push(newReview);
        newReview.author = req.user._id
        const reviewDetails = await newReview.save();
        await listingData.save();
        res.redirect('/listing/' + req.params.id);
    }catch(error){
        res.render("error.ejs",{message: error.message});
    }
}

exports.deleteReview = async(req,res)=>{
    try{
        const {id, reviewId} = req.params;
        await reviews.findByIdAndDelete(reviewId);

        const listingData = await listing.findByIdAndUpdate(id,{$pull: {
            reviews: reviewId
        }}) 
        res.redirect('/listing/' + req.params.id);
    }catch(e){
        res.render("error.ejs",{message: e.message});
    }
}