import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const User = mongoose.models.SignUpData || mongoose.model("SignUpData", UserSchema);
export default User;
