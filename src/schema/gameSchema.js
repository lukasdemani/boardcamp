import joi from "joi";

const gameSchema = joi.object({
    name: joi.string().required(),
    image: joi.string().required(),
    stockTotal: joi.number().integer().required(),
    categoryId: joi.number().required(),
    pricePerDay: joi.number().required()
})

export default gameSchema;