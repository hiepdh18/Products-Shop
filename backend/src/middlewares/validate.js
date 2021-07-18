const Joi = require('joi')
const createError = require('http-errors')
const pick = require('../utils/pick')

const { userValidation } = require('../validations')

const validate = (schema) => (req, res, next) => {
   
    const validSchema = pick(schema, ['params', 'query', 'body'])
    const object = pick(req, Object.keys(validSchema))
    const { value, error } = Joi.compile(validSchema)
        .prefs({ errors: { label: 'key'}, abortEarly: false })
        .validate(object)

    if (error) {
        const message = error.details.map((details) => details.message).join(', ')
        console.log(message)
        return next(createError.BadRequest({ message, success:false}))
    }
    Object.assign(req, value)
    return next()
}

module.exports = validate
