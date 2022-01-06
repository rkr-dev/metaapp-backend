import ErrorResponse from '../utils/errorResponse.js'

export const errorHandler = (err, req, res, next) => {
  let error = { ...err }

  error.message = err.message

  console.log(`ERROR STACK => ${err.stack}`)

  // Mongoose Bad Object
  if (err.name === `CastError`) {
    const message = `Resource not found with id: ${err.value}`
    error = new ErrorResponse(message, 404)
  }

  // Mongoose validation Error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message)
    error = new ErrorResponse(message, 400)
  }

  // Mongoose Duplicate Key Error
  if (err.code === 11000) {
    const message = `Field value already exists`
    error = new ErrorResponse(message, 400)
  }

  res
    .status(error.statusCode || 500)
    .json({ success: false, error: error.message || `Server Error` })
}
