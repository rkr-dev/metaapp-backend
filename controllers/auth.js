import { asyncHandler } from '../middlewares/async.js'
import ErrorResponse from '../utils/errorResponse.js'
import { User } from '../models/User.js'
import { sendTokenResponse } from '../utils/sendTokenResponse.js'

// @desc      Register a new User
// @route     POST /api/v1/auth/register
// @access    Public

export const registerUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body)
  sendTokenResponse(user, 200, res)
})

// @desc      Login route for a User
// @route     POST /api/v1/auth/login
// @access    Public

export const loginUser = asyncHandler(async (req, res, next) => {
  const { email, username, password } = req.body
  if (!(email || username) || !password) {
    return next(
      new ErrorResponse(`email or username and a password is required`, 400)
    )
  }
  let loginType

  if (email) {
    loginType = { email: `${email}` }
  } else {
    loginType = { username: `${username}` }
  }
  const user = await User.findOne(loginType).select('+password')
  if (!user) {
    return next(new ErrorResponse(`Invalid Credentials`, 401))
  }

  const isMatch = await user.matchPassword(password)

  if (!isMatch) {
    return next(new ErrorResponse(`Invalid Credentials`, 401))
  }

  sendTokenResponse(user, 200, res)
})

// @desc      Logout User
// @route     POST /api/v1/auth/logout
// @access    Public

export const logoutUser = asyncHandler(async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
  })

  res.status(200).json({ success: true, data: {} })
})

// @desc      Get current Loggedin User
// @route     GET /api/v1/auth/me
// @access    Private

export const getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id)
  res.status(200).json({ success: true, data: user })
})

// @desc      Update Profile of the LoggedIn User
// @route     PUT /api/v1/auth/updateprofile
// @access    Private

export const updateProfile = asyncHandler(async (req, res, next) => {
  const fields = {
    name: req.body.name,
    email: req.body.email,
    ...req.body,
  }
  const user = await User.findByIdAndUpdate(req.user.id, fields, {
    new: true,
    runValidators: true,
  })
  res.status(200).json({ success: true, data: user })
})

// @desc      Update Password of the LoggedIn User
// @route     PUT /api/v1/auth/updateprofile
// @access    Private

export const updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password')

  // check current password
  if (!(await user.matchPassword(req.body.currentPassword))) {
    return next(new ErrorResponse(`Password is incorrect`, 401))
  }

  user.password = req.body.newPassword
  await user.save()
  sendTokenResponse(user, 200, res)
})

// @desc      Forgot Password for the LoggedIn User
// @route     POST /api/v1/auth/forgotpassword
// @access    Private

export const forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email })
  if (!user) {
    return next(new ErrorResponse(`No user with that email address`, 404))
  }

  // Get reset token
  const resetToken = user.getPasswordResetToken()

  await user.save({ validateBeforeSave: false })

  // Create reset URL
  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/auth/passwordreset/${resetToken}`

   const message = `You are recieving this email because you (or someone else) has requested the reset
  of a password. Please follow the link to update your password to \n\n ${resetURL}`


  try {
    sendEmail({
      email: user.email,
      subject: `Password reset for ${req.get('host')}`,
      message,
    })
    res.status(200).json({ success: true, message: 'Email Sent!' })
  } catch (e) {
    user.passwordResetToken = undefined
    user.passwordResetExpire = undefined

    await user.save({ validateBeforeSave: false })
    return next(new ErrorResponse(`Email could not be sent`, 500))
  }
})

// @desc      Reset Password for the LoggedIn User
// @route     POST /api/v1/auth/resetpassword/:resettoken
// @access    Private

export const passwordReset = asyncHandler(async (req, res, next) => {
  // get hashed Token
  const passwordResetToken = crypto
    .createHash('sha256')
    .update(req.params.resettoken)
    .digest('hex')

  const user = await User.findOne({
    passwordResetToken,
    passwordResetExpire: { $gt: Date.now() },
  })

  if (!user) {
    return next(new ErrorResponse(`Invalid Token`, 400))
  }

  // Set new password
  user.password = req.body.password
  user.passwordResetToken = undefined
  user.passwordResetExpire = undefined

  await user.save()

  sendTokenResponse(user, 200, res)
})
