import connection from '../database.js';
import categorySchema from '../schema/categorySchema.js'
export async function validateCategorySchema(req, res, next){
    const category = req.body;

    const validation = categorySchema.validate(category);
    if (validation.error) {
        return res.sendStatus(400);
    }

    const result = await connection.query(`SELECT id FROM categories WHERE name=$1`, [category.name]);
    if (result.rowCount > 0) {
      return res.sendStatus(409);
    }
     
    next();
}
