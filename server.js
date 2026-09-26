import exp from 'express';
import{connect} from 'mongoose';
import {config} from 'dotenv';  
import cookieParser from 'cookie-parser';
import { japp } from './API_ROUTES/job_applicants.js'; 
import { UserApp } from './API_ROUTES/user.js';
import { AdminApp } from './API_ROUTES/Admin.js';
config();
const app = exp();
app.use(exp.json());
async function connectdb(){
    try{
        await connect(process.env.MONGO_URI);
        console.log('connected to DB successfully...');
        app.listen(process.env.PORT,()=>{
            console.log(`server is running on port ${process.env.PORT}`);
        })

    }
    catch(err){
        console.error('Error connecting to DB:', err);
    }
}
connectdb();
app.use(cookieParser());
app.use('/job-api',japp);
app.use('/user-api',UserApp);
app.use('/admin-api',AdminApp);
async function errorHandler(err,req,res,next){
console.error("Error Logged:", err.message);
}   
app.use(errorHandler);
