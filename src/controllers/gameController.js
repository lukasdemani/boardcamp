
import connection from '../database.js';

export async function getGames (req, res) {
  try {
    const categories = await connection.query(
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

export async function postGame(req, res) {
    const game = req.body;
    try {
        const game = await connection.query(
            `INSERT INTO games (name) 
                VALUES (${game})`)
        res.sendStatus(200);
      } catch (err) {
        console.error(err);
        res.sendStatus(500);
      }
}