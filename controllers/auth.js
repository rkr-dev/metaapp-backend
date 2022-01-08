import { asyncHandler } from '../middlewares/async.js'
import ErrorResponse from '../utils/errorResponse.js'
import { User } from '../models/User.js'
import { sendTokenResponse } from '../utils/sendTokenResponse.js'

// @desc      Register a new User
// @route     POST /api/v1/auth/register
// @access    Public

export const registerUser = asyncHandler(async (req, res, next) => {})

// @desc      Login route for a User
// @route     POST /api/v1/auth/login
// @access    Public

export const loginUser = asyncHandler(async (req, res, next) => {})

// @desc      Logout User
// @route     POST /api/v1/auth/logout
// @access    Public

export const logoutUser = asyncHandler(async (req, res, next) => {})

// @desc      Get current Loggedin User
// @route     GET /api/v1/auth/me
// @access    Private

export const getMe = asyncHandler(async (req, res, next) => {})

// @desc      Update Profile of the LoggedIn User
// @route     PUT /api/v1/auth/updateprofile
// @access    Private

export const updateProfile = asyncHandler(async (req, res, next) => {})

// @desc      Update Password of the LoggedIn User
// @route     PUT /api/v1/auth/updateprofile
// @access    Private

export const updatePassword = asyncHandler(async (req, res, next) => {})

// @desc      Forgot Password for the LoggedIn User
// @route     POST /api/v1/auth/forgotpassword
// @access    Private

export const forgotPassword = asyncHandler(async (req, res, next) => {})

// @desc      Reset Password for the LoggedIn User
// @route     POST /api/v1/auth/resetpassword/:resettoken
// @access    Private

export const passwordReset = asyncHandler(async (req, res, next) => {})
