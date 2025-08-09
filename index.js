import express from 'express';

const app=express();
const PORT=8000;

app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/",(req,res)=>{
    res.render("home")
})

app.listen(PORT,()=>{
    console.log("Server runnning")
})