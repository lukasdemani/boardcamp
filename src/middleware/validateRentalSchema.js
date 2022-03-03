export async function validateRentalSchema(req, res, next){
    const category = req.body;

    const validation = rentalSchema.validate(rental);
    if (validation.error) {
        return res.sendStatus(422);
    }
    
    // verificar se existe o nome no banco
    next();
}