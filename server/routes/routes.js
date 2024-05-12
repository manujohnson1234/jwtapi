const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../db/schema');
const passport = require('passport');
require('dotenv').config();

const router = express.Router();

router.post('/signup', (req, res)=>{

    const newUser = new User({
        fullname : req.body.fullname,
        email : req.body.email,
        password: req.body.password
    })

    newUser.save()
    .then(user => {
        console.log('User created successfully:', user);
        res.status(200).json({message: 'added sucessfully'});
    })
    .catch(error => {
        console.error('Error creating user:', error.message);
        res.json({message: 'user already exists u can login'});
    });

    
})


router.post('/login', async (req, res)=>{
    const {email, password} = req.body;

    try{
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if(password != user.password){
            return res.status(401).json({ message: 'Incorrect password' });
        }


        const payload = {sub: user.id, email: user.email};
        const token = jwt.sign(payload, process.env.secret_key); // creating token

        return res.status(200).json({ message: 'Login successful', token: token});

    }catch(e){
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }

})

router.get('/home',passport.authenticate('jwt',{session: false}),(req, res)=>{
    res.json({message: 'protected route accessed'});
})

module.exports = router;
