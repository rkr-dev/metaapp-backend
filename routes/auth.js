import express from 'express'
import {
  registerUser,
  loginUser,
  logoutUser,
  getMe,
  updateProfile,
  updatePassword,
  forgotPassword,
  passwordReset,
} from '../controllers/auth'
import { protect } from '../middlewares/auth.js'

const router = express.Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').post(logoutUser)

router.route('/profile').get(protect, getMe)
router.route('/updateprofile').put(protect, updateProfile)
router.route('/updatepassword').put(protect, updatePassword)

router.route('/forgotpassword').post(forgotPassword)
router.route('/passwordreset/:resettoken').put(passwordReset)

export default router
