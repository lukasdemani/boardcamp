import connection from '../database.js';
import queryBuilder from './queryBuilder.js';

export async function getCategories (req, res) {
  const queryString = queryBuilder( { ...req.query });

  try {
    
    const categories = await connection.query(
        `SELECT * 
        FROM categories
        ${queryString}`)
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
        res.sendStatus(201);
      } catch (err) {
        console.error(err);
        res.sendStatus(500);
      }
}