const mongoose = require ('mongoose');

//Database  connection 
  
function connectDB(){

    mongoose.connect(url,{ useNewUrlParser:true,
    userCreateIndex:true, userUnifiedTopology:true,userFIndModify:true});
    const connect=mongoose.connection;
    

    connection.once('open',()=>{
        console.log('DATABASE Connected.')
    }).catch(err=>{
        console.log('DATABASE is Connecton failed.')
    })

}

module.exports=connectDB;