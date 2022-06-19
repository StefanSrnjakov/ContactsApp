const Joi = require('@hapi/joi');

const registerValidation = (req, res, next) => {
    const schema = Joi.object({
        username: Joi.string().min(3).required(),
        password: Joi.string().min(6).required(),
    });

    const {error} = schema.validate(req.body);
    if(error) return res.status(400).json({error: error.details[0].message});
    next();
}

const loginValidation = (req, res, next) => {
    const schema = Joi.object({
        username: Joi.string().min(3).required(),
        password: Joi.string().min(6).required()
    });

    const {error} = schema.validate(req.body);
    if(error) return res.status(400).json({error: error.details[0].message});
    next();
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;