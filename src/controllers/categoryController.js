import connection from '../database.js';

export async function getCategories (req, res) {
  try {
    const categories = await connection.query(
        `SELECT * FROM categories`)
    res.send(categories.rows);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

export async function postCategories(req, res) {
    const category = req.body;

    try {
        const result = await connection.query(
            `INSERT INTO categories (name) 
                VALUES ($1)`, [category.name]);
        res.sendStatus(200);
      } catch (err) {
        console.error(err);
        res.sendStatus(500);
      }
}