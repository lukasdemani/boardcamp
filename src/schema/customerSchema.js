import joi from "joi";

const customerSchema = joi.object({
    name: joi.string().required(),
    phone: joi.number().required(),
    cpf: joi.number().required(),
    birthday: joi.string().required()
})

export default customerSchema;