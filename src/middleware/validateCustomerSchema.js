import customerSchema from '../schema/customerSchema.js'
import connection from '../database.js';

export async function validateCustomerSchema (req, res, next){
    const customer = req.body;

    const validation = customerSchema.validate(customer);
    if (validation.error) {
        return res.sendStatus(422);
    }
    
    const result = await connection.query(`SELECT id FROM customers WHERE cpf=$1`, [customer.cpf]);
    if (result.rowCount > 0) {
      return res.sendStatus(409);
    }
    next();
}