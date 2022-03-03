import { Router } from "express";
const customersRouter = Router();

customersRouter.get('/customers', getCustomers);
customersRouter.get('/customers/:id', validateCustomerSchema, getCustomer);
customersRouter.post('/customers', validateCustomerSchema, postCustomer);
customersRouter.put('/customers/:id', validateCustomerSchema, updateCustomer);

export default customersRouter;