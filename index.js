var express =require('express');
var mongoose=require('mongoose');
let router=require('./Router/router')
var app=express();

//Using bodyParser
app.use(express.json());

//connected with database
mongoose.connect('mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false',{useNewUrlParser:true,useUnifiedTopology: true},()=>{
    console.log("connected to mongodb");
})
app.use('/',router);
app.listen(4000,()=>{console.log("Connected to 4000");})

