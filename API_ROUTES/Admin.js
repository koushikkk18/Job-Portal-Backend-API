import exp from 'express';
import { UserModel } from '../Models/user_model.js'
import { verifyToken } from '../Middlewares/Token_Verification.js';
import { allowedRoles } from '../Middlewares/Roles_check.js';
export const AdminApp=exp.Router();

//View all users
AdminApp.get("/view",verifyToken,allowedRoles("ADMIN"),async(req,res)=>{
    let users=await UserModel.find();
    res.json({"List of all users": users});
});
//Delete user
AdminApp.delete("/delete/:id",verifyToken,allowedRoles("ADMIN"),async(req,res)=>{
    let uid=req.params.id;
    let del=await UserModel.findByIdAndDelete(uid);
    res.json({message:"Deleted user is :",del});
});
