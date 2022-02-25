const categoriesRouter = Router();

categoriesRouter.get('/categories', getCategories);
categoriesRouter.post('/categories', validateCategorySchema, postCategories);

export default categoriesRouter;