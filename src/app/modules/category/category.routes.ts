import express from 'express';
import auth from '../../middlewares/auth';
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategory,
  updateCategory,
} from './category.controller';

const router = express.Router();

// Route to get all categories and create a new category (admin only)
router.route('/').get(getAllCategories).post(auth('admin'), createCategory);

// Route to get, update, or delete a category by ID (admin only)
router
  .route('/:id')
  .get(getCategory)
  .patch(auth('admin'), updateCategory)
  .delete(auth('admin'), deleteCategory);

export const CategoryRoutes = router;
