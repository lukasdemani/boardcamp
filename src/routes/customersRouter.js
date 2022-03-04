import { Router } from "express";
import { getCustomers, getCustomer, postCustomer, updateCustomer } from '../controllers/customerController.js';
import { validateCustomerSchema } from "../middleware/validateCustomerSchema.js";

const customersRouter = Router();

customersRouter.get('/customers', getCustomers);
customersRouter.get('/customers/:id', getCustomer);
customersRouter.post('/customers', validateCustomerSchema, postCustomer);
customersRouter.put('/customers/:id', validateCustomerSchema, updateCustomer);

export default customersRouter;