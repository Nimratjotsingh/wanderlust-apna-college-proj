const userSchema = require('../models/user');

exports.signup = async (req,res)=>{
    res.render('users/signup.ejs')
}

exports.login = async (req,res)=>{
    res.render('users/login.ejs')
}

exports.signupReq = async (req,res,next)=>{
    const {username,email,password} = req.body;
    try{
        const user  = new userSchema({
            email, username
        });
        const registeredUser = await userSchema.register(user,password);
        req.login(registeredUser,(err)=>{
            if(err){
                next(err);
            };
            res.redirect('/')
        })
    }catch(err){
        res.render('error.ejs',{message: err.message})
    }
}

exports.loginReq = async (req,res)=>{
    res.redirect('/');
}

exports.logOut = async (req,res,next)=>{
    req.logOut((err)=>{
        if(err){
            return next(err);
        }
        res.redirect('/')
    })
}