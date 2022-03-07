import { Router } from "express";
import { getRentals, postRental, finishRental, deleteRental, getMetrics } from "../controllers/rentalController.js";
import { validateRentalSchema } from "../middleware/validateRentalSchema.js";
const rentalsRouter = Router();

rentalsRouter.get('/rentals', getRentals);
rentalsRouter.post('/rentals', validateRentalSchema, postRental);
rentalsRouter.post('/rentals/:id/return', finishRental);
rentalsRouter.delete('/rentals/:id', deleteRental);
rentalsRouter.get('/rentals/metrics', getMetrics);

export default rentalsRouter;