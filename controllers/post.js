import { asyncHandler } from '../middlewares/async.js'
import { Post } from '../models/Post.js'
import { User } from '../models/User.js'
import { Like } from '../models/Like.js'
import { Comment } from '../models/Comment.js'
import ErrorResponse from '../utils/errorResponse.js'

// @desc      Get a Single Post
// @route     GET /api/v1/auth/posts/:id
// @access    Private

export const getPost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id)
    .populate('likes')
    .populate('comments')
    .populate({ path: 'user', select: '_id username name' })

  if (!post) {
    return next(new ErrorResponse(`The requested post does not exist`, 401))
  }

  res.status(200).json({ message: 'success', data: post })
})

// @desc      Get posts of the current loggedin user
// @route     GET /api/v1/auth/posts
// @access    Private

export const getPosts = asyncHandler(async (req, res, next) => {
  const posts = await Post.find({ user: req.user._id })
    .populate('likes')
    .populate('comments')
    .populate({ path: 'user', select: '_id username name' })
  res.status(200).json({ count: posts.length, success: true, data: posts })
})

// @desc      Create a new Post
// @route     POST /api/v1/auth/posts
// @access    Private

export const createPost = asyncHandler(async (req, res, next) => {
  const { caption, description, imageURL } = req.body
  req.body.user = req.user.id
  if (!caption || !description || !imageURL) {
    return next(
      new ErrorResponse(`Please add a caption, description and an image`, 404)
    )
  }

  const post = await Post.create(req.body)

  res.status(200).json({ message: 'success', data: post })
})

// @desc      Update a Post
// @route     PUT /api/v1/auth/posts/:id
// @access    Private

export const updatePost = asyncHandler(async (req, res, next) => {
  let post = await Post.findById(req.params.id)

  if (!post) {
    return next(new ErrorResponse(`No post found with that Id`, 401))
  }

  if (post.user._id.toString() !== req.user._id.toString()) {
    return next(new ErrorResponse(`You are not authorized to update the post`))
  }

  post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
    .populate('comments')
    .populate('likes')

  res.status(200).json({ message: 'success', data: post })
})

// @desc      Delete a Post
// @route     DELETE /api/v1/auth/posts/:id
// @access    Private

export const deletePost = asyncHandler(async (req, res, next) => {
  let post = await Post.findById(req.params.id)

  if (!post) {
    return next(new ErrorResponse(`No post found with that Id`, 401))
  }

  if (post.user._id.toString() !== req.user._id.toString()) {
    return next(new ErrorResponse(`You are not authorized to update the post`))
  }

  await Post.findByIdAndDelete(req.params.id)

  res.status(200).json({ message: 'success', data: {} })
})

// @desc      Get posts by user
// @route     PUT /api/v1/auth/posts/:username
// @access    Private

export const userPosts = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ username: req.params.username })
  console.log('user:', user)

  if (!user) {
    return next(new ErrorResponse(`The profile doesn't exist`, 404))
  }

  const posts = await Post.find({ user: user._id })
    .populate('comments')
    .populate('likes')
  res.status(200).json({ count: posts.length, success: true, data: posts })
})

// @desc      Get posts by search
// @route     PUT /api/v1/auth/posts/search
// @access    Private

export const searchPosts = asyncHandler(async (req, res, next) => {})

// @desc      Like a Post
// @route     POST /api/v1/auth/posts/:id/like
// @access    Private

export const likePost = asyncHandler(async (req, res, next) => {
  req.body.post = req.params.id
  req.body.user = req.user._id
  let post = await Post.findById(req.params.id).populate('likes')
  if (!post) {
    return next(new ErrorResponse(`No post found`, 404))
  }

  let like = post.likes.filter(
    (like) => like.user.toString() === req.user._id.toString()
  )
  if (like[0]) {
    await Like.findByIdAndUpdate(
      like[0]._id,
      { ...req.body, like: !like[0].like },
      { new: true, runValidators: true }
    )
    post = await Post.findById(req.params.id).populate('likes')
  } else {
    like = await Like.create(req.body)
    post = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $push: { likes: like._id },
      },
      { new: true, runValidators: true }
    ).populate('likes')
  }

  res.status(200).json({ message: 'success', data: post })
})

// @desc      Comment on a Post
// @route     POST /api/v1/auth/posts/:id/comment
// @access    Private

export const commentPost = asyncHandler(async (req, res, next) => {
  req.body.post = req.params.id
  req.body.user = req.user._id
  let post = await Post.findById(req.params.id).populate('comments')
  if (!post) {
    return next(new ErrorResponse(`No post found`, 404))
  }

  let comment = await Comment.create(req.body)
  post = await Post.findByIdAndUpdate(
    req.params.id,
    {
      $push: { comments: comment._id },
    },
    { new: true, runValidators: true }
  )
    .populate('comments')
    .populate('likes')

  res.status(200).json({ message: 'success', data: post })
})
