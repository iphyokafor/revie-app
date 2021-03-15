import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        min: 3,
        max: 50,
    },
    lastName: {
        type: String,
        required: true,
        min: 3,
        max: 50,
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    refreshedToken: {
        type: String,
        required: false,
    },
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);

export default User;