import exp from 'express';
import { jamodel } from '../Models/job_applicant_model.js';
export const japp=exp.Router();

//applying for company
japp.post("/ja",async(req,res)=>{
    let applicant=req.body;
    await jamodel.create(applicant);
    res.json({message:"Successfully applied..."});  
})
//delete application for this company
japp.delete("/ja/:id",async(req,res)=>{
    let aid=req.params.id;
    let del=await jamodel.findByIdAndDelete(aid);
    res.json({message:"Successfully deleted and deleted user is:" ,del});
})

