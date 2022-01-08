import { asyncHandler } from '../middlewares/async.js'
import { Post } from '../models/Post.js'
import { User } from '../models/User.js'
import { Like } from '../models/Like.js'
import { Comment } from '../models/Comment.js'
import ErrorResponse from '../utils/errorResponse.js'

// @desc      Get a Single Post
// @route     GET /api/v1/auth/posts/:id
// @access    Private

export const getPost = asyncHandler(async (req, res, next) => {})

// @desc      Get posts of the current loggedin user
// @route     GET /api/v1/auth/posts
// @access    Private

export const getPosts = asyncHandler(async (req, res, next) => {})

// @desc      Create a new Post
// @route     POST /api/v1/auth/posts
// @access    Private

export const createPost = asyncHandler(async (req, res, next) => {})

// @desc      Update a Post
// @route     PUT /api/v1/auth/posts/:id
// @access    Private

export const updatePost = asyncHandler(async (req, res, next) => {})

// @desc      Delete a Post
// @route     DELETE /api/v1/auth/posts/:id
// @access    Private

export const deletePost = asyncHandler(async (req, res, next) => {})

// @desc      Get posts by user
// @route     PUT /api/v1/auth/posts/:username
// @access    Private

export const userPosts = asyncHandler(async (req, res, next) => {})

// @desc      Get posts by search
// @route     PUT /api/v1/auth/posts/search
// @access    Private

export const searchPosts = asyncHandler(async (req, res, next) => {})

// @desc      Like a Post
// @route     POST /api/v1/auth/posts/:id/like
// @access    Private

export const likePost = asyncHandler(async (req, res, next) => {})

// @desc      Comment on a Post
// @route     POST /api/v1/auth/posts/:id/comment
// @access    Private

export const commentPost = asyncHandler(async (req, res, next) => {})
