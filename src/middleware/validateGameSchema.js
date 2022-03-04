import gameSchema from "../schema/gameSchema.js";
import connection from "../database.js";

export async function validateGameSchema(req, res, next){
    const game = req.body;

    const validation = gameSchema.validate(game);
    if (validation.error) {
        return res.sendStatus(400);
    }
    
    const result = await connection.query(`
        SELECT id FROM games
            WHERE name=$1`, [game.name]);
    if (result.rowCount > 0) {
      return res.sendStatus(409);
    }

    const resultId = await connection.query(`
        SELECT id FROM categories
            WHERE id=$1`, [game.categoryId]);
    if (resultId.rowCount === 0) {
        return res.sendStatus(400);
    }
    
    game.stockTotal = parseInt(game.stockTotal);
    game.pricePerDay = parseInt(game.pricePerDay);
    
    next();
}