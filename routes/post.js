import express from 'express'
import {
  getPost,
  getPosts,
  createPost,
  updatePost,
  deletePost,
  userPosts,
  searchPosts,
  likePost,
  commentPost,
} from '../controllers/post.js'
import { protect } from '../middlewares/auth.js'

const router = express.Router()

router.use(protect)

router.route('/').get(getPosts).post(createPost)
router.route('/:id').get(getPost).put(updatePost).delete(deletePost)
router.route('/user/:username').get(userPosts)
router.route('/search').get(searchPosts)
router.route('/:id/like').post(likePost)
router.route('/:id/comment').post(commentPost)
export default router
