import jwt from 'jsonwebtoken'
import { asyncHandler } from '../middlewares/async.js'
import ErrorResponse from '../utils/errorResponse.js'
import { User } from '../models/User.js'

export const protect = asyncHandler(async (req, res, next) => { 
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  } else if (req.cookies.token) {
    console.log('token', req.cookies.token)
    token = req.cookies.token
  }

    if (!token) {
      return next(new ErrorResponse(`Not authorized to access this route`, 401))
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id)
    next()
  } catch (e) {
    return next(new ErrorResponse(`Not authorized to access this route`, 401))
  }

})