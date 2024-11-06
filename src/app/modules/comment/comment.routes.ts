import express from 'express';
import auth from '../../middlewares/auth';
import {
  createComment,
  deleteComment,
  getAllComments,
  getComment,
  updateComment,
} from './comment.controller';

const router = express.Router();

// Route for handling all comments (GET all, POST create)
router
  .route('/')
  .get(getAllComments)
  .post(auth('admin', 'user'), createComment);

// Route for handling a specific comment by ID (GET, PATCH update, DELETE)
router
  .route('/:id')
  .get(getComment)
  .patch(auth('admin', 'user'), updateComment)
  .delete(auth('admin', 'user'), deleteComment);

export const CommentRoutes = router;
