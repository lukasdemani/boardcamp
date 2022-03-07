import connection from '../database.js';
import queryBuilder from './queryBuilder.js';

export async function getCustomers (req, res) {
  const queryString = queryBuilder({ ...req.query });

  try {
    const customers = await connection.query(
        `SELECT c.id, c.name, c.phone, c.cpf, c.birthday, 
          (SELECT COUNT (r."customerId")
            FROM rentals r  
            WHERE r."customerId" = c.id) AS "rentalsCount"
        FROM customers c 
        ${queryString}`)
    res.send(customers.rows);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

export async function getCustomer (req, res) {
    const { id }= req.params;

    try {
      const customer = await connection.query(
        `SELECT c.id, c.name, c.phone, c.cpf, c.birthday, 
          (SELECT COUNT (r."customerId")
            FROM rentals r  
            WHERE r."customerId" = c.id) AS "rentalsCount"
        FROM customers c 
        WHERE c.id=$1`, [id])

      if (customer.rowCount===0){
        return res.sendStatus(404);
      }
        res.send(customer.rows[0]);
     } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  };

export async function postCustomer(req, res) {
    const customer = req.body;
    try {
        const customers = await connection.query(
            `INSERT INTO customers (name, phone, cpf, birthday) 
                VALUES ($1, $2, $3, $4)`, [customer.name, customer.phone, customer.cpf, customer.birthday]);
        res.sendStatus(201);
      } catch (err) {
        console.error(err);
        res.sendStatus(500);
      }
}

export async function updateCustomer(req, res) {
  const customer = req.body;
  const { id } = req.params;
  try {
    await connection.query(`
    UPDATE customers
      SET name=$1, phone=$2, cpf=$3, birthday=$4
      WHERE id=$5`, [customer.name, customer.phone, customer.cpf, customer.birthday, id]);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

