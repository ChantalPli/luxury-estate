import mongoose from 'mongoose';

const userSchema = new mongoose.Schema ({
 username:{
  type:String,
  required:true,
  unique:true
 },
 email:{
  type:String,
  required:true,
  unique:true
 },
 password:{
  type:String,
  required:true
 },
 avatar:{
  type: String,
  default: 'https://i.pinimg.com/736x/59/37/5f/59375f2046d3b594d59039e8ffbf485a.jpg'
 },
},
{timestamps:true})

const User = mongoose.model('User', userSchema)

export default User