export async function validateCategorySchema(req, res, next){
    const category = req.body;

    const validation = categorySchema.validate(category);
    if (validation.error) {
        return res.sendStatus(422);
    }
    
    // verificar se existe o nome no banco
    next();
}
