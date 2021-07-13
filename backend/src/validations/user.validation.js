const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const signup = {
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required().custom(password),
        name: Joi.string().required(),
        role: Joi.string().required().valid('user', 'admin'),
    }),
};

const signin = {
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required().custom(password),
    }),
}

const deleteUser = {
    params: Joi.object().keys({
        id: Joi.string().custom(objectId),
    }),
}
const update = {
    params: Joi.object().keys({
        id: Joi.required().custom(objectId),
    }),
    body: Joi.object()
        .keys({
            name: Joi.string(),
        })
        .min(1),
}

const getAllUser = {

}

const getSingleUser = {
    params: Joi.object().keys({
        id: Joi.string().custom(objectId),
    }),
}

const changePass = {
    params: Joi.object().keys({
        id: Joi.required().custom(objectId),
    }),
    body: Joi.object()
        .keys({
            password: Joi.string().custom(password)
        })
        .min(1),
}

const resetPass = {

}

module.exports = {
    signup,
    signin,
    deleteUser,
    update,
    getAllUser,
    getSingleUser,
    changePass,
    resetPass,
}
