import { Router } from "express";
import { getRentals, postRental } from "../controllers/rentalController.js";
import { validateRentalSchema } from "../middleware/validateRentalSchema.js";
const rentalsRouter = Router();

rentalsRouter.get('/rentals', getRentals);
rentalsRouter.post('/rentals', validateRentalSchema, postRental);
//rentalsRouter.post('/rentals/:id/return', validateRentalSchema, finishRental);
//rentalsRouter.delete('/rentals/:id', validateRentalSchema, deleteRental);

export default rentalsRouter;