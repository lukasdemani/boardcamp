
import connection from '../database.js';

export async function getCustomers (req, res) {
  try {
    const categories = await connection.query(
        `SELECT * FROM customers`)
    res.send(customers.rows);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

export async function getCustomers (req, res) {
    const id = req.params;

    try {
      const categories = await connection.query(
          `SELECT id FROM customers`)
      res.send(customers.rows);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  };

export async function postCustomer(req, res) {
    const customer = req.body;
    try {
        const customers = await connection.query(
            `INSERT INTO customers (name) 
                VALUES (${category})`)
        res.sendStatus(200);
      } catch (err) {
        console.error(err);
        res.sendStatus(500);
      }
}

