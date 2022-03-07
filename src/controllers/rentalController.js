import dayjs from 'dayjs';
import connection from '../database.js';
import queryBuilder from './queryBuilder.js';

export async function getRentals (req, res) {

  const queryString = queryBuilder({ ...req.query });

  try {
    const rentals = await connection.query(
        `SELECT *
          FROM rentals
          ${queryString}`)
    
    const customers = await connection.query(
      `SELECT id, name
        FROM customers
        GROUP BY id`
    )

    const games = await connection.query(
      `SELECT g.id, g.name, g."categoryId", c.name as "categoryName"
          FROM games g
        JOIN categories c
          ON g."categoryId" = c.id`
    )

    let rentalsOutput = []

    rentals.rows.map(
      (rental) => {
        const customer = customers.rows.filter((customer) => customer.id === rental.customerId)[0]
        const game = games.rows.filter((game) => game.id === rental.gameId)[0]
        rentalsOutput.push({ ...rental, customer, game })
        })
    res.send(rentalsOutput);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

export async function postRental(req, res) {
    const rental = req.body;
    const rentDate = dayjs().format("YYYY-MM-DD");

    const result = await connection.query(`
      SELECT "pricePerDay" 
        FROM games
        WHERE id=$1`, [rental.gameId]);
    
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
  const { id } = req.params

  if (id) {
    const result = await connection.query(`
        SELECT id FROM rentals
            WHERE id=$1`, [id]);
    if (result.rowCount === 0) {
        return res.sendStatus(404);
    }else if(result.rows[0].returnDate){
        console.log(result.rows[0].returnDate)
        return res.sendStatus(400);
    }
    } 

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
  let { id } = req.params;
  id = parseInt(id)

  try {
    const result = await connection.query(
      `DELETE FROM rentals WHERE id = $1`,
      [id]);
    res.sendStatus(200)
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

export async function getMetrics(req, res) {
  let intervalDateSring = "";

  if (req.query.startDate){
    intervalDateSring = ` AND "rentDate" >= date '${dayjs(req.query.startDate).format("YYYY-MM-DD")}' `
  }

  if (req.query.endDate) {
    intervalDateSring += `AND "rentDate" <= date '${dayjs(req.query.endDate).format("YYYY-MM-DD")}' `
  }
  try {
    const rentalsDb = await connection.query(
      `SELECT *
          FROM rentals
          WHERE "returnDate" IS NOT null ${intervalDateSring} `
    )
    
    let rentalsPriceSum = 0;
    let delayFeeSum = 0;

    rentalsDb.rows.map(
      (rental) => 
        {rentalsPriceSum += rental.originalPrice * rental.daysRented;
        delayFeeSum += rental.delayFee;
      })
    
    const metrics = {
      revenue: rentalsPriceSum + delayFeeSum,
      rentals: rentalsDb.rowCount,
      average: (rentalsPriceSum + delayFeeSum) / rentalsDb.rowCount,
    }
   
    
    res.send(metrics);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}