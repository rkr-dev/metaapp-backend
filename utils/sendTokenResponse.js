// Get token from model, create cookie and send response

export const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken()
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_EXPIRES * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  }

  if (process.env.NODE_ENV === 'production') {
    options.secure = true
  }

  user = { _id: user._id, firstName: user.firstName, name: user.name }

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({ success: true, token, user })
}
