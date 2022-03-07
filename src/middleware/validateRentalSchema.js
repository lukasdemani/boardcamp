import rentalSchema from "../schema/rentalSchema.js";
import connection from "../database.js";

export async function validateRentalSchema(req, res, next){
    const rental = req.body;
    const { id } = req.params;

    const validation = rentalSchema.validate(rental);
    if (validation.error) {
        return res.sendStatus(422);
    }

    const resultId = await connection.query(`
            SELECT id FROM games
                WHERE id=$1`, [rental.gameId]);
        if (resultId.rowCount === 0) {
            return res.sendStatus(400);
        }


    const result = await connection.query(`
        SELECT * FROM rentals
        WHERE "gameId"=$1 AND "returnDate" IS null`, [rental.gameId]);

    if (result.rowCount !== 0) {
        const stock = await connection.query(`
            SELECT "stockTotal" 
                FROM games
                WHERE id = $1
        `, [rental.gameId])

        if(result.rowCount >= stock.rows[0].stockTotal){
            return res.sendStatus(400)
        }
    }

    next();
}