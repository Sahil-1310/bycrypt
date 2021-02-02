var express=require('express');
var router=express.Router();
var bycrpt=require('bcrypt');
var signup=require('../Model/schema');

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
            res.json(s1);
        
    } catch (error) {
        console.log(`Error:${error}`);
    }
});
router.post('/login',async(req,res)=>{
    try {
        const email=req.body.email;
        const data=await signup.findOne({email});

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
module.exports=router;

