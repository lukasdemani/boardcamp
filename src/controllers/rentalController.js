import connection from '../database.js';

export async function getRentals (req, res) {
  try {
    const categories = await connection.query(
        `SELECT * FROM rentals`)
    res.send(rentals.rows);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

export async function getRental (req, res) {
    const id = req.params;

    try {
      const rentals = await connection.query(
          `SELECT id FROM games`)
      res.send(rentals.rows);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  };

export async function postRental(req, res) {
    const rental = req.body;
    try {
        const rental = await connection.query(
            `INSERT INTO games (name) 
                VALUES (${rental})`)
        res.sendStatus(200);
      } catch (err) {
        console.error(err);
        res.sendStatus(500);
      }
}