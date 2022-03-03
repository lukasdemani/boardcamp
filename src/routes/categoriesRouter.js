import { Router } from "express";
const categoriesRouter = Router();
import { getCategories, postCategories } from '../controllers/categoryController.js'
import { validateCategorySchema } from '../middleware/validateCategorySchema.js'

categoriesRouter.get('/categories', getCategories);
categoriesRouter.post('/categories', validateCategorySchema, postCategories);

export default categoriesRouter;