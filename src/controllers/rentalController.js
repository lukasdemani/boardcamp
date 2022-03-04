import dayjs from 'dayjs';
import connection from '../database.js';

export async function getRentals (req, res) {
  try {
    const rentals = await connection.query(
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
    const rentDate = dayjs().format('YYYY-MM-DD');
    const result = await connection.query(`
      SELECT "pricePerDay" 
        FROM games
        WHERE id=$1`, [rental.gameId]);
    console.log(result.rows)
    const originalPrice = rental.daysRented * 2;
    const returnDate = null;
    const delayFee = null;

    try {
        const result = await connection.query(
            `INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") 
                VALUES ($1, $2, $3, $4, $5, $6, $7)`, [rental.customerId, rental.gameId, rentDate, rental.daysRented, returnDate, originalPrice, delayFee]);
        res.sendStatus(200);
      } catch (err) {
        console.error(err);
        res.sendStatus(500);
      }
}

export async function deleteRental (req, res) {
  const id = params;
  try {
    const result = await connection.query(
      `DELETE FROM rentals WHERE id = $1`,
      [id]);
  } catch (error) {
    
  }
}