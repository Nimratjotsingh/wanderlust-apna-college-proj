const listing = require('../models/listing');

exports.home = async(req,res)=>{
    const bulkdata = await listing.find({});
    res.render('listing/index.ejs',{bulkdata})
}

exports.listing = async(req,res) =>{
    let {id} = req.params;
    const data =  await listing.findById(id);
    console.log(data);
    res.render('listing/show.ejs',{data});
}
exports.new = (req,res)=>{
    res.render('listing/new.ejs');
}
exports.edit = async (req,res)=>{
    let {id} = req.params;
    let data = await listing.findById(id);
    res.render('listing/edit.ejs',{data});
}


exports.listingReq = async (req,res)=>{
    let {title,description,image,price,location,country} = req.body;
    const newListing = new listing({
        title,
        description,
        image: {url: image},
        price,
        location,
        country
    });
    let saved = await newListing.save();
    console.log(saved)
    res.redirect('/')
}

exports.editReq = async (req,res)=>{
    let {id} = req.params;
    let {title,description,image,price,location,country} = req.body;
    let data = await listing.findByIdAndUpdate(id,{
        title,
        description,
        image: {url: image},
        price,
        location,
        country
    },{new: true});
    res.redirect('/listing/' + id);

}

exports.deleteReq = async(req,res)=>{
    let {id} = req.params;
    const del = await listing.findByIdAndDelete(id);
    res.redirect('/')
}