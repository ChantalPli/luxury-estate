import User from "../models/user.model.js"
import bcryptjs from 'bcryptjs'
// import { errorHandler } from "../utils/error.js"

export const signup = async(req,res,next) => {
  console.log(req.body)
  const {username,email,password} = req.body
  const hashedPassword = bcryptjs.hashSync(password,10)
  const newUser = new User({username,email,password: hashedPassword})
  try{
    await newUser.save()
    res.status(201).json("User created successfully") 
  }catch(error){
   next(error)
  }
}










// import User from "../models/user.model.js"
// import bcryptjs from 'bcryptjs'
// // import { errorHandler } from "../utils/error.js"

// export const signup = async(req,res,next) => {
//   const username = 'test550';
//   const email = 'test550@gmail.com';
//   const password = 'test550pw';
  
//   const hashedPassword = bcryptjs.hashSync(password,10)
//   const newUser = new User({username,email,password: hashedPassword})
//   try{
//     await newUser.save()
//     res.status(201).json("User created successfully") 
//   }catch(error){
//    next(error)
//   }
// }

