module.exports.isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.orignalUrl;
        return res.redirect('/login');
    }
    next();    
}

module.exports.redirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        console.log(req.session.redirectUrl)
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}