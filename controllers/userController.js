const User = require('../model/user.js')
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')


const signup = async (req,res)=>{
    const {username , email , password} = req.body
    try {
        const exisitingUser = await User.findOne({email:email})
        if(exisitingUser){
            return res.status(401).json({message:"User Already exist"})
        }
        const hashedPassword = await bcryptjs.hash(password,10)
        const result = await User.create({
            username:username,
            email:email,
            password:hashedPassword
        })
        const token = jwt.sign({email:result.email,id:result._id},"secretkey")
        res.status(200).json({user:result,token})
    } catch (error) {
        res.status(401).json({message:'Something went Wrong'})
    }
}



const signin = async (req,res)=>{
    const {email,password}= req.body
    try {
        const exisitingUser = await User.findOne({email:email})
        if(!exisitingUser){
            return res.status(404).json({error})
        }
        const matchPassword = await bcryptjs.compare(password,exisitingUser.password)
        if(!matchPassword){
            res.status(400).json({error})
        }
        const token = jwt.sign({email:exisitingUser.email,id:exisitingUser._id},"secretkey")
        res.status(200).json({user:exisitingUser,token:token})
    } catch (error) {
        res.status(400).json({message:'Error'})
    }
}


const getUser = async (req, res) => {
    try {
      const user = await User.find({});
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ mesaage: error });
    }
  };
  
  const getUserById = async (req,res) =>{
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      res.status(200).json(user);
    } catch (error) {
      res.status(404).json({ mesaage: error });
    }
  }
  
  const deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findByIdAndDelete(id);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ mesaage: error });
    }
  };
  
  const updateUser = async (req,res) =>{
    try {
      const { id } = req.params;
      const user = await User.findByIdAndUpdate(id, req.body);
      if (!user) {
        res
          .status(404)
          .json({ mesaage: "User not Updated Some internal Error Occurs" });
      }
      const updatedUser = await User.findById(id);
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(404).json({ mesaage: error });
    }
  }




module.exports = {signin,signup,getUser,getUserById,deleteUser,updateUser}