import mongoose from 'mongoose'

const CommentSchema = new mongoose.Schema({
  post: { type: mongoose.Schema.ObjectId, ref: 'Post' },
  user: { type: mongoose.Schema.ObjectId, ref: 'User' },
  text: {
    type: String,
    trim: true,
    required: true,
  },
  date: { type: Date, default: Date.now },
})

export const Comment = mongoose.model('Comment', CommentSchema)
