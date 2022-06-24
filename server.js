
const express = require ("express")
const app = express();
const path = require('path')
const connectDB=require('./config/db');// DB connection
require('dotenv').config()


// const notFound = require('./middleware/not-found')
//middleware


app.use(express.json());
app.use(express.static('public'));
 
//Template engine

app.set('views', path.join(__dirname,'/views'));
app.set('view engine','ejs'); 

// Routes

// app.use(notFound)

app.use('/api/files',require('./routes/files'));
app.use('/files',require('./routes/show')); 
app.use('/files/download',require('./routes/download'));

const PORT = process.env.PORT|| 3000;
const start =async()=>{
    try{   
await connectDB(process.env.MONGO_CONNECTION_URL)
console.log()
// server.listen(3000);
app.listen(PORT,()=>{
    console .log(`server  is connected to port ${(PORT)}...`);  
})   
    }catch(error){
       console.log(error); 
    }
}
start()