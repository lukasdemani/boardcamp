export async function validateGameSchema(req, res, next){
    const game = req.body;

    const validation = gameSchema.validate(game);
    if (validation.error) {
        return res.sendStatus(422);
    }
    
    // verificar se existe o nome no banco
    next();
}