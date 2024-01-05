const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        location: { type: String, required: false },
        phone: { type: String, required: false },

        isAdmin: { type: Boolean, default: false },
        isAgent: { type: Boolean, default: false },
        skills: { type: Array, default: false },
        profile: { type: String, required: true, default: 'https://d326fntlu7tb1e.cloudfront.net/uploads/b8bac89b-b85d-4ead-bb9e-57c96e03a08b-vinci_02.jpg' }
    }, { timestamps: true }
);
const User = mongoose.model('User', UserSchema);
module.exports = User;