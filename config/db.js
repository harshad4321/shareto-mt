
require('dotenv').config();
const mongoose = require ('mongoose');

//Database  connection 
  
const connectDB = async () => {
    try {
    const conn= await mongoose.connect(process.env.MONGO_CONNECTION_URL,{
         useUnifiedTopology: true,
            useNewUrlParser: true,
           });
    
        console.log(`DATABASE is Connected.`)
    
     } catch(error){
        console.log(error.message)
        console.log('DATABASE is Connecton failed.')
    }
}

module.exports=connectDB;