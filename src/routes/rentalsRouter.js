const rentalsRouter = Router();

rentalsRouter.get('/rentals', getRentals);
rentalsRouter.post('/rentals', validateRentalSchema, postRentals);
rentalsRouter.post('/rentals/:id/return', validateRentalSchema, finishRental);
rentalsRouter.delete('/rentals/:id', validateRentalSchema, deleteRental);

export default rentalsRouter;