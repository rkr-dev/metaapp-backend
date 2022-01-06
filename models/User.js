import mongoose from 'mongoose'
import crypto from 'crypto'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: [true, 'Please add a first name'] },
  lastName: { type: String, required: [true, 'Please add a last name'] },
  name: { type: String, required: true },
  username: {
    type: String,
    required: [true, 'Please add a username'],
    unique: true,
    maxLength: 8,
  },
  email: {
    type: String,
    required: [true, 'Please add an email address'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email address',
    ],
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minLength: 6,
    select: false,
  },
  socials: {
    type: Map,
    of: String,
  },
  image: {
    type: String,
    required: false,
  },
  passwordResetToken: String,
  passwordResetExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
})
