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
    try {
        const rental = await connection.query(
            `INSERT INTO games ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") 
                VALUES ($1, $2, $3, $4, $5, $6, $7)`, [rental.customerId, rental.gameId, rental.rentDate, rental.daysRented, rental.returnDate, rental.originalPrice, rental.delayFee]);
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