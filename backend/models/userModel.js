import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        lastname: { type: String, required: true },
        firstname: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        isAdmin: { type: Boolean, default: false, required: true },
        age: { type: Number, required: true },
        phoneNumber: { type: String, required: true },
        gender: { type: String, required: true },
        city: { type: String, required: true },
        address: { type: String, required: true },
        postalCode: { type: Number, required: true },
        country: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model('User', userSchema);
export default User;