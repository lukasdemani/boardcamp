import connection from '../database.js';

export async function getGames (req, res) {
  try {
    const games = await connection.query(
        `SELECT * FROM games`)
    res.send(games.rows);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

export async function getGame (req, res) {
    const id = req.params;

    try {
      const categories = await connection.query(
          `SELECT id FROM games`)
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
        res.sendStatus(200);
      } catch (err) {
        console.error(err);
        res.sendStatus(500);
      }
}