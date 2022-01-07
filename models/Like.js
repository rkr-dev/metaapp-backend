import mongoose from 'mongoose'

const LikeSchema = new mongoose.Schema({
  post: { type: mongoose.Schema.ObjectId, ref: 'Post' },
  user: { type: mongoose.Schema.ObjectId, ref: 'User' },
  like: {
    type: Boolean,
    required: true,
  },
  date: { type: Date, default: Date.now },
})

LikeSchema.index({ post: 1, user: 1 }, { unique: true })

export const Like = mongoose.model('Like', LikeSchema)
