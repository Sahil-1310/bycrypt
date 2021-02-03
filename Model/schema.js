var mongoose=require('mongoose');
 var schema=new mongoose.Schema({
     email:{required:true,type:String},
     password:{type:String,required:true},
     accessToken:{type:String}
 })
 module.exports=mongoose.model("signup",schema);