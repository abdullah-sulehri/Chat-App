import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
export const signup = async(req,res)=>{
    const {fullName,email,password} = req.body;
    try{
        if(!fullName || !email || !password){
            res.status(500).json({message: "All fields are required"})
        }

        if(password.length<6){
            return res.status(400).json({message: "password must be atleast 6 characters long"});
        } 
        const user=await User.findOne({email});
        if(user){
            return res.status(400).json({message: "User already exists with that email"});
        }
        const salt = await bcrypt.genSalt(10); //Generates a random string
        const hashedPassword=await bcrypt.hash(password,salt); //String is attached to password and password is encrypted
        const newUser =new User({
            fullName:fullName,
            email:email,
            password:hashedPassword,
        });
        if (newUser){
            generateToken(newUser._id,res)
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,  
            })
        }
        else{
            res.status(400).json({message:"Error creating new user"});
        }

    }catch(error){
        console.log("Error in Signup COntroller",error.message);
        res.status(500).json({message: "Internal Server Error"});
    }
   
}

export const login = async(req,res)=>{
    const {email,password}=req.body;
    try{
        if(!email || !password) {
            res.status(400).json({message:"email and password are required"});
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"Invalid credentials"});
        }
        const  isPasswordCorrect = await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message: "incorrect password"});
        }
        generateToken(user._id,res);
        res.status(200).json({
            userId:user._id,
            fullName:user.fullName, 
            email: user.email,
            profilePic: user.profilePic,
            createdAt: user.createdAt
        })
    }
    catch(error){
        res.status(500).json({message:"internal server error"});
    }

}

export const logout = (req,res)=>{
    try{
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message: "Logged Out Successfully"});    
    }
    catch(error){
        res.status(500).json({message:"internal server error"});
    }
}
export const updateProfile = async(req,res)=>{
    try{
        const {profilePic} = req.body;
        const userId=req.user._id;
        if(!profilePic){
            return res.status(400).json({message: "Profile pic is required"});
        }
        const uploadRes=await cloudinary.uploader.upload(profilePic);
        const updatedUser= await User.findByIdAndUpdate(userId,{profilePic: uploadRes.secure_url},{new: true})
        res.status(200).json(updatedUser);

    }
    catch(error){
        res.status(500).json({message:"internal server error"});

    }

}
export const checkAuth = (req,res) =>{
    try{
        res.status(200).json(req.user)
    }
    catch(error){
        console.log("Error in check Auth",error.message);
        res.status(500).json({message:"internal server error"});

    }
}