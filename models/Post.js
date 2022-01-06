import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  caption: {
    type: String,
    required: [true, 'Please enter a caption'],
  },
  description: {
    type: String,
    required: [true, 'Please enter a description'],
  },
  tags: { type: [String] },
  imageURL: {
    type: String,
    required: [true, 'Please enter the image URL'],
  },
  createdAt: { type: Date, default: Date.now },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  comments: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Comment',
      required: true,
    },
  ],
  likes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Like',
      required: true,
    },
  ],
})