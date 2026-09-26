import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minLength: [4, "Min length of name should be 4"],
      maxLength: [20, "Max length of name should not exceed 20"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      unique: [true, "Email already existed"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [4, "Min length of password should be 4"],
      trim: true,
    },
    role: {
      type: String,
      enum: {
        values: ["USER", "ADMIN"],
        message: "Invalid role",
      },
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
    strict: "throw",
  }
);
export const UserModel=model("user",userSchema);