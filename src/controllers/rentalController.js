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

export async function finishRental (req, res) {
  const { id } = req.params;

  try {
    const rental = await connection.query(
      `SELECT * FROM rentals WHERE id=$1`, [id]);
      
      const rentDate = rental.rows[0].rentDate;
      const daysRented = rental.rows[0].daysRented;
      const returnDate = dayjs().format('YYYY-DD-MM');
      const originalPrice = rental.rows[0].originalPrice;
      let delayFee = rental.rows[0].delayFee
      
      if (dayjs().diff(dayjs(rentDate), 'day')>daysRented){
        const delayDays = dayjs().diff(dayjs(rentDate), 'day')
        delayFee = originalPrice * delayDays;
      }
      
      await connection.query(`
        UPDATE rentals
          SET "returnDate"=$1, "delayFee"=$2
          WHERE id = $3`, [returnDate, delayFee, id]);
  
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
  } catch (err) {
    
  }
}