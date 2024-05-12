const express = require('express');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const dbConnect = require('./db/dbconnect.js');
const User = require('./db/schema.js');
require('dotenv').config();

const app = express();

app.use(express.json());

dbConnect();
app.use(passport.initialize());

const JWTStartergy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

passport.use(new JWTStartergy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.secret_key,
}, async (jwtPayload, done)=>{
    
    const user = await User.findById(jwtPayload.sub);

    if(user){
        return done(null, user);
    }else{
        return done(null, false);
    }
}));


app.use('/', require('./routes/routes.js'));

const PORT = 8080;

app.listen(PORT, ()=>{
    console.log('server is running in port 8080');
})
