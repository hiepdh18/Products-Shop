const Joi = require('joi');
const jwt = require('jsonwebtoken');

module.exports = Joi.extend({
    type: 'jwt',
    messages: {
        invalid: 'It must have a valid JWT',
    },
    validate(value, helpers) {
        const jwtPattern = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/;
        const isTest = jwtPattern.test(String(value));
        const isValid = jwt.decode(value);
        if (!isTest || !isValid) return { value, errors: helpers.error('invalid') };
    },
});
