const mongoose = require('mongoose');
require("dotenv").config();
const connectDB = async () => {
   try{ 
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");
}catch(err){
    console.log("failed");
    console.error(err.message);
    process.exit(1);
}
}
console.log("Connecting to MongoDB...")
connectDB();
module.exports = connectDB;