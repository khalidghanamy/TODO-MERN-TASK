import mongoose from "mongoose";
import { Schema } from "mongoose";
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});
const User = mongoose.model("User", userSchema);
