
import connection from '../database.js';

export async function getCustomers (req, res) {
  try {
    const customers = await connection.query(
        `SELECT * FROM customers`)
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
        `SELECT * FROM customers WHERE id=$1`, [id])

      if (customer.rowCount===0){
        return res.sendStatus(404);
      }
        res.send(customer.rows);
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
        res.sendStatus(200);
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
