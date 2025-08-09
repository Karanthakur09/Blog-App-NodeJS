import express from 'express';
import userRoute from './routes/user.js'
import mongoose from 'mongoose';
//connection to mongoDb

const app=express();
const PORT=8000;

mongoose.connect("mongodb://localhost:27017/blogify").then((e)=>{
    console.log("MongoDb connected!!")
})

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.urlencoded({extended:false}))

app.get("/",(req,res)=>{
    res.render("home")
})

app.use('/user',userRoute);

app.listen(PORT,()=>{
    console.log("Server runnning")
})