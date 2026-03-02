const listing = require('../models/listing');
const reviews = require('../models/reviews');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');

const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

exports.home = async(req,res)=>{
    const bulkdata = await listing.find({}).sort({ _id: -1 });;
    res.render('listing/index.ejs',{bulkdata})
}

exports.listing = async(req,res) =>{
    let {id} = req.params;
    const data =  await listing.findById(id).populate({path: "reviews" ,populate: {path: "author"}}).populate("owner");
    let ownerId = data.owner._id.toString();
    let userId = req.user ? req.user.id : null
    let show = ownerId == userId ? true : false 

    res.render('listing/show.ejs',{data, show, userId});
}
exports.new = (req,res)=>{
    res.render('listing/new.ejs');
}
exports.edit = async (req,res)=>{
    let {id} = req.params;
    let data = await listing.findById(id);
    const ownerId = data._id.toString();
    const userId = req.user ? req.user.id : null;
    if(ownerId != userId){
        return res.render('error.ejs',{message: 'Sorry you are not permitted to do this action!'})
    }
    console.log(data);
    res.render('listing/edit.ejs',{data}); 
}


exports.listingReq =  async (req,res)=>{
    const response = await geocodingClient.forwardGeocode({
        query: req.body.location,
        limit: 1
    })
    .send();

    console.log(response.body.features[0].geometry);

    const {path,filename} = req.file;
        let {title,description,price,location,country} = req.body;
        const newListing = new listing({
            title,
            description,
            image: {url: path, filename},
            price,
            location,
            country,
            owner: req.user._id
        });
        newListing.geometry = response.body.features[0].geometry;
        let saved = await newListing.save();
        console.log(saved)
        res.redirect('/')
}

exports.editReq = async (req,res)=>{
    let {id} = req.params;
    let {title,description,price,location,country} = req.body;
    let editList = await listing.findById(id);
    let ownerId = editList.owner._id.toString();
    let userId = req.user ? req.user.id : null;
    if(ownerId != userId){
        return res.render('error.ejs',{message: 'Sorry you are not permitted to do this action!'})
    }
    

    let data = await listing.findByIdAndUpdate(id,{
        title,
        description,
        price,
        location,
        country
    },{new: true});

    if(typeof req.file !== 'undefined'){
        const {path,filename} = req.file;
        data.image = {url: path, filename};
        await data.save();
    }

    res.redirect('/listing/' + id);

}

exports.deleteReq = async(req,res)=>{
    let {id} = req.params;
    const data = await listing.findById(id);
    const ownerId = data.owner._id.toString();
    let userId = req.user ? req.user.id : null;
    if(ownerId != userId){
        return res.render('error.ejs',{message: 'Sorry you are not permitted to do this action!'})
    }
    for(let review of data.reviews){
        await reviews.findByIdAndDelete(review);
    }
    const del = await listing.findByIdAndDelete(id);
    res.redirect('/')
}