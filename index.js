import express from 'express';
import userRoute from './routes/user.js';
import blogRoute from './routes/blog.js';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { checkForAuthCookie } from './middlewares/authentication.js';
import Blog from './models/blog.js';
import path from 'path';
const app=express();
const PORT=8000;

mongoose.connect("mongodb://localhost:27017/blogify").then((e)=>{
    console.log("MongoDb connected!!")
})
//middlewares
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(checkForAuthCookie('token'));
app.use(express.static(path.resolve('./public')));

app.get("/",async (req,res)=>{
    const allBlogs=await Blog.find({});
    res.render("home",{
        user:req.user,
        blogs:allBlogs
    })
})

//routes
app.use('/user',userRoute);
app.use('/blog',blogRoute);

app.listen(PORT,()=>{
    console.log(`Server runnning on port: ${PORT}`)
})