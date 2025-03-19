import Joi from "joi"

export const registerSchema = Joi.object({
    body: Joi.object({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
      confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
    })
  });
  
  export const loginSchema = Joi.object({
    body: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required()
    })
  });