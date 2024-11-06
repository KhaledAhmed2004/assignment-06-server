import * as factory from '../../utils/handlerFactory';
import Category from './category.model';

// Create a new category using the factory's createOne function
export const createCategory = factory.createOne(Category);
// Get a single category by its ID using the factory's getOne function
export const getCategory = factory.getOne(Category);
// Get all categories using the factory's getAll function
export const getAllCategories = factory.getAll(Category);
// Update a category by its ID using the factory's updateOne function
export const updateCategory = factory.updateOne(Category);
// Delete a category by its ID using the factory's deleteOne function
export const deleteCategory = factory.deleteOne(Category);
