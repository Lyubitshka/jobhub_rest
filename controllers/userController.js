const User = require("../models/User");
const CryptoJS = require('crypto-js');

module.exports = {
    updateUser: async (req, res) => {
        if (req.body.password) {
            req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET).toString();
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.user.id, {
                $set: req.body
            }, { new: true });

            const { password, __v, createdAt, ...others } = updatedUser._doc;

            res.status(200).json({ ...others });
        } catch (err) {
            res.status(500).json(err);
        }

    },

    deleteUser: async (req, res) => {
        try {
            await User.findByIdAndDelete(req.user.id);
            res.status(200).json("Account successfully Deleted");
            
        } catch (err) {
            res.status(401).json(err);
        }
    },

    getUser: async(req, res) =>{
        try{
            const user= await User.findById(req.user.id);
            const { password, __v, createdAt, ...userdata } = user._doc;
            res.status(200).json(userdata);
        }catch(err){
            res.status(500).json(err);
        }
    },
    getAllUsers: async (req, res) => {
        try {
            const allUser = await User.find();

            res.status(200).json(allUser)
        } catch (error) {
            res.status(500).json(error)
        }
    },


}