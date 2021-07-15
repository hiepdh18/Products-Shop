const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const signup = {
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required().custom(password),
        name: Joi.string().required(),
        role: Joi.string().valid('user', 'admin'),
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
const updateUser = {
    params: Joi.object().keys({
        id: Joi.required().custom(objectId),
    }),
    body: Joi.object()
        .keys({
            name: Joi.string(),
        })
        .min(1),
}

const getUsers = {
   
}

const getUser = {
    params: Joi.object().keys({
        id: Joi.string().required().custom(objectId),
    }),
}

const changePass = {
    params: Joi.object().keys({
        id: Joi.required().custom(objectId),
    }),
    body: Joi.object().keys({
        password: Joi.string().custom(password)
    })
        .min(1),
}

const resetPass = {
    params: Joi.object().keys({
        id: Joi.required().custom(objectId),
    })
}

module.exports = {
    signup,
    signin,
    deleteUser,
    updateUser,
    getUsers,
    getUser,
    changePass,
    resetPass,
}
