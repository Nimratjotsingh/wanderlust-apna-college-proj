const express = require('express');
const app = express();
const port = 8080;
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate')
const localStrategy = require('passport-local');
const userModel  = require('./models/user');
const session = require('express-session');
const MongoStore = require('connect-mongo').default;
const passport = require('passport');
const multer = require('multer');
const upload = multer({dest: '/uploads'})


require('dotenv').config();
require('./db');


const store = MongoStore.create({
    mongoUrl: process.env.DB_URL,
    crypto:{
        secret: 'keyboard cat'
    },
    touchAfter: 24*3600
});

store.on("error",(err)=>{
    console.log("Error in MONGO SESSION STORE",err);
})

app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(session({
    store,
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}));


app.engine('ejs',ejsMate);

app.set('view engine', 'ejs');
app.use(express.static('public'))


app.use(passport.initialize());
app.use(passport.session())

passport.use(new localStrategy(userModel.authenticate()));
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());

app.use((req,res,next)=>{
    res.locals.currUser = req.user;
    next();
})


app.use(require('./routes/normalRoutes'));
app.use(require('./routes/reviewsRoutes'));
app.use(require('./routes/user'));

app.use((req, res, next) => {
    res.status(404).render("error.ejs", {
        message: "Page not found"
    });
});

app.use((err,req,res,next)=>{
    let {statusCode = 500, message="Something went wrong"} = err;
    res.render('error.ejs',{message});
})
app.listen(port,()=>{
    console.log(`App is listening on port ${port}`);
})