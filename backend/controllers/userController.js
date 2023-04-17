import asyncHandler from "express-async-handler"
import User from '../models/userModel.js'

// @desc Auth user and get token 
// @route POST /api/users/login
// @access PUBLIC
const authUser = asyncHandler(async (req, res) => {
  // Get data from the body
  const {email, password} = req.body
  res.send({email, password})
})

export {
  authUser
}