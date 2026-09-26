import {Schema, model} from 'mongoose';

const jobApplicantSchema = new Schema({
    name:{
        type:String,
        unique:true,
        trim:true,
        minlength:[3,'Name must be at least 3 characters long'],
        maxlength:[100,'Name cannot exceed 100 characters'],
        required:true
    },
    email:{
        type:String,
        unique:true,
        trim:true
    },
    skills:{
        type:[String],
        required:true
    }
},
{
    versionKey: false,
    timestamps: true,
    strict: "throw",
  }
);

export const jamodel=model('JobApplicant',jobApplicantSchema);