import express from 'express';
import auth from '../../middlewares/auth';
import {
  getAllPosts,
  createPost,
  getPost,
  updatePost,
  deletePost,
  getMyPosts,
} from './post.controller';

const router = express.Router();
// Get all posts or create a post (requires 'admin' or 'user' role for POST)
router.route('/').get(getAllPosts).post(auth('admin', 'user'), createPost);
// Get posts by the authenticated user ('user' or 'admin' role required)
router.get('/my-posts', auth('user', 'admin'), getMyPosts);
// Get, update, or delete a post by ID (update/delete require 'admin' or 'user' role)
router
  .route('/:id')
  .get(getPost)
  .patch(auth('admin', 'user'), updatePost)
  .delete(auth('admin', 'user'), deletePost);
export const PostRoutes = router;
