const mongoose = require('mongoose');
require('dotenv').config();


const dbConnect = async ()=>{

    try{
        await mongoose.connect(process.env.DB_URL)
        console.log("Sucessfully connected to MongoDB");
    }catch(e){
        console.log("Unable to connect to MongoDB");
        console.log(e);
    }
};

module.exports = dbConnect;