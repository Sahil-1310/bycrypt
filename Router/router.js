var express=require('express');
var router=express.Router();
var bycrpt=require('bcrypt');
var jwt=require('jsonwebtoken');
var signup=require('../Model/schema');
var app=express();
// app.use(express.urlencoded());
// var verify=require('../Middleware/verify');

require('dotenv').config();

router.post('/signup',async(req,res)=>
{
    try {
            const salt= await bycrpt.genSalt(10);
            const hashedpassword=await bycrpt.hash(req.body.password,salt);
            const data=new signup({
                email:req.body.email,
                password:hashedpassword
            })
            const s1=await data.save();
            //Make a json Web Token
            const accessToken=jwt.sign({_id:s1._id},process.env.ACCESS_TOKEN_SECRET);
            res.json({accessToken:accessToken});  
         } 
         catch (error){
         console.log(`Error:${error}`);
    }
});
router.post('/login',authentication,async(req,res)=>{
    try {
        const data=await signup.findById(req.decoded._id);
        if(data==null)
            res.status(400).send('invalid')
        if(await bycrpt.compare(req.body.password,data.password)){
           res.json("sucessfully login");}
        else{
          res.json("Invalid User");  } 
        
    } catch (error) {
        res.json(`Error:${error}`)
    }
})


//MiddleWare
function authentication (req,res,next){
    const authHeader=req.headers.authorization;
    // console.log(req.headers);
    const token =authHeader && authHeader.split(' ')[1];
    if(token==null) return res.sendStatus(401);

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>
    {
        if(err) return res.sendStatus(403);
        req.decoded=decoded;
        // console.log(req.decoded);
    })
    next();
}
module.exports=router;

