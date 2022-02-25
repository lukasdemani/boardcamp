import joi from "joi";

const rentalSchema = joi.object({
    customerId: joi.number().required(),
    gameId: joi.number().required(),
    rentDate: joi.string().required(),
    daysRented: joi.number().required(),
    returnDate: joi.string().required(),
    originalPrice: joi.number().required(),
    delayFee: joi.string().required()
})

export default rentalSchema;