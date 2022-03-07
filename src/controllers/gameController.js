import connection from '../database.js';
import queryBuilder from './queryBuilder.js';

export async function getGames (req, res) {
  const queryString = queryBuilder({ ...req.query });
  
  try {
      const games = await connection.query(
          `SELECT g.id, g.name, g.image, g."stockTotal", g."categoryId", g."pricePerDay", c.name as "categoryName",
              (SELECT COUNT (r."gameId")
              FROM rentals r
              WHERE r."gameId" = g.id) AS "rentalsCount"
            FROM games g
          JOIN categories c
            ON g."categoryId" = c.id
          ${queryString}`
             )
      res.send(games.rows);
      
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

export async function getGame (req, res) {
    const { id } = req.params;

    try {
      const games = await connection.query(
        `SELECT g.id, g.name, g.image, g."stockTotal", g."categoryId", g."pricePerDay", c.name as "categoryName",
            (SELECT COUNT (r."gameId")
            FROM rentals r
            WHERE r."gameId" = g.id) AS "rentalsCount"
          FROM games g
        JOIN categories c
          ON g."categoryId" = c.id
        WHERE g.id=$1`, [id])

      res.send(games.rows);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  };

export async function postGame (req, res) {
    const game = req.body;
    try {
        const result = await connection.query(
            `INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") 
                VALUES ($1, $2, $3, $4, $5)`, [game.name, game.image, game.stockTotal, game.categoryId, game.pricePerDay]);
        res.sendStatus(201);
      } catch (err) {
        console.error(err);
        res.sendStatus(500);
      }
}