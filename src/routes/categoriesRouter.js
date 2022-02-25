const categoriesRouter = Router();

categoriesRouter.get('/categories', postCategories);
categoriesRouter.post('/categories', validateCategoriesSchema, postCategories);