import exp from 'express';
import { hash,compare } from 'bcryptjs';
import jwt from "jsonwebtoken";
import { jamodel } from '../Models/job_applicant_model.js';
import{verifyToken} from '../Middlewares/Token_Verification.js'
import{allowedRoles} from '../Middlewares/Roles_check.js'
import { UserModel } from '../Models/user_model.js';
export const UserApp=exp.Router();

//User Registration
UserApp.post("/user",async(req,res)=>{
    let user=req.body;
    let hashedPassword = await hash(user.password, 12);
    user.password = hashedPassword;  
    UserModel.create(user);
    res.json({message:"User successfully registered in..."})
});
//User Login
UserApp.post("/login",async(req,res)=>{
    let obj=req.body;
    let user=await UserModel.findOne({email:obj.email});
    if(user==null){
        res.json({message:"Invalid Email"});
    }
    else{
     let isPasswordValid=await compare(obj.password,user.password);
     if(isPasswordValid==false){
        res.json({message:"Inavlid Password...."});
     }
     else{
        let signedToken=jwt.sign({ id: user._id, role: user.role },"abcdef",{expiresIn:"1d"});
        res.cookie("accessToken",signedToken,{
            httpOnly:true,
            sameSite:"lax",
            secure:false
        })
        res.json({message:"Login Successful"});
     }
    }
})
//User Logout
UserApp.post("/logout",async (req, res) => {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: false,        
})
res.json({ message: "Logout Successful" });
})
//View User-->Protected Route 
UserApp.get("/view/:id",verifyToken,allowedRoles("USER"),async(req,res)=>{
    let uid=req.params.id;
    let user1=await UserModel.findById(uid);
    if(req.user.id!==uid){
        res.status(403).json({ message: "Access Denied" });
    }
    if(user1==null){
        res.json({message:"User Not Found"});
    }
    else{
        res.json(user1);
    }

})
//View eligible list-->Protected Route
UserApp.get("/eligible",verifyToken,allowedRoles("USER"),async(req,res)=>{
    let {criteria}=req.body;
    if(criteria===undefined){
        res.json("Enter skills!!!");
    }
    else{
         let eligible_people=await jamodel.find({
        skills:{$all:criteria}
        })
        res.json({
            message:"Eligible People are:",
            count: eligible_people.length,
            people: eligible_people
        })
    }

})
