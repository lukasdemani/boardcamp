import joi from "joi";

const gameSchema = joi.object({
    name: joi.string().required(),
    image: joi.string().required(),
    stockTotal: joi.number().integer().positive().required(),
    categoryId: joi.number().required(),
    pricePerDay: joi.number().positive().required()
})

export default gameSchema;